'use client';

import React from 'react';

interface Props {
  stepSize: number;
  history: number[];
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<Props> = ({ stepSize, history, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border-4 border-yellow-400">
        <div className="text-6xl mb-2">🏆</div>
        <h2 className="text-3xl font-black text-amber-500 mb-1">VICTORY!</h2>
        <p className="text-gray-600 font-medium mb-4">
          You completed the +{stepSize} skip counting race!
        </p>

        {/* Skip Sequence Summary */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-6">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-2">
            Your Skip Sequence:
          </span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {history.map((val, idx) => (
              <span key={idx} className="bg-amber-200 text-amber-900 font-bold text-sm px-2 py-1 rounded-lg">
                {val}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg py-3 rounded-2xl transition-all shadow-lg active:scale-95"
        >
          Play Again! 🔄
        </button>
      </div>
    </div>
  );
};