import React from 'react';
import { Calendar, Info, X, CheckCircle } from 'lucide-react';

const Header = ({ showInstructions, toggleInstructions }) => {
  return (
    // sticky top-0 + backdrop-blur = Le header reste en haut et le contenu glisse dessous avec un effet flou
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md mb-8 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-4 md:px-8">
        
        {/* Barre du haut : Titre + Bouton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Titre */}
          <div className="flex items-center gap-3 group">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 transition-transform group-hover:scale-105 group-hover:rotate-3">
              <Calendar size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                Générateur ICS
              </h1>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Planning & Calendrier
              </p>
            </div>
          </div>

          {/* Bouton Toggle Aide */}
          <button 
            onClick={toggleInstructions}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border
              ${showInstructions 
                ? 'bg-indigo-50 text-indigo-700 border-indigo-100 ring-2 ring-indigo-500/20' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            {showInstructions ? <X size={18} /> : <Info size={18} />}
            {showInstructions ? 'Fermer l\'aide' : 'Comment ça marche ?'}
          </button>
        </div>

        {/* Panneau d'instructions (Dépliant) */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showInstructions ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="bg-indigo-50/80 rounded-xl p-5 border border-indigo-100 text-sm md:text-base">
            <h3 className="font-bold text-indigo-900 flex items-center gap-2 mb-3">
              <CheckCircle size={20} className="text-indigo-600" />
              Mode d'emploi rapide :
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-indigo-800/80">
              <div className="bg-white/60 p-3 rounded-lg">
                <span className="font-bold text-indigo-600 block mb-1">1. Saisissez</span>
                Remplissez les détails de vos réunions (Date, Titre, Type).
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <span className="font-bold text-indigo-600 block mb-1">2. Téléchargez</span>
                Récupérez le fichier .ics généré automatiquement.
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <span className="font-bold text-indigo-600 block mb-1">3. Partagez</span>
                Créez un QR Code ou envoyez le fichier à vos équipes.
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;