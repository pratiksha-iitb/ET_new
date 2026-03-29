export const T0 = 15; // seconds threshold for fast/slow

export const difficultyMarks = {
  easy: 2,
  medium: 3,
  hard: 5,
};

// Minimum questions correctly solved before difficulty can increase
// (and minimum required to allow assessment to end)
export const THRESHOLDS = {
  easy: 3,
  medium: 2,
  hard: 2,
};

/**
 * Evaluates an answer and returns marks earned and next-difficulty action.
 * attempt: 1 = first attempt, 2 = second attempt (after one incorrect)
 */
export function evaluateAnswer({ isCorrect, responseTime, hintUsed, attempt, difficulty }) {
  const fullMarks = difficultyMarks[difficulty];
  const isFast = responseTime <= T0;

  let marks = 0;
  let action = "same";

  if (attempt === 1) {
    if (isCorrect) {
      if (isFast && !hintUsed) {
        // Case 1: correct, fast, no hint -> full marks, increase difficulty
        marks = fullMarks;
        action = "increase";
      } else if (isFast && hintUsed) {
        // Case 2: correct, fast, with hint -> half marks, same difficulty
        marks = 0.5 * fullMarks;
        action = "same";
      } else {
        // Case 3: correct, slow -> full if no hint, half if hint
        marks = hintUsed ? 0.5 * fullMarks : fullMarks;
        action = "same";
      }
    }
    // incorrect attempt 1 -> marks = 0, will retry (no action yet)
  } else if (attempt === 2) {
    if (isCorrect) {
      // Case 3.1: correct on retry
      marks = hintUsed ? 0.3 * fullMarks : 0.5 * fullMarks;
    } else {
      // Case 3.2: incorrect on retry -> 0 marks
      marks = 0;
    }
    action = "same";
  }

  return { marks, action };
}

/**
 * Returns a misconception key (string) that has hit threshold (>=3),
 * ignoring key "0". Returns null if none triggered.
 */
export function checkRemedial(mis) {
  for (const k in mis) {
    if (k !== "0" && mis[k] >= 3) return k;
  }
  return null;
}

/**
 * Determines next difficulty level.
 *
 * - "increase" action: advance only if current threshold is met.
 *   If NOT met, stay on current difficulty.
 * - "same" action: stay on current difficulty.
 *
 * Returns: next difficulty string OR "end".
 */
export function nextDifficulty(current, action, stats) {
  const solved = {
    easy:   stats.num_easy_solved,
    medium: stats.num_med_solved,
    hard:   stats.num_hard_solved,
  };

  if (action === "increase") {
    if (solved[current] >= THRESHOLDS[current]) {
      if (current === "easy")   return "medium";
      if (current === "medium") return "hard";
      if (current === "hard")   return "end";
    }
    // Threshold NOT met — stay on current difficulty
    return current;
  }

  // action === "same"
  return current;
}

/**
 * Called when pickQuestion returns null (pool for current difficulty exhausted).
 *
 * Rules:
 *  - If threshold for current IS met  -> advance to next level (or "end" if hard).
 *  - If threshold NOT met             -> force-advance to next level anyway
 *    (prevents premature end due to insufficient question data).
 *    If already at hard               -> return "end" (nothing left to do).
 */
export function handlePoolExhausted(current, stats) {
  if (current === "easy")   return "medium";
  if (current === "medium") return "hard";
  // hard pool exhausted
  return "end";
}
