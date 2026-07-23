import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Lock, Play, BookOpen, Trophy, ChevronRight } from 'lucide-react';
import { Lesson } from '../data';

interface SidebarProps {
  lessons: Lesson[];
  activeLessonId: string | null;
  completedLessons: string[];
  onSelectLesson: (id: string) => void;
  onSelectBonus: () => void;
  isBonusActive: boolean;
}

export default function Sidebar({ 
  lessons, 
  activeLessonId, 
  completedLessons, 
  onSelectLesson,
  onSelectBonus,
  isBonusActive
}: SidebarProps) {
  return (
    <div className="w-full h-full bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h2 className="font-bold text-xl text-white flex items-center gap-3 font-display">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
            <BookOpen size={18} />
          </div>
          Kursstruktur
        </h2>
        
        <div className="mt-6">
          <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
            <span>Fortschritt</span>
            <span>{Math.round((completedLessons.length / lessons.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" 
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isActive = activeLessonId === lesson.id;
          // const isLocked = index > 0 && !completedLessons.includes(lessons[index - 1].id) && !isCompleted && !isActive;
          const isLocked = false; // Unlock all lessons

          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && onSelectLesson(lesson.id)}
              disabled={isLocked}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 group relative overflow-hidden ${
                isActive 
                  ? 'bg-slate-800 text-white shadow-md' 
                  : isLocked 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'hover:bg-slate-800/50 text-slate-300 hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl" />
              )}
              
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all
                ${isCompleted 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : isActive 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' 
                    : isLocked
                      ? 'bg-slate-800 text-slate-600'
                      : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-300'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle size={16} />
                ) : isLocked ? (
                  <Lock size={14} />
                ) : (
                  <span className="text-xs font-bold font-mono">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {lesson.title}
                </h3>
                <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider mt-0.5">
                  {isCompleted ? 'Erledigt' : isLocked ? 'Gesperrt' : 'Offen'}
                </p>
              </div>

              {isActive && <ChevronRight size={16} className="text-indigo-400" />}
            </button>
          );
        })}

        <div className="my-4 border-t border-slate-800/50" />

        <button
          onClick={onSelectBonus}
          className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 group ${
            isBonusActive 
              ? 'bg-amber-500/10 border border-amber-500/20 text-amber-200' 
              : 'hover:bg-slate-800/50 text-slate-400 hover:text-amber-200'
          }`}
        >
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all
            ${isBonusActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-slate-800 text-amber-600 group-hover:bg-amber-500 group-hover:text-white'}
          `}>
            <Trophy size={16} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium">Bonus Challenge</h3>
            <p className="text-[10px] opacity-70 uppercase tracking-wider mt-0.5">Für Experten</p>
          </div>
        </button>
      </div>
      
      <div className="p-4 border-t border-slate-800 text-center">
        <p className="text-[10px] text-slate-600">Technische Kommunikation • 4. Semester</p>
      </div>
    </div>
  );
}
