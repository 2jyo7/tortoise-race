'use client';

import React from 'react';
import { TOTAL_JUMPS, getProgressPercentage } from '@/domain/gameLogic';

interface Props {
  stepSize: number;
  currentStepIndex: number;
  children?: React.ReactNode;
}

export const RaceTrack: React.FC<Props> = ({ stepSize, currentStepIndex, children }) => {
  const progressPercent = getProgressPercentage(currentStepIndex, TOTAL_JUMPS);
  const totalStepsArray = Array.from({ length: TOTAL_JUMPS }, (_, i) => i + 1);

  return (
    <div className="relative w-full max-w-4xl bg-linear-to-b from-sky-300 via-sky-200 to-emerald-100 rounded-3xl p-4 sm:p-8 shadow-2xl border-4 border-sky-300 my-auto flex flex-col gap-4 sm:gap-6 overflow-hidden">
      
      {/* Playful Background Elements (Sun & Clouds) */}
      <div className="absolute top-3 left-4 text-3xl sm:text-4xl animate-bounce pointer-events-none opacity-80">
        ☀️
      </div>
      <div className="absolute top-4 right-8 text-2xl sm:text-3xl pointer-events-none opacity-70 animate-pulse">
        ☁️
      </div>

      {/* Top Header Controls Area */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        {/* Step Size Badge */}
        <div className="bg-white/95 backdrop-blur px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-md border-2 border-sky-200 text-center w-full sm:w-auto min-w-30">
          <span className="text-[10px] sm:text-xs text-sky-800 uppercase tracking-wider block font-black">
            COUNTING BY
          </span>
          <span className="text-xl sm:text-2xl font-black text-sky-600">+{stepSize}</span>
        </div>

        {/* Center Input Bubble Slot */}
        <div className="flex-1 flex justify-center w-full sm:w-auto">
          {children}
        </div>

        {/* Progress Badge */}
        <div className="bg-white/95 backdrop-blur px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-md border-2 border-sky-200 text-center w-full sm:w-auto min-w-30">
          <span className="text-[10px] sm:text-xs text-sky-800 uppercase tracking-wider block font-black">
            STEP PROGRESS
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600">
            {currentStepIndex} / {TOTAL_JUMPS}
          </span>
        </div>
      </div>

      {/* Race Track Bar */}
      <div className="relative z-10 h-32 sm:h-36 bg-amber-200/95 rounded-2xl border-b-8 border-amber-500 flex items-end pb-3 sm:pb-4 px-4 sm:px-10 shadow-inner mt-2 overflow-x-auto overflow-y-visible">
        
        {/* Checkpoint Markers Line */}
        <div className="absolute left-4 right-4 sm:left-10 sm:right-10 bottom-3 sm:bottom-4 flex justify-between items-center pointer-events-none z-0 min-w-[320px]">
          {totalStepsArray.map((step) => {
            const stepValue = step * stepSize;
            const isReached = currentStepIndex >= step;

            return (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-1 h-3 sm:h-5 rounded-full transition-colors ${
                    isReached ? 'bg-emerald-600' : 'bg-amber-400/80'
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-xs font-black mt-1 px-1 py-0.5 rounded transition-all ${
                    isReached
                      ? 'bg-emerald-500 text-white shadow-sm scale-105'
                      : 'bg-amber-100/90 text-amber-900/70'
                  }`}
                >
                  {stepValue}
                </span>
              </div>
            );
          })}
        </div>

        {/* Animated Tortoise (Positioned Directly Above the Numbers) */}
        <div
          className="absolute bottom-11 sm:bottom-14 transition-all duration-500 ease-out flex flex-col items-center z-10 pointer-events-auto"
          style={{ left: `calc(${progressPercent}% * 0.78 + 4px)` }}
        >
          <div className="text-4xl sm:text-6xl filter drop-shadow-md transition-transform hover:scale-110">
            🐢
          </div>
        </div>

      </div>
    </div>
  );
};