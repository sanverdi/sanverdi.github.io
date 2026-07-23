/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy, LayoutGrid, Award, Menu, X, Lock, RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import Sidebar from './components/Sidebar';
import { courseData, bonusQuestions } from './data';

type Screen = 'welcome' | 'dashboard' | 'lesson' | 'bonus';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeLesson = courseData.find(l => l.id === activeLessonId);
  const activeLessonIndex = courseData.findIndex(l => l.id === activeLessonId);
  const nextLesson = courseData[activeLessonIndex + 1];

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
      setCurrentScreen('lesson');
      window.scrollTo(0, 0);
    } else {
      // If no next lesson, check if all are completed
      const allCompleted = courseData.every(l => completedLessons.includes(l.id) || l.id === activeLessonId);
      if (allCompleted) {
        // Just go back to dashboard, maybe show a toast or something in a real app
        // For now, reset active lesson and go to dashboard
        setActiveLessonId(null);
        setCurrentScreen('dashboard');
      } else {
        setActiveLessonId(null);
        setCurrentScreen('dashboard');
      }
      window.scrollTo(0, 0);
    }
  };

  const handleSelectLesson = (id: string) => {
    setActiveLessonId(id);
    setCurrentScreen('lesson');
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSelectBonus = () => {
    setActiveLessonId(null);
    setCurrentScreen('bonus');
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const progress = Math.round((completedLessons.length / courseData.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 h-16 flex items-center">
        <div className="w-full px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {currentScreen !== 'welcome' && (
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
            
            <div 
              className="flex items-center gap-2 font-bold text-xl cursor-pointer"
              onClick={() => setCurrentScreen('welcome')}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <BookOpen size={18} />
              </div>
              <span className="hidden sm:inline">E-Learning Kompakt</span>
            </div>
          </div>

          {currentScreen !== 'welcome' && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fortschritt</span>
                <div className="w-32 h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setActiveLessonId(null);
                  setCurrentScreen('dashboard');
                }}
                className={`p-2 rounded-lg transition-colors ${currentScreen === 'dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                title="Übersicht"
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex pt-16 flex-1 h-screen overflow-hidden">
        {/* Sidebar (Desktop) */}
        {currentScreen !== 'welcome' && (
          <div className="hidden lg:block w-80 h-full overflow-y-auto border-r border-gray-200 bg-white shrink-0">
            <Sidebar 
              lessons={courseData}
              activeLessonId={activeLessonId}
              completedLessons={completedLessons}
              onSelectLesson={handleSelectLesson}
              onSelectBonus={handleSelectBonus}
              isBonusActive={currentScreen === 'bonus'}
            />
          </div>
        )}

        {/* Sidebar (Mobile Overlay) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-2xl lg:hidden pt-16"
            >
              <Sidebar 
                lessons={courseData}
                activeLessonId={activeLessonId}
                completedLessons={completedLessons}
                onSelectLesson={handleSelectLesson}
                onSelectBonus={handleSelectBonus}
                isBonusActive={currentScreen === 'bonus'}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {currentScreen === 'welcome' && (
                <motion.div key="welcome" exit={{ opacity: 0, y: -20 }}>
                  <WelcomeScreen onStart={() => setCurrentScreen('dashboard')} />
                </motion.div>
              )}

              {currentScreen === 'dashboard' && (
                <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-10 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Lektionsübersicht</h2>
                    <p className="text-lg text-gray-600 max-w-2xl">Wählen Sie ein Modul, um Ihr Wissen zu vertiefen. Wir empfehlen, der Reihenfolge zu folgen.</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseData.map((lesson, index) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      // const isLocked = index > 0 && !completedLessons.includes(courseData[index - 1].id) && !isCompleted;
                      const isLocked = false; // Unlock all lessons
                      const Icon = lesson.icon;
                      
                      return (
                        <motion.div
                          key={lesson.id}
                          whileHover={!isLocked ? { y: -8, scale: 1.02 } : {}}
                          className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-300 group
                            ${isLocked 
                              ? 'bg-gray-50 border border-gray-200 opacity-70 cursor-not-allowed' 
                              : 'bg-white border border-white shadow-lg shadow-indigo-100/50 cursor-pointer hover:shadow-xl hover:shadow-indigo-200/50'
                            }
                            ${isCompleted ? 'ring-2 ring-emerald-100' : ''}
                          `}
                          onClick={() => !isLocked && handleSelectLesson(lesson.id)}
                        >
                          {/* Decorative Background Blob */}
                          {!isLocked && (
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors" />
                          )}

                          <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                              <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 duration-300
                                ${isCompleted 
                                  ? 'bg-emerald-100 text-emerald-600' 
                                  : isLocked 
                                    ? 'bg-gray-200 text-gray-400' 
                                    : 'bg-indigo-600 text-white'
                                }
                              `}>
                                <Icon size={28} />
                              </div>
                              {isCompleted && (
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                  <CheckCircle size={12} />
                                  Fertig
                                </div>
                              )}
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                              {lesson.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                              {lesson.description}
                            </p>
                            
                            <div className={`flex items-center text-sm font-bold ${isLocked ? 'text-gray-400' : 'text-indigo-600'}`}>
                              {isLocked ? (
                                <span className="flex items-center gap-2"><Lock size={16} /> Lektion gesperrt</span>
                              ) : isCompleted ? (
                                <span className="flex items-center gap-2">Lektion wiederholen <RefreshCw size={16} /></span>
                              ) : (
                                <span className="flex items-center gap-2 group-hover:gap-3 transition-all">Lektion starten <ArrowRight size={16} /></span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    
                    {/* Bonus Card */}
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-200 cursor-pointer group"
                      onClick={handleSelectBonus}
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16 transform rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                      
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
                            <Trophy size={28} />
                          </div>
                          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/30">
                            Expert
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3">Bonus Challenge</h3>
                        <p className="text-orange-50 text-sm leading-relaxed mb-8">
                          Beweisen Sie Ihr Expertenwissen in diesem anspruchsvollen Zusatzmodul.
                        </p>
                        
                        <div className="mt-auto flex items-center text-sm font-bold text-white group-hover:gap-3 transition-all">
                          Challenge annehmen <ArrowRight size={16} className="ml-2" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentScreen === 'lesson' && activeLesson && (
                <motion.div key={`lesson-${activeLesson.id}`}>
                  <LessonView 
                    lesson={activeLesson}
                    onBack={() => {
                      setActiveLessonId(null);
                      setCurrentScreen('dashboard');
                    }}
                    onComplete={() => handleLessonComplete(activeLesson.id)}
                    onNextLesson={handleNextLesson}
                  />
                </motion.div>
              )}

              {currentScreen === 'bonus' && (
                <motion.div 
                  key="bonus"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors lg:hidden"
                  >
                    ← Zurück zur Übersicht
                  </button>
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-3xl mx-auto">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white text-center">
                      <Trophy size={48} className="mx-auto mb-4 opacity-90" />
                      <h1 className="text-3xl font-bold mb-2">Bonus Challenge</h1>
                      <p className="text-amber-100">Zusatzfragen für Profis</p>
                    </div>
                    <div className="p-8">
                      <QuizView 
                        questions={bonusQuestions} 
                        title="Experten-Wissen" 
                        isBonus={true}
                        onComplete={() => {}}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}


