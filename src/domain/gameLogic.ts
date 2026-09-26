export interface GameState {
  stepSize: number;
  currentStepIndex: number; // 0 to 10
  history: number[];
  isCompleted: boolean;
  totalSteps: number;
}

export const TOTAL_JUMPS = 10;

/**
 * Calculates the expected number for a given step index.
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
 * Calculates the visual percentage along the track for the tortoise.
 */
export function getProgressPercentage(stepIndex: number, total: number = TOTAL_JUMPS): number {
  return Math.min(100, Math.max(0, (stepIndex / total) * 100));
}