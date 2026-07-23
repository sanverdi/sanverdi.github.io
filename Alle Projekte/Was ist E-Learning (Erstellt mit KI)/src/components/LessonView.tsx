import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ThumbsUp, ThumbsDown, Scale, Zap, Target, Quote, Info, ChevronUp, ChevronDown } from 'lucide-react';
import { Lesson, ContentSection } from '../data';
import QuizView from './QuizView';
import ScenarioView from './ScenarioView';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
  onNextLesson?: () => void;
}

interface CardData {
  title: string;
  text: string;
}

const renderTextWithBold = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, j) => 
    part.startsWith('**') && part.endsWith('**') 
      ? <strong key={j} className="font-bold">{part.slice(2, -2)}</strong> 
      : part
  );
};

const FlipCard: React.FC<{ title: string; text: string }> = ({ title, text }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-56 perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white border border-indigo-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm group-hover:shadow-md group-hover:border-indigo-300 transition-all">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
            <Info size={24} />
          </div>
          <h4 className="font-bold text-gray-900 text-lg leading-tight">{title}</h4>
          <p className="text-xs text-indigo-400 mt-4 uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            Klicken zum Umdrehen
          </p>
        </div>

        {/* Back */}
        <div 
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 flex items-center justify-center text-center shadow-xl overflow-y-auto"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="text-white font-medium leading-relaxed text-sm md:text-base">
            {text.split('\n').map((line, i) => (
              <p key={i} className={`${i === 0 ? 'font-bold mb-2' : ''} ${line.startsWith('•') ? 'text-left ml-2' : 'mb-2 last:mb-0'}`}>
                {line.split(/(\*\*.*?\*\*)/g).map((part, j) => 
                  part.startsWith('**') && part.endsWith('**') 
                    ? <strong key={j} className="font-extrabold text-yellow-300">{part.slice(2, -2)}</strong> 
                    : part
                )}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProcessView: React.FC<{ steps: { title: string; description: string }[] }> = ({ steps = [] }) => (
  <div className="py-8 overflow-x-auto">
    <div className="flex flex-col md:flex-row gap-4 min-w-max md:min-w-0">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 relative group min-w-[200px]">
          {/* Connector Line (Desktop) */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-8 left-1/2 w-full h-1 bg-indigo-100 -z-10"></div>
          )}
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl shadow-sm mb-4 group-hover:border-indigo-500 group-hover:scale-110 transition-all z-10">
              {step.title.charAt(0)}
            </div>
            <h4 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed px-2">{renderTextWithBold(step.description)}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GoldenCircleView: React.FC<{ data: any[] }> = ({ data = [] }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const why = data.find(d => d.title === 'WHY');
  const how = data.find(d => d.title === 'HOW');
  const what = data.find(d => d.title === 'WHAT');

  const getSectionStyle = (sectionName: string) => {
    const isActive = activeSection === sectionName;
    const isDimmed = activeSection && activeSection !== sectionName;
    
    return {
      opacity: isDimmed ? 0.3 : 1,
      transform: isActive ? 'translateX(10px) scale(1.02)' : 'translateX(0) scale(1)',
      transition: 'all 0.3s ease',
      cursor: 'default'
    };
  };

  const getCircleStyle = (sectionName: string) => {
    const isActive = activeSection === sectionName;
    return {
      transform: isActive ? 'scale(1.1)' : 'scale(1)',
      transition: 'transform 0.3s ease'
    };
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center py-8">
      {/* Visualization Left */}
      <div className="flex justify-center">
        <div 
          className="relative w-64 h-64 flex items-center justify-center rounded-full bg-indigo-50 border-4 border-white shadow-xl z-10 cursor-pointer"
          style={getCircleStyle('WHAT')}
          onMouseEnter={() => setActiveSection('WHAT')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className="absolute top-4 text-center w-full pointer-events-none">
            <div className="font-bold text-indigo-900 text-sm">WHAT</div>
          </div>
          
          <div 
            className="absolute w-44 h-44 flex items-center justify-center rounded-full bg-indigo-200 border-4 border-white shadow-lg z-20 cursor-pointer"
            style={getCircleStyle('HOW')}
            onMouseEnter={(e) => { e.stopPropagation(); setActiveSection('HOW'); }}
            onMouseLeave={(e) => { e.stopPropagation(); setActiveSection('WHAT'); }}
          >
            <div className="absolute top-4 text-center w-full pointer-events-none">
              <div className="font-bold text-indigo-900 text-sm">HOW</div>
            </div>

            <div 
              className="absolute w-24 h-24 flex items-center justify-center rounded-full bg-indigo-600 border-4 border-white shadow-md z-30 cursor-pointer"
              style={getCircleStyle('WHY')}
              onMouseEnter={(e) => { e.stopPropagation(); setActiveSection('WHY'); }}
              onMouseLeave={(e) => { e.stopPropagation(); setActiveSection('HOW'); }}
            >
              <div className="font-bold text-white text-sm pointer-events-none">WHY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Right */}
      <div className="space-y-6">
        <div 
          className="flex gap-4 items-start p-3 rounded-xl hover:bg-indigo-50/50 transition-colors"
          style={getSectionStyle('WHY')}
          onMouseEnter={() => setActiveSection('WHY')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 font-bold shrink-0 border-2 border-white shadow-sm">
            1
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 text-lg mb-1">{why?.title}</h4>
            <p className="text-gray-600 leading-relaxed">{why?.text}</p>
          </div>
        </div>
        
        <div 
          className="flex gap-4 items-start p-3 rounded-xl hover:bg-indigo-50/50 transition-colors"
          style={getSectionStyle('HOW')}
          onMouseEnter={() => setActiveSection('HOW')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-900 font-bold shrink-0 border-2 border-white shadow-sm">
            2
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 text-lg mb-1">{how?.title}</h4>
            <p className="text-gray-600 leading-relaxed">{how?.text}</p>
          </div>
        </div>
        
        <div 
          className="flex gap-4 items-start p-3 rounded-xl hover:bg-indigo-50/50 transition-colors"
          style={getSectionStyle('WHAT')}
          onMouseEnter={() => setActiveSection('WHAT')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0 border-2 border-white shadow-sm">
            3
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 text-lg mb-1">{what?.title}</h4>
            <p className="text-gray-600 leading-relaxed">{what?.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PyramidView: React.FC<{ data: any[] }> = ({ data = [] }) => (
  <div className="flex justify-center py-8">
    <div className="relative w-full max-w-md flex flex-col items-center gap-1">
      {data.map((item, index) => {
        // Calculate width to create pyramid shape (Top item narrow, Bottom item wide)
        // Index 0 is top (Erschaffen), Index 5 is bottom (Erinnern)
        const widthPercentage = 30 + (index * (70 / (data.length - 1)));
        
        return (
          <div 
            key={index}
            className="h-12 flex items-center justify-center text-center px-4 shadow-sm hover:scale-105 transition-transform cursor-default relative group"
            style={{ 
              width: `${widthPercentage}%`,
              backgroundColor: `hsl(240, 70%, ${90 - (index * 10)}%)`,
              color: index < 2 ? '#1e1b4b' : 'white',
              borderRadius: '4px'
            }}
          >
            <span className="font-bold text-sm md:text-base truncate">{item.title}</span>
            
            {/* Tooltip for description */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-gray-900 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {item.text}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          </div>
        );
      })}
      
      {/* Base Label */}
      <div className="mt-4 text-xs text-gray-400 uppercase tracking-widest font-semibold">
        Basis: Wissen & Erinnern
      </div>
    </div>
  </div>
);

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        {isOpen ? <ChevronUp size={20} className="text-indigo-600" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-gray-600 border-t border-gray-100 bg-gray-50/50">
              {renderTextWithBold(content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LessonView({ lesson, onBack, onComplete, onNextLesson }: LessonViewProps) {
  const [step, setStep] = useState<'content' | 'quiz'>('content');

  const renderContent = (section: ContentSection, index: number) => {
    const contentBlock = (() => {
      switch (section.type) {
        case 'definition':
          return (
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-sm">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
              <div className="flex gap-4 items-start relative z-10">
                <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600 shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="text-blue-800 font-bold mb-1 uppercase text-xs tracking-wider">Definition</h4>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">{section.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed font-light">
                    {renderTextWithBold(section.content as string)}
                  </p>
                </div>
              </div>
            </div>
          );
        case 'list':
          if (section.variant === 'cards') {
            return (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">{section.title}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(Array.isArray(section.content) ? section.content : []).map((item, i) => {
                    const [title, desc] = item.includes(':') ? item.split(':') : [item, ''];
                    return (
                      <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all group">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></div>
                          <div>
                            <span className="block font-bold text-gray-900 mb-1">{title}</span>
                            {desc && <span className="text-gray-600 text-sm leading-relaxed block">{renderTextWithBold(desc)}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">{section.title}</h3>
              <ul className="space-y-3">
                {(Array.isArray(section.content) ? section.content : []).map((item, i) => {
                  const hasColon = item.includes(':');
                  const [title, ...rest] = hasColon ? item.split(':') : [item];
                  const content = rest.join(':').trim();
                  
                  return (
                    <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="mt-1 min-w-5 min-h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <CheckCircle2 size={14} />
                      </div>
                      <div className="flex-1">
                        {hasColon ? (
                          <>
                            <strong className="block text-gray-900 mb-1 text-lg">{title}:</strong>
                            <span className="text-gray-700 block leading-relaxed">{renderTextWithBold(content)}</span>
                          </>
                        ) : (
                          <span className="text-gray-700 font-medium">{renderTextWithBold(item)}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        case 'comparison':
          if (section.variant === 'pro-con') {
            return (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">{section.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {(section.items || []).map((item, i) => {
                    const isPro = item.term.toLowerCase().includes('pro') || item.term.toLowerCase().includes('dafür');
                    return (
                      <div key={i} className={`rounded-2xl p-6 border-2 ${isPro ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg ${isPro ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'}`}>
                            {isPro ? <ThumbsUp size={20} /> : <ThumbsDown size={20} />}
                          </div>
                          <h4 className={`font-bold text-lg ${isPro ? 'text-emerald-900' : 'text-rose-900'}`}>{item.term}</h4>
                        </div>
                        <div className={`${isPro ? 'text-emerald-800' : 'text-rose-800'} leading-relaxed`}>
                          {item.definition.split('\n').map((line, j) => (
                            <p key={j} className={`${j === 0 && !line.startsWith('•') ? 'font-bold mb-2' : ''} ${line.startsWith('•') ? 'ml-4 mb-1' : 'mb-2'}`}>
                              {renderTextWithBold(line)}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          if (section.variant === 'versus') {
            return (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 font-display text-center">{section.title}</h3>
                <div className="relative grid md:grid-cols-2 gap-8">
                  {/* VS Badge */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-12 h-12 bg-gray-900 text-white rounded-full items-center justify-center font-black text-sm border-4 border-white shadow-lg">
                    VS
                  </div>
                  
                  {(section.items || []).map((item, i) => {
                    const isLeft = i === 0;
                    return (
                      <div key={i} className={`bg-white p-6 rounded-2xl shadow-lg border-t-4 ${isLeft ? 'border-indigo-500' : 'border-purple-500'} hover:-translate-y-1 transition-transform`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg ${isLeft ? 'bg-indigo-100 text-indigo-600' : 'bg-purple-100 text-purple-600'}`}>
                            {isLeft ? <Target size={24} /> : <Zap size={24} />}
                          </div>
                          <h4 className="font-bold text-xl text-gray-900">{item.term}</h4>
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                          {item.definition.split('\n').map((line, j) => (
                            <p key={j} className={`${j === 0 ? 'font-bold mb-2 text-gray-800' : ''} ${line.startsWith('•') ? 'ml-4 mb-1' : 'mb-2 last:mb-0'}`}>
                              {renderTextWithBold(line)}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">{section.title}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {(section.items || []).map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors">
                    <h4 className="font-bold text-indigo-600 mb-2">{item.term}</h4>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {item.definition.split('\n').map((line, j) => (
                        <p key={j} className={`${j === 0 ? 'font-bold mb-2 text-gray-800' : ''} ${line.startsWith('•') ? 'ml-4 mb-1' : 'mb-1 last:mb-0'}`}>
                          {renderTextWithBold(line)}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'interactive-card':
          return (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">{section.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(section.data || []).map((card: CardData, i: number) => (
                  <FlipCard key={i} title={card.title} text={card.text} />
                ))}
              </div>
            </div>
          );
        case 'process':
          return (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">{section.title}</h3>
              {section.content && (
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {renderTextWithBold(section.content as string)}
                </p>
              )}
              <ProcessView steps={section.steps || []} />
            </div>
          );
        case 'diagram':
          if (section.variant === 'golden-circle') {
            return (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">{section.title}</h3>
                {section.content && (
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    {renderTextWithBold(section.content as string)}
                  </p>
                )}
                <GoldenCircleView data={section.data || []} />
              </div>
            );
          }
          if (section.variant === 'pyramid') {
            return (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">{section.title}</h3>
                {section.content && (
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    {renderTextWithBold(section.content as string)}
                  </p>
                )}
                <PyramidView data={section.data || []} />
              </div>
            );
          }
          return null;
        case 'accordion':
          return (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">{section.title}</h3>
              <div className="space-y-3">
                {(section.accordionItems || []).map((item, i) => (
                  <AccordionItem key={i} title={item.title} content={item.content} />
                ))}
              </div>
            </div>
          );
        case 'scenario':
          return (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">{section.title}</h3>
              {section.scenario && <ScenarioView {...section.scenario} />}
            </div>
          );
        case 'image':
          return (
            <div className="my-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">{section.title}</h3>
              <figure className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <img 
                  src={section.src} 
                  alt={section.alt} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                {section.caption && (
                  <figcaption className="bg-gray-50 p-3 text-sm text-gray-500 text-center border-t border-gray-100">
                    {section.caption}
                  </figcaption>
                )}
              </figure>
            </div>
          );
        // ...
        default:
          return (
            <div className="prose prose-lg max-w-none text-gray-700">
              {section.title && <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">{section.title}</h3>}
              <p className="leading-relaxed">{renderTextWithBold(section.content as string)}</p>
            </div>
          );
      }
    })();

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="mb-16 last:mb-0"
      >
        {contentBlock}
      </motion.div>
    );
  };

  if (step === 'quiz') {
    return (
      <div>
        <button 
          onClick={() => setStep('content')}
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Zurück zum Inhalt
        </button>
        <QuizView 
          questions={lesson.quiz || []} 
          title={`Quiz: ${lesson.title}`} 
          onComplete={onComplete}
          onNextLesson={onNextLesson}
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        Zurück zur Übersicht
      </button>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden mb-12 border border-white">
        {/* Header */}
        <div className="relative bg-slate-900 p-8 md:p-12 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg">
                <BookOpen size={20} className="text-indigo-300" />
              </div>
              <span className="uppercase tracking-widest text-xs font-bold text-indigo-300">Lektion {lesson.id.split('-')[1]}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-display leading-tight">{lesson.title}</h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">{lesson.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 bg-white">
          {lesson.content.map((section, index) => renderContent(section, index))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-8 md:p-10 border-t border-gray-100 flex justify-between items-center">
          <p className="text-sm text-gray-500 hidden md:block">
            Lektion abgeschlossen? Testen Sie Ihr Wissen!
          </p>
          <button
            onClick={() => setStep('quiz')}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
          >
            <span>Weiter zum Quiz</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
