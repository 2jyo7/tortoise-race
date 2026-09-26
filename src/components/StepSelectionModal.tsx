'use client';

import React from 'react';

interface Props {
  onSelectStep: (stepSize: number) => void;
}

export const StepSelectionModal: React.FC<Props> = ({ onSelectStep }) => {
  const steps = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-sm sm:max-w-md w-full text-center shadow-2xl border-4 border-emerald-400 max-h-[90vh] flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-black text-emerald-600 mb-1 font-rounded">
          🐢 Tortoise Race!
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 font-medium">
          Choose step size (1 to 20):
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 overflow-y-auto p-1 max-h-[60vh]">
          {steps.map((num) => (
            <button
              key={num}
              onClick={() => onSelectStep(num)}
              className="h-11 sm:h-12 bg-emerald-100 text-emerald-800 text-lg sm:text-xl font-bold rounded-2xl border-2 border-emerald-300 hover:bg-emerald-500 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};