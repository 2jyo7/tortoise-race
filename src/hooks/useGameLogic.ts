'use client';

import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { validateAnswer, TOTAL_JUMPS } from '@/domain/gameLogic';

export function useGameLogic() {
  const [stepSize, setStepSize] = useState<number | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorAnimation, setErrorAnimation] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' | 'hint' } | null>(null);

  const startGame = useCallback((selectedStep: number) => {
    setStepSize(selectedStep);
    setCurrentStepIndex(0);
    setHistory([0]);
    setInputVal('');
    setIsCompleted(false);
    setFeedback({ text: `Great! Let's skip count by ${selectedStep}s!`, type: 'hint' });
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleJump = useCallback(() => {
    if (stepSize === null || isCompleted) return;

    const numericAnswer = parseInt(inputVal, 10);
    if (isNaN(numericAnswer)) {
      setFeedback({ text: 'Please enter a number!', type: 'error' });
      return;
    }

    const isCorrect = validateAnswer(stepSize, currentStepIndex, numericAnswer);

    if (isCorrect) {
      const nextIndex = currentStepIndex + 1;
      const nextVal = numericAnswer;

      setCurrentStepIndex(nextIndex);
      setHistory((prev) => [...prev, nextVal]);
      setInputVal('');

      if (nextIndex >= TOTAL_JUMPS) {
        setIsCompleted(true);
        setFeedback({ text: '🎉 You reached the finish line! Amazing job!', type: 'success' });
        triggerConfetti();
      } else {
        const compliments = ['Great job! 🐢', 'Awesome jump! 🚀', 'Spot on! ⭐', 'Keep going! 🌟'];
        const randomMsg = compliments[Math.floor(Math.random() * compliments.length)];
        setFeedback({ text: randomMsg, type: 'success' });
      }
    } else {
      setErrorAnimation(true);
      setTimeout(() => setErrorAnimation(false), 500);
      setFeedback({ text: 'Oops! Try again!', type: 'error' });
    }
  }, [stepSize, currentStepIndex, inputVal, isCompleted]);

  const showHint = useCallback(() => {
    if (stepSize === null) return;

    const previousValue = history[history.length - 1] ?? 0;

    if (currentStepIndex === 0) {
      setFeedback({
        text: `💡 Hint: What is 1 group of ${stepSize}?`,
        type: 'hint',
      });
    } else {
      setFeedback({
        text: `💡 Hint: What is ${previousValue} + ${stepSize}?`,
        type: 'hint',
      });
    }
  }, [stepSize, currentStepIndex, history]);

  const resetGame = useCallback(() => {
    setStepSize(null);
    setCurrentStepIndex(0);
    setHistory([]);
    setInputVal('');
    setIsCompleted(false);
    setFeedback(null);
  }, []);

  return {
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
  };
}