import React from 'react';
import { Trash2 } from 'lucide-react';

const EVENT_TYPES = ['Bureau', 'CA', 'AG', 'Commission', 'Comité', 'Autre'];

const EventCard = ({ event, index, totalEvents, onUpdate, onRemove }) => {
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
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* CORRECTION LAYOUT : 
         - grid-cols-1 (Mobile) : Tout empilé
         - md:grid-cols-2 (Tablette) : 2 éléments par ligne (Type/Titre puis Date/Heure)
         - xl:grid-cols-12 (Grand écran) : Tout sur une ligne avec des largeurs précises
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        
        {/* Type : Prend 3 colonnes sur grand écran */}
        <div className="xl:col-span-3">
          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Type</label>
          <select
            value={event.type}
            onChange={(e) => onUpdate(event.id, 'type', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm cursor-pointer"
          >
            {EVENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Titre : Prend 5 colonnes sur grand écran */}
        <div className="xl:col-span-5">
          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Titre / Objet</label>
          <input
            type="text"
            value={event.title}
            onChange={(e) => onUpdate(event.id, 'title', e.target.value)}
            placeholder="Ex: Réunion de rentrée"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>

        {/* Date & Heure : Prennent 4 colonnes restantes sur grand écran */}
        {/* Note : Sur tablette (md), ce bloc prendra toute la largeur de la 2ème ligne grâce au col-span-2 du parent implicite ou on peut forcer un wrapper */}
        <div className="md:col-span-2 xl:col-span-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Date</label>
            <input
              type="date"
              value={event.date}
              onChange={(e) => onUpdate(event.id, 'date', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Heure</label>
            <input
              type="time"
              value={event.time}
              onChange={(e) => onUpdate(event.id, 'time', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;