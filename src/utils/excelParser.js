import * as XLSX from 'xlsx';

export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // On prend la première feuille
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Conversion en JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          raw: false, // Force la lecture en texte (évite les problèmes de dates chiffrées)
          dateNF: 'yyyy-mm-dd' // Format de date préféré
        });

        // Transformation des données pour notre application
        const formattedEvents = jsonData.map((row, index) => ({
          id: Date.now() + index, // ID unique
          // On essaie plusieurs noms de colonnes possibles (tolérance)
          type: row['Type'] || row['type'] || 'Bureau',
          title: row['Titre'] || row['titre'] || row['Objet'] || row['objet'] || 'Réunion',
          // Pour la date, on prend les 10 premiers caractères (YYYY-MM-DD)
          date: (row['Date'] || row['date'] || '').substring(0, 10), 
          time: row['Heure'] || row['heure'] || '09:00'
        }));

        // On filtre les lignes vides (sans date ou titre)
        const validEvents = formattedEvents.filter(e => e.date && e.title);
        
        if (validEvents.length === 0) {
          reject("Aucun événement valide trouvé. Vérifiez les colonnes (Date, Titre, Heure, Type).");
        } else {
          resolve(validEvents);
        }

      } catch (error) {
        reject("Erreur lors de la lecture du fichier Excel.");
      }
    };

    reader.onerror = () => reject("Impossible de lire le fichier.");
    reader.readAsArrayBuffer(file);
  });
};