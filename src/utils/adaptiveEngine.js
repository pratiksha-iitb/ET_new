// Per-difficulty average response time thresholds (seconds).
// Promotion to the next level only happens if avg response time <= threshold.
export const TIME_THRESHOLDS = {
  easy:   20,
  medium: 30,
  hard:   45,
};

export const difficultyMarks = {
  easy: 2,
  medium: 3,
  hard: 5,
};

// Minimum correct answers at a difficulty before speed is evaluated
// and before difficulty can increase.
export const THRESHOLDS = {
  easy: 3,
  medium: 2,
  hard: 2,
};

/**
 * Evaluates an answer and returns marks earned and a pending action hint.
 *
 * Returns action = "candidate" when correct on attempt 1 with no hint —
 * caller must call shouldIncreaseDifficulty() to resolve to "increase" or "same".
 */
export function evaluateAnswer({ isCorrect, hintUsed, attempt, difficulty }) {
  const fullMarks = difficultyMarks[difficulty];

  let marks = 0;
  let action = "same";

  if (attempt === 1) {
    if (isCorrect) {
      if (!hintUsed) {
        // Correct, no hint → candidate for promotion; speed check done in caller
        marks = fullMarks;
        action = "candidate";
      } else {
        // Correct but used hint → half marks, never promote
        marks = 0.5 * fullMarks;
        action = "same";
      }
    }
    // incorrect attempt 1 → marks = 0, will retry
  } else if (attempt === 2) {
    if (isCorrect) {
      marks = hintUsed ? 0.3 * fullMarks : 0.5 * fullMarks;
    } else {
      marks = 0;
    }
    action = "same";
  }

  return { marks, action };
}

/**
 * Decides whether to promote after a "candidate" answer.
 *
 * Rules:
 *  1. Threshold must be met (solved count >= THRESHOLDS[difficulty]) — evaluated
 *     AFTER incrementing num_*_solved for the current question.
 *  2. Only then: compute average response time across all correct-attempt-1
 *     answers at this difficulty (responseTimes includes the current one).
 *     avg <= TIME_THRESHOLDS[difficulty]  → "increase"
 *     avg >  TIME_THRESHOLDS[difficulty]  → "same"
 *  3. Before threshold: always "same" — not enough data to judge speed yet.
 */
export function shouldIncreaseDifficulty(difficulty, stats, responseTimes) {
  const solved = {
    easy:   stats.num_easy_solved,
    medium: stats.num_med_solved,
    hard:   stats.num_hard_solved,
  };

  if (solved[difficulty] < THRESHOLDS[difficulty]) return "same";

  if (responseTimes.length === 0) return "same";
  const avg = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

  return avg <= TIME_THRESHOLDS[difficulty] ? "increase" : "same";
}

/**
 * Returns a misconception key that has hit threshold (>=3), ignoring key "0".
 * Returns null if none triggered.
 */
export function checkRemedial(mis) {
  for (const k in mis) {
    if (k !== "0" && mis[k] >= 3) return k;
  }
  return null;
}

/**
 * Determines next difficulty level given a resolved action.
 * "increase" → advance | "same" → stay
 * Returns next difficulty string OR "end".
 */
export function nextDifficulty(current, action) {
  if (action === "increase") {
    if (current === "easy")   return "medium";
    if (current === "medium") return "hard";
    if (current === "hard")   return "end";
  }
  return current;
}

/**
 * Force-advance when question pool is exhausted.
 */
export function handlePoolExhausted(current) {
  if (current === "easy")   return "medium";
  if (current === "medium") return "hard";
  return "end";
}