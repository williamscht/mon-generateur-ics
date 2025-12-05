import React, { useRef, useState } from 'react';
import { FileSpreadsheet, Loader2, AlertCircle } from 'lucide-react';
import { parseExcelFile } from '../utils/excelParser';

const ImportExcel = ({ onImportSuccess }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const newEvents = await parseExcelFile(file);
      onImportSuccess(newEvents);
      e.target.value = '';
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleImportSuccess = (newEvents) => {
    const enriched = newEvents.map((e, idx) => ({
      id: e.id ?? Date.now() + idx,
      title: e.title || '',
      date: e.date || '',
      time: e.time || '09:00',
      type: e.type || 'Bureau',
      duration: e.duration ?? 60,
      isAllDay: e.isAllDay ?? false,
    }));
  
    setEvents(prevEvents => [...prevEvents, ...enriched]);
    alert(`${enriched.length} événements importés avec succès !`);
  };

  return (
    <div className="mb-6">

      {/* Label invisible pour l'accessibilité */}
      <label htmlFor="excel-file-input" className="sr-only">
        Importer un fichier Excel
      </label>

      <input
        id="excel-file-input"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx, .xls"
        className="hidden"
      />
      
      <button
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
        className="w-full py-4 border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-2xl text-emerald-700 font-semibold hover:bg-emerald-100 hover:border-emerald-400 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <FileSpreadsheet size={20} />
        )}
        {loading ? 'Analyse en cours...' : 'Importer depuis Excel'}
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      
      <p className="text-center text-xs text-slate-400 mt-2">
        Colonnes attendues : <strong>Date</strong>, <strong>Heure</strong>, <strong>Titre</strong>, <strong>Type</strong>
      </p>
    </div>
  );
};

export default ImportExcel;