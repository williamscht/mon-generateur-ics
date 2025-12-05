import React from 'react';
import { Trash2 } from 'lucide-react';

const EVENT_TYPES = ['Bureau', 'CA', 'AG', 'Commission', 'Comité', 'Autre'];

const EventCard = ({ event, index, totalEvents, onUpdate, onRemove }) => {

  const baseId = `event-${event.id}`;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 transition hover:shadow-md">
      
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
            {/* ⛔ Ne pas modifier : ceci est ton bouton TRASH original */}
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        
        {/* TYPE */}
        <div className="xl:col-span-3">
          <label 
            htmlFor={`${baseId}-type`}
            className="block text-xs font-bold text-slate-500 mb-1 uppercase"
          >
            Type
          </label>
          <select
            id={`${baseId}-type`}
            value={event.type}
            onChange={(e) => onUpdate(event.id, 'type', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg 
                       focus:ring-2 focus:ring-indigo-500 outline-none text-[16px] cursor-pointer"
          >
            {EVENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* TITRE */}
        <div className="xl:col-span-5">
          <label 
            htmlFor={`${baseId}-title`}
            className="block text-xs font-bold text-slate-500 mb-1 uppercase"
          >
            Titre / Objet
          </label>
          <input
            id={`${baseId}-title`}
            type="text"
            value={event.title}
            onChange={(e) => onUpdate(event.id, 'title', e.target.value)}
            placeholder="Ex: Réunion de rentrée"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg 
                       focus:ring-2 focus:ring-indigo-500 outline-none text-[16px]"
          />
        </div>

        {/* DATE + HEURE */}
        <div className="md:col-span-2 xl:col-span-4 grid grid-cols-2 gap-4">
          
          <div>
            <label
              htmlFor={`${baseId}-date`}
              className="block text-xs font-bold text-slate-500 mb-1 uppercase"
            >
              Date
            </label>
            <input
              id={`${baseId}-date`}
              type="date"
              value={event.date}
              onChange={(e) => onUpdate(event.id, 'date', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 outline-none text-[16px] cursor-pointer"
            />
          </div>

          <div>
            <label
              htmlFor={`${baseId}-time`}
              className="block text-xs font-bold text-slate-500 mb-1 uppercase"
            >
              Heure
            </label>
            <input
              id={`${baseId}-time`}
              type="time"
              value={event.time}
              onChange={(e) => onUpdate(event.id, 'time', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 outline-none text-[16px] cursor-pointer"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default EventCard;