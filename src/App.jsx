import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react'; // On a retiré Calendar, Info, etc. car ils sont dans Header maintenant

// Imports Composants
import Header from './components/Header'; // <-- NOUVEAU
import EventCard from './components/EventCard';
import ImportExcel from './components/ImportExcel';
import { generateICSContent } from './utils/icsGenerator.js';

const App = () => {
  const [events, setEvents] = useState([
    { id: 1, title: '', date: '', time: '09:00', type: 'Bureau', duration: 60, isAllday: false }
  ]);
  const [orgName, setOrgName] = useState('');
  
  // L'état de l'aide est géré ici, mais passé au Header pour affichage
  const [showInstructions, setShowInstructions] = useState(true);

  const isEventValid = (e) => {
  if (!e.title || !e.date) return false;
  if (e.isAllDay) return true;
  return Boolean(e.time && e.duration);
};

const validEvents = events.filter(isEventValid).length;

  const addEvent = () => {
    setEvents([...events, { id: Date.now(), title: '', date: '', time: '09:00', type: 'Bureau', duration: 60, isAllday: false }]);
  };

  const removeEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const updateEvent = (id, field, value) => {
    setEvents(events.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleImportSuccess = (newEvents) => {
    // On ajoute les nouveaux événements à la suite de ceux existants
    setEvents(prevEvents => [...prevEvents, ...newEvents]);
    alert(`${newEvents.length} événements importés avec succès !`);
  };

  const handleDownload = () => {
    const icsData = generateICSContent(events, orgName);
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `calendrier-${(orgName || 'export').replace(/\s+/g, '-').toLowerCase()}.ics`;
    link.click();
  };

  return (
    <div className="min-h-screen pb-12"> {/* pb-12 pour laisser de l'espace en bas */}
      
      {/* Intégration du Header Moderne */}
      <Header 
        showInstructions={showInstructions} 
        toggleInstructions={() => setShowInstructions(!showInstructions)} 
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8">
      <ImportExcel onImportSuccess={handleImportSuccess} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne Gauche : Formulaires */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-shadow hover:shadow-md">
              <label 
                htmlFor='orga-name-input'
                className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Organisation
              </label>
              <input 
                id='orga-name-input'
                type="text" 
                value={orgName} 
                onChange={(e) => setOrgName(e.target.value)} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: Association des Maires, Conseil XYZ..."
              />
            </div>

            <div className="space-y-4">
              {events.map((event, index) => (
                <EventCard 
                  key={event.id}
                  event={event}
                  index={index}
                  totalEvents={events.length}
                  onUpdate={updateEvent}
                  onRemove={removeEvent}
                />
              ))}
            </div>

            <button 
              onClick={addEvent} 
              className="group w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
            >
              <div className="p-1 bg-slate-200 rounded-full group-hover:bg-indigo-200 transition-colors">
                <Plus size={16} />
              </div>
              Ajouter un événement
            </button>
          </div>

          {/* Colonne Droite : Action (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6"> {/* top-32 pour être sous le header */}
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-indigo-100 border border-white">
                <h2 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                  <Download className="text-indigo-600" size={24}/>
                  Exportation
                </h2>
                
                <div className="mb-6">
                   <div className="flex justify-between text-sm text-slate-600 mb-2">
                     <span>Progression</span>
                     <span className="font-bold">{validEvents} / {events.length}</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(validEvents / events.length) * 100}%` }}
                      ></div>
                   </div>
                </div>
                
                <button
                  onClick={handleDownload}
                  disabled={validEvents === 0}
                  className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                  Télécharger le fichier .ICS
                </button>
                
                <p className="mt-4 text-xs text-center text-slate-400">
                  Compatible Outlook, Google, Apple
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;