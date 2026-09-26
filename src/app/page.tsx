'use client';

import { useGameLogic } from '@/hooks/useGameLogic';
import { StepSelectionModal } from '@/components/StepSelectionModal';
import { RaceTrack } from '@/components/RaceTrack';
import { TortoiseInputBubble } from '@/components/TortoiseInputBubble';
import { VictoryModal } from '@/components/VictoryModal';

export default function Home() {
  const {
    stepSize,
    currentStepIndex,
    history,
    inputVal,
    isCompleted,
    errorAnimation,
    feedback,
    setInputVal,
    startGame,
    handleJump,
    showHint,
    resetGame,
  } = useGameLogic();

  return (
    <main className="min-h-screen bg-linear-to-b from-sky-300 via-emerald-100 to-emerald-200 flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden">
      {/* Playful Background Landscape Illustrations */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-emerald-300/40 rounded-t-[100%] pointer-events-none" />
      <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-emerald-400/30 rounded-full pointer-events-none blur-sm" />
      <div className="absolute -bottom-10 -right-20 w-96 h-96 bg-emerald-400/30 rounded-full pointer-events-none blur-sm" />

      {/* Step Size Selection Modal */}
      {stepSize === null && <StepSelectionModal onSelectStep={startGame} />}

      {/* Main Game Track */}
      {stepSize !== null && (
        <RaceTrack stepSize={stepSize} currentStepIndex={currentStepIndex}>
          {!isCompleted && (
            <TortoiseInputBubble
              inputVal={inputVal}
              errorAnimation={errorAnimation}
              feedback={feedback}
              onInputChange={setInputVal}
              onJump={handleJump}
              onHint={showHint}
            />
          )}
        </RaceTrack>
      )}

      {/* Victory Celebration Modal */}
      {isCompleted && stepSize !== null && (
        <VictoryModal
          stepSize={stepSize}
          history={history}
          onPlayAgain={resetGame}
        />
      )}
    </main>
  );
}