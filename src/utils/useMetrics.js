/**
 * useMetrics.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom React hook that tracks all assessment metrics in real-time.
 * Returns a metrics object + updater functions.
 * Uses a ref mirror so values are readable synchronously (same pattern as statsRef).
 *
 * Tracked:
 *   correct_answers, wrong_answers, questions_attempted,
 *   retry_count, hints_used
 *
 * NOT tracked here (computed at payload-build time):
 *   time_spent_seconds, topic_completion_ratio, total_questions, total_hints_embedded
 */

import { useState, useRef } from "react";

const INIT_METRICS = {
  correct_answers:     0,
  wrong_answers:       0,
  questions_attempted: 0,  // unique questions resolved (first or second attempt)
  retry_count:         0,  // number of second attempts made
  hints_used:          0,  // number of distinct questions where hint was used
};

export function useMetrics() {
  const [metrics, setMetrics] = useState(INIT_METRICS);
  const metricsRef = useRef(INIT_METRICS);

  function updateMetrics(updater) {
    setMetrics(prev => {
      const next = updater(prev);
      metricsRef.current = next;
      return next;
    });
  }

  // Call when a question is resolved correctly (attempt 1 or 2)
  function recordCorrect() {
    updateMetrics(prev => ({
      ...prev,
      correct_answers:     prev.correct_answers + 1,
      questions_attempted: prev.questions_attempted + 1,
    }));
  }

  // Call when a question is resolved incorrectly (both attempts wrong)
  function recordWrong() {
    updateMetrics(prev => ({
      ...prev,
      wrong_answers:       prev.wrong_answers + 1,
      questions_attempted: prev.questions_attempted + 1,
    }));
  }

  // Call when student chooses to retry (goes to attempt 2)
  function recordRetry() {
    updateMetrics(prev => ({
      ...prev,
      retry_count: prev.retry_count + 1,
    }));
  }

  // Call once per question when hint is first used (idempotent guard in AssessmentPage)
  function recordHintUsed() {
    updateMetrics(prev => ({
      ...prev,
      hints_used: prev.hints_used + 1,
    }));
  }

  return {
    metrics,          // for display
    metricsRef,       // for synchronous reads in callbacks
    recordCorrect,
    recordWrong,
    recordRetry,
    recordHintUsed,
    resetMetrics: () => {
      setMetrics(INIT_METRICS);
      metricsRef.current = INIT_METRICS;
    },
  };
}
