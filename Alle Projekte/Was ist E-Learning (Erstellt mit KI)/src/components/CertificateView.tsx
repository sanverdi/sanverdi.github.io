import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Download, Share2, Home, RefreshCw } from 'lucide-react';

interface CertificateViewProps {
  onRestart: () => void;
  onHome: () => void;
}

export default function CertificateView({ onRestart, onHome }: CertificateViewProps) {
  const date = new Date().toLocaleDateString('de-DE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-indigo-50"
      >
        <div className="bg-indigo-900 p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-900 shadow-lg relative z-10"
          >
            <Award size={48} />
          </motion.div>
          <h1 className="text-4xl font-serif font-bold mb-2 relative z-10">Zertifikat</h1>
          <p className="text-indigo-200 uppercase tracking-widest text-sm relative z-10">Kursabschluss</p>
        </div>

        <div className="p-12 text-center">
          <p className="text-gray-500 mb-2">Hiermit wird bestätigt, dass</p>
          <div className="text-3xl font-bold text-gray-900 mb-8 font-serif italic border-b-2 border-gray-100 pb-4 inline-block min-w-[300px]">
            Studierende/r
          </div>
          
          <p className="text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
            den E-Learning-Kompaktkurs <strong>"E-Learning verstehen & gestalten"</strong> für den Studiengang Technische Kommunikation erfolgreich absolviert hat.
          </p>

          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mb-12 text-left">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Datum</p>
              <p className="font-medium text-gray-900">{date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Dauer</p>
              <p className="font-medium text-gray-900">ca. 30 Minuten</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              <Download size={20} />
              Zertifikat drucken
            </button>
            <button 
              onClick={onHome}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              <Home size={20} />
              Zur Übersicht
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
