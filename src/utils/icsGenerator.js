// src/utils/icsGenerator.js

// Fonction utilitaire interne pour formater la date
const formatDate = (date, time) => {
    if (!date) return '';
    const d = new Date(`${date}T${time || '09:00'}`);
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  // La fonction principale exportée
  export const generateICSContent = (events, orgName) => {
    const now = new Date();
    const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Générateur ICS//FR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${orgName || 'Calendrier Organisation'}`,
      'X-WR-TIMEZONE:Europe/Paris'
    ];
  
    events.forEach(event => {
      if (event.date && event.title) {
        const startDate = formatDate(event.date, event.time);
        
        // Calcul de la fin (Début + 1h30)
        const d = new Date(`${event.date}T${event.time || '09:00'}`);
        d.setMinutes(d.getMinutes() + 90); 
        const endDate = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        icsContent.push('BEGIN:VEVENT');
        icsContent.push(`DTSTART:${startDate}`);
        icsContent.push(`DTEND:${endDate}`);
        icsContent.push(`SUMMARY:${event.type} - ${event.title}`);
        icsContent.push(`DESCRIPTION:Organisé par ${orgName || 'l\'organisation'}`);
        icsContent.push(`UID:${event.id}-${dtStamp}@votre-asso.com`);
        icsContent.push(`DTSTAMP:${dtStamp}`);
        icsContent.push('STATUS:CONFIRMED');
        icsContent.push('END:VEVENT');
      }
    });
  
    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
  };