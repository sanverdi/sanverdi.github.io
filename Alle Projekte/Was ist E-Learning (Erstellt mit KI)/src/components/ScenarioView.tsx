import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ChevronRight, RefreshCw } from 'lucide-react';

interface ScenarioStep {
  title: string;
  description: string;
  content: React.ReactNode;
}

interface ScenarioProps {
  title: string;
  description: string;
  steps: ScenarioStep[];
}

export default function ScenarioView({ title, description, steps = [] }: ScenarioProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (index: number) => {
    // Allow going back or to completed steps
    if (index <= Math.max(...completedSteps, 0) + 1 || index < currentStep) {
      setCurrentStep(index);
    }
  };

  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden my-8">
      <div className="bg-indigo-900 p-6 text-white">
        <div className="uppercase tracking-wider text-xs font-bold text-indigo-300 mb-2">Fallstudie</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-indigo-200 text-sm">{description}</p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Steps Navigation */}
        <div className="bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-4 md:w-1/3">
          <div className="space-y-2">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = completedSteps.includes(index);
              const isAccessible = index <= Math.max(...completedSteps, -1) + 1;

              return (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  disabled={!isAccessible}
                  className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3
                    ${isActive ? 'bg-white shadow-sm text-indigo-700 border border-indigo-100' : 'text-gray-600 hover:bg-gray-100'}
                    ${!isAccessible ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0
                    ${isCompleted ? 'bg-green-100 text-green-600' : isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {isCompleted ? <Check size={14} /> : index + 1}
                  </div>
                  {step.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:w-2/3 min-h-[300px] flex flex-col">
          <div className="flex-1">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4">{steps[currentStep].title}</h4>
              <div className="prose prose-indigo prose-sm max-w-none text-gray-600">
                {steps[currentStep].content}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Abschließen' : 'Weiter'}
              {currentStep < steps.length - 1 && <ChevronRight size={16} />}
              {currentStep === steps.length - 1 && <Check size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
