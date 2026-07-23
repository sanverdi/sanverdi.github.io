import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Check, X, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question } from '../data';

interface QuizViewProps {
  questions: Question[];
  title: string;
  onComplete?: () => void;
  isBonus?: boolean;
  onNextLesson?: () => void;
}

export default function QuizView({ questions = [], title, onComplete, isBonus = false, onNextLesson }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        Keine Fragen verfügbar.
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return null;

  const positiveMessages = ["Super!", "Stark!", "Richtig!", "Klasse!", "Hervorragend!", "Weiter so!", "Exzellent!"];
  const negativeMessages = ["Schade, fast!", "Kopf hoch, weiter geht's!", "Aus Fehlern lernt man!", "Nicht ganz, aber guter Versuch!", "Beim nächsten Mal klappt's!"];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswer) {
      const newScore = score + 1;
      setScore(newScore);
      
      let msg = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
      
      // "Sobald 2 von 3 Fragen richtig beantwortet wurden soll ein Applaus kommen" -> Jetzt: Stark Emoji
      if (newScore === 2) {
        msg = "Stark! 💪";
      }
      
      setFeedbackMessage({ text: msg, type: 'success' });
    } else {
      const randomMsg = negativeMessages[Math.floor(Math.random() * negativeMessages.length)];
      setFeedbackMessage({ text: randomMsg, type: 'error' });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setFeedbackMessage(null);
    } else {
      setShowResult(true);
      
      // "Konfetti soll nur beim quizende kommen wo steht 3 von 3 fragen richtig beantwortet"
      if (score === questions.length) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899']
        });
      }

      // Only complete if passed (more than 1 correct answer out of 3, i.e. >= 2)
      const passed = score >= 2; 
      if (passed && onComplete) {
        onComplete();
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setFeedbackMessage(null);
  };

  if (showResult) {
    const passed = score >= 2;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full ${passed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
            {passed ? <Trophy size={48} /> : <RefreshCw size={48} />}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{passed ? 'Quiz bestanden!' : 'Nicht bestanden'}</h2>
        <p className="text-xl text-gray-600 mb-8">
          Sie haben <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>{score}</span> von <span className="font-bold text-gray-900">{questions.length}</span> Fragen richtig beantwortet.
          {!passed && <span className="block mt-2 text-base text-gray-500">Sie benötigen mindestens 2 richtige Antworten.</span>}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={handleRetry}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${passed ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'}`}
          >
            <RefreshCw size={20} />
            Wiederholen
          </button>
          
          {passed && onNextLesson && (
            <button 
              onClick={onNextLesson}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Nächste Lektion
              <ChevronRight size={20} />
            </button>
          )}

          {passed && isBonus && (
            <div className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-medium flex items-center justify-center gap-2">
              <Check size={20} />
              Bonus abgeschlossen!
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Frage {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let stateClass = "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
              
              if (isAnswered) {
                if (index === currentQuestion.correctAnswer) {
                  stateClass = "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedOption) {
                  stateClass = "border-red-500 bg-red-50 text-red-800";
                } else {
                  stateClass = "border-gray-200 opacity-50";
                }
              } else if (selectedOption === index) {
                stateClass = "border-indigo-500 bg-indigo-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${stateClass}`}
                >
                  <span>{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && <Check size={20} className="text-green-600" />}
                  {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && <X size={20} className="text-red-600" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-6 border-t border-gray-100"
              >
                {feedbackMessage && (
                  <div className={`mb-4 p-4 rounded-xl text-center font-bold text-lg ${feedbackMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {feedbackMessage.text}
                  </div>
                )}
                
                <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
                  <p className="font-semibold mb-1">Erklärung:</p>
                  {currentQuestion.explanation}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen'}
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 w-full">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
