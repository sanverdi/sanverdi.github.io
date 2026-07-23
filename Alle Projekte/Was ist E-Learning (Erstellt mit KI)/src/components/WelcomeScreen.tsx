import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Layers, Brain, Lightbulb, Target, ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const modules = [
    { icon: BookOpen, title: "Grundlagen", desc: "Definitionen & Merkmale", color: "bg-blue-100 text-blue-600" },
    { icon: Layers, title: "Formate", desc: "LMS, LXP & Mobile Learning", color: "bg-purple-100 text-purple-600" },
    { icon: Brain, title: "Psychologie", desc: "Gedächtnis & Kompetenzen", color: "bg-pink-100 text-pink-600" },
    { icon: Lightbulb, title: "Didaktik", desc: "Lerntheorien & Methoden", color: "bg-amber-100 text-amber-600" },
    { icon: Target, title: "Planung", desc: "Standards & Qualität", color: "bg-emerald-100 text-emerald-600" },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl w-full text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-700 rounded-full font-semibold text-sm mb-8 border border-indigo-100 shadow-sm">
          <Sparkles size={14} className="text-amber-500" />
          <span className="tracking-wide uppercase text-xs">Interaktiver Kurs • Technische Kommunikation</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
          E-Learning <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Masterclass
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto font-light">
          Willkommen zur E-Learning Masterclass. In diesem Kurs lernen Sie die Grundlagen, Formate, psychologischen Hintergründe und didaktischen Methoden des digitalen Lernens kennen. Bereiten Sie sich darauf vor, E-Learning-Konzepte professionell zu planen und umzusetzen.
        </p>

        {/* Module Timeline / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 text-left">
          {modules.map((mod, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="glass-card p-5 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 ${mod.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <mod.icon size={22} />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{mod.title}</h3>
              <p className="text-xs text-gray-500 leading-snug">{mod.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-800 transition-all"
        >
          <span>Kurs starten</span>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight size={16} />
          </div>
        </motion.button>
        
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400 font-medium">
          <span className="flex items-center gap-1"><Play size={14} /> 30 Min.</span>
          <span className="flex items-center gap-1"><Layers size={14} /> 5 Module</span>
          <span className="flex items-center gap-1"><Target size={14} /> Quiz</span>
        </div>
      </motion.div>
    </div>
  );
}
