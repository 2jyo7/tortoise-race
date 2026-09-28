export interface GameState {
  stepSize: number;
  currentStepIndex: number; // 0 (start line) to 10 (finish line)
  history: number[];
  isCompleted: boolean;
  totalSteps: number;
}

export const TOTAL_JUMPS = 10;

/**
 * Calculates the expected number for a given step index.
 * Index 1 -> stepSize * 1
 * Index 2 -> stepSize * 2
 */
export function getExpectedValue(stepSize: number, stepIndex: number): number {
  return stepSize * stepIndex;
}

/**
 * Validates whether the user's input matches the expected multiple.
 */
export function validateAnswer(stepSize: number, currentStepIndex: number, answer: number): boolean {
  const expected = getExpectedValue(stepSize, currentStepIndex + 1);
  return answer === expected;
}

/**
 * Calculates percentage along the track:
 * Index 0 -> 0% (At the start line)
 * Index 10 -> 100% (At the finish line)
 */
export function getProgressPercentage(stepIndex: number, total: number = TOTAL_JUMPS): number {
  return Math.min(100, Math.max(0, (stepIndex / total) * 100));
}