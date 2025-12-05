import React from 'react';
import { Trash2 } from 'lucide-react';

const EVENT_TYPES = ['Bureau', 'CA', 'AG', 'Commission', 'Comité', 'Autre'];

const EventCard = ({ event, index, totalEvents, onUpdate, onRemove }) => {
  const baseId = `event-${event.id}`;

  // Date du jour (min pour la date)
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const currentTimeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const isToday = event.date === todayStr;

  const handleFieldChange = (field, value) => {
    onUpdate(event.id, field, value);
  };

  const handleDurationChange = (e) => {
    const minutes = Number(e.target.value);
    handleFieldChange('duration', minutes);
  };

  const toggleAllDay = () => {
    handleFieldChange('isAllDay', !event.isAllDay);
  };

  const durationValue = event.duration ?? 60;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 transition hover:shadow-md">
      {/* Header de la carte */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
          Événement #{index + 1}
        </span>
        {totalEvents > 1 && (
          <button 
            onClick={() => onRemove(event.id)}
            className="text-red-400 hover:text-red-600 transition p-1 hover:bg-red-50 rounded"
            title="Supprimer"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* ------- LIGNE 1 : TYPE + TITRE ------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* TYPE */}
        <div>
          <label 
            htmlFor={`${baseId}-type`}
            className="block text-xs font-bold text-slate-500 mb-1 uppercase"
          >
            Type
          </label>
          <select
            id={`${baseId}-type`}
            value={event.type}
            onChange={(e) => handleFieldChange('type', e.target.value)}
            className="w-full px-3 py-2 h-[42px] bg-slate-50 border border-slate-300 rounded-lg 
                        focus:ring-2 focus:ring-indigo-500 outline-none text-[16px] cursor-pointer"
            >
            {EVENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* TITRE */}
        <div>
          <label 
            htmlFor={`${baseId}-title`}
            className="block text-xs font-bold text-slate-500 mb-1 uppercase"
          >
            Titre / Objet <span className="text-red-500">*</span>
          </label>
          <input
            id={`${baseId}-title`}
            type="text"
            value={event.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Ex: Réunion de rentrée"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-[16px]"
          />
        </div>
      </div>

      {/* ------- LIGNE 2 : DATE + HEURE + DURÉE ------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* DATE */}
        <div>
          <label
            htmlFor={`${baseId}-date`}
            className="block text-xs font-bold text-slate-500 mb-1 uppercase"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            id={`${baseId}-date`}
            type="date"
            value={event.date}
            min={todayStr} // pas de date passée
            onChange={(e) => handleFieldChange('date', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-[16px] cursor-pointer"
          />
        </div>

        {/* HEURE */}
        <div>
          <label
            htmlFor={`${baseId}-time`}
            className="block text-xs font-bold text-slate-500 mb-1 uppercase"
          >
            Heure {!event.isAllDay && <span className="text-red-500">*</span>}
          </label>
          <input
            id={`${baseId}-time`}
            type="time"
            value={event.time}
            disabled={event.isAllDay}
            min={event.date && isToday && !event.isAllDay ? currentTimeStr : undefined}
            onChange={(e) => handleFieldChange('time', e.target.value)}
            className={`w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-[16px] cursor-pointer ${
              event.isAllDay ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          />
        </div>

        {/* DURÉE */}
        <div>
          <label
            htmlFor={`${baseId}-duration`}
            className="block text-xs font-bold text-slate-500 mb-1 uppercase"
          >
            Durée {!event.isAllDay && <span className="text-red-500">*</span>}
          </label>
          <select
            id={`${baseId}-duration`}
            value={durationValue}
            onChange={handleDurationChange}
            disabled={event.isAllDay}
            className={`w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-[16px] cursor-pointer ${
              event.isAllDay ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>1 heure</option>
            <option value={90}>1 h 30</option>
            <option value={120}>2 heures</option>
            <option value={180}>3 heures</option>
            <option value={240}>4 heures</option>
          </select>
        </div>
      </div>

      {/* ------- LIGNE 3 : JOURNÉE ENTIÈRE ------- */}
      <div className="flex justify-start md:justify-end">
        <button
          type="button"
          onClick={toggleAllDay}
          className={`inline-flex items-center justify-center rounded-lg border text-xs font-semibold px-4 py-2 transition
            ${event.isAllDay 
              ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' 
              : 'border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 bg-white'
            }`}
        >
          Journée entière
        </button>
      </div>
    </div>
  );
};

export default EventCard;