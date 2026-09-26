'use client';

import React from 'react';

interface Props {
  inputVal: string;
  errorAnimation: boolean;
  feedback: { text: string; type: 'success' | 'error' | 'hint' } | null;
  onInputChange: (val: string) => void;
  onJump: () => void;
  onHint: () => void;
}

export const TortoiseInputBubble: React.FC<Props> = ({
  inputVal,
  errorAnimation,
  feedback,
  onInputChange,
  onJump,
  onHint,
}) => {
  return (
    <div className={`flex flex-col items-center bg-white rounded-2xl p-3 shadow-md border-2 border-emerald-400 w-full max-w-sm sm:max-w-xs ${errorAnimation ? 'animate-shake' : ''}`}>
      {/* Speech Feedback Line */}
      {feedback && (
        <div className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-lg mb-2 text-center w-full ${
          feedback.type === 'error' ? 'bg-red-100 text-red-600' :
          feedback.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {feedback.text}
        </div>
      )}

      {/* Input Field + Controls */}
      <div className="flex items-center gap-2 w-full">
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputVal}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onJump()}
          placeholder="Next #"
          className="w-full text-center text-base sm:text-lg font-black text-gray-800 bg-gray-50 border-2 border-emerald-200 rounded-xl py-2 sm:py-1 focus:outline-none focus:border-emerald-500"
          autoFocus
        />
        {inputVal && (
          <button
            onClick={() => onInputChange('')}
            className="text-gray-400 hover:text-red-500 font-bold px-2 py-1 text-lg active:scale-90"
            title="Erase"
          >
            ✕
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full mt-2">
        <button
          onClick={onHint}
          className="flex-1 bg-amber-100 text-amber-800 text-xs sm:text-sm font-bold py-2 sm:py-1.5 rounded-xl hover:bg-amber-200 active:scale-95 transition-all"
        >
          💡 Hint
        </button>
        <button
          onClick={onJump}
          className="flex-1 bg-emerald-500 text-white text-xs sm:text-sm font-black py-2 sm:py-1.5 rounded-xl hover:bg-emerald-600 active:scale-95 transition-all shadow"
        >
          JUMP! 🦘
        </button>
      </div>
    </div>
  );
};