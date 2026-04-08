
import { useState, useRef, useCallback, useEffect } from "react";
import {
  difficultyMarks,
  evaluateAnswer,
  nextDifficulty,
  checkRemedial,
  shouldIncreaseDifficulty,
  TIME_THRESHOLDS,
  THRESHOLDS,
} from "../utils/adaptiveEngine";
import { misconceptionsContent } from "../data/misconceptions";
import { useMetrics } from "../utils/useMetrics";
import { loadProgress, saveProgress } from "../utils/progressManager";

import QuestionCard from "../components/QuestionCard";
import HintBox from "../components/HintBox";
import FeedbackBox from "../components/FeedbackBox";
import RemedialContent from "../components/RemedialContent";
import ExitGuard from "../components/ExitGuard";

import q1 from "../data/questions1.json";
import q2 from "../data/questions2.json";
import q3 from "../data/questions3.json";
import q4 from "../data/questions4.json";
import q5 from "../data/questions5.json";

// ── Live Question Timer Hook ──────────────────────────────────────────────────
function useQuestionTimer(active) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  function reset() {
    setElapsed(0);
  }

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const secs = String(elapsed % 60).padStart(2, "0");
  return { elapsed, display: `${mins}:${secs}`, reset };
}

/**
 * Timer bar colour based on elapsed vs the per-difficulty TIME_THRESHOLD.
 *   < 50 % of threshold → green
 *   50–100 %            → yellow
 *   > threshold         → red + pulse
 * Paused (answered)     → gray
 */
function timerColorClasses(elapsed, difficulty, active) {
  if (!active) return "bg-gray-50 border-gray-200 text-gray-400";
  const threshold = TIME_THRESHOLDS[difficulty];
  if (elapsed < threshold * 0.5) return "bg-green-50 border-green-300 text-green-700";
  if (elapsed < threshold) return "bg-yellow-50 border-yellow-300 text-yellow-700";
  return "bg-red-50 border-red-300 text-red-600 animate-pulse";
}

// ─────────────────────────────────────────────────────────────────────────────

const ALL_QUESTIONS = { 1: q1, 2: q2, 3: q3, 4: q4, 5: q5 };

function buildPool(idx) {
  const qs = ALL_QUESTIONS[idx] || [];
  return {
    easy: qs.filter(q => q.difficulty === "easy"),
    medium: qs.filter(q => q.difficulty === "medium"),
    hard: qs.filter(q => q.difficulty === "hard"),
  };
}

function pickQuestion(pool, difficulty, usedIds) {
  const remaining = pool[difficulty].filter(q => !usedIds.has(q.id));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(Math.random() * remaining.length)];
}

const INIT_STATS = {
  num_easy_solved: 0, num_med_solved: 0, num_hard_solved: 0,
  marks_gained: 0, marks_total: 0, attempted: 0,
};

export default function AssessmentPage({ subtopicIndex, sessionData, onComplete, onExit }) {
  const pool = useRef(buildPool(subtopicIndex));
  const usedIds = useRef(new Set());

  const saved = JSON.parse(localStorage.getItem("its_resume"));
  const progress = loadProgress(sessionData.student_id);

  const shouldResume =
    saved &&
    saved.subtopicIndex === subtopicIndex &&
    !progress.subtopics[subtopicIndex]?.completed;

  useEffect(() => {
    if (shouldResume) {
      usedIds.current = new Set(saved.usedIds);
    }
  }, []); // eslint-disable-line

  const startTimeRef = useRef(Date.now());
  const pendingAction = useRef("same");

  // ── Per-difficulty response-time accumulator ──────────────────────────────
  // Only correct, attempt-1, no-hint answers are recorded here.
  // shouldIncreaseDifficulty() averages these and compares vs TIME_THRESHOLDS.
  const responseTimesRef = useRef({ easy: [], medium: [], hard: [] });

  // 🔥 LOAD DIFFICULTY
  const [difficulty, setDifficulty] = useState(() => {
    if (shouldResume) return saved.difficulty;
    return "easy";
  });

  const [current, setCurrent] = useState(() => {
    if (shouldResume) return saved.currentQuestion;
    const q = pickQuestion(pool.current, "easy", usedIds.current);
    if (q) usedIds.current.add(q.id);
    return q;
  });

  const [stats, setStats] = useState(INIT_STATS);
  const statsRef = useRef(INIT_STATS);
  useEffect(() => {
    if (shouldResume) {
      statsRef.current = saved.stats;
      setStats(saved.stats);
    }
  }, []); // eslint-disable-line

  function updateStats(updater) {
    setStats(prev => {
      const next = updater(prev);
      statsRef.current = next;
      return next;
    });
  }

  const [attempt, setAttempt] = useState(1);
  const [hintUsed, setHintUsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [phase, setPhase] = useState("answering");

  // ── Timer state ───────────────────────────────────────────────────────────
  const [timerActive, setTimerActive] = useState(true);
  const totalTimeRef = useRef(0); // cumulative seconds across all questions
  const { elapsed, display: timerDisplay, reset: resetTimer } = useQuestionTimer(timerActive);

  const [mis, setMis] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
  const misRef = useRef({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
  function updateMis(key) {
    setMis(prev => {
      const next = { ...prev, [key]: prev[key] + 1 };
      misRef.current = next;
      return next;
    });
  }

  const { metrics, metricsRef, recordCorrect, recordWrong, recordRetry, recordHintUsed } = useMetrics();
  useEffect(() => {
    if (shouldResume) {
      metricsRef.current = saved.metrics;
    }
  }, []); // eslint-disable-line

  const [remedialKey, setRemedialKey] = useState(null);
  const [assessmentDone, setAssessmentDone] = useState(false);
  const [exitGuardActive, setExitGuardActive] = useState(true);

  // ── Load next question ────────────────────────────────────────────────────
  const loadNextQuestion = useCallback((diff) => {
    const q = pickQuestion(pool.current, diff, usedIds.current);

    if (!q) {
      if (diff === "easy") return loadNextQuestion("medium");
      if (diff === "medium") return loadNextQuestion("hard");
      finishAssessment();
      return;
    }

    usedIds.current.add(q.id);
    setCurrent(q);
    setDifficulty(diff);
    startTimeRef.current = Date.now();

    setAttempt(1);
    setHintUsed(false);
    setSelectedKey(null);
    setFeedback("");
    setShowSolution(false);
    setPhase("answering");

    // Reset and restart question timer
    setTimerActive(true);
    resetTimer();
  }, []); // eslint-disable-line

  // ── Finish assessment ─────────────────────────────────────────────────────
  function finishAssessment() {
    // 🔥 ADD THIS FIRST
    if (timerActive) {
      totalTimeRef.current += elapsed;
      setTimerActive(false);
    }
    setExitGuardActive(false);
    setAssessmentDone(true);

    const studentId = sessionData.student_id;

    const score = statsRef.current.marks_total > 0
      ? (statsRef.current.marks_gained / statsRef.current.marks_total) * 100
      : 0;

    const passed = score >= 35;

    const progress = loadProgress(studentId);

    const fullMetrics = {
      correct_answers: metricsRef.current.correct_answers,
      wrong_answers: metricsRef.current.wrong_answers,

      // 🔥 FORCE CONSISTENCY
      questions_attempted:
        metricsRef.current.correct_answers +
        metricsRef.current.wrong_answers,

      retry_count: metricsRef.current.retry_count,
      hints_used: metricsRef.current.hints_used,

      marks_gained: statsRef.current.marks_gained,
      marks_total: statsRef.current.marks_total,

      time_spent_seconds: totalTimeRef.current,

      // 🔥 VERY IMPORTANT FOR MERGE
      total_questions:
        metricsRef.current.correct_answers +
        metricsRef.current.wrong_answers,
    };
    // 🔥 FIND MOST TRIGGERED MISCONCEPTION
    const weakConceptEntry = Object.entries(misRef.current)
      .filter(([k]) => k !== "0") // ignore default
      .sort((a, b) => b[1] - a[1])[0];

    const weakConceptKey = weakConceptEntry ? weakConceptEntry[0] : null;
    progress.subtopics[subtopicIndex] = {
      score,
      completed: passed,
      attempted: true,
      metrics: fullMetrics,

      // 🔥 ADD THIS
      weak_concept: weakConceptKey
        ? misconceptionsContent[weakConceptKey]
        : null,
    };

    const scores = Object.values(progress.subtopics).map(s => s.score || 0);
    progress.overallScore = scores.reduce((a, b) => a + b, 0) / 5;

    saveProgress(studentId, progress);
    localStorage.removeItem("its_resume");
    localStorage.removeItem(`session_${studentId}_${subtopicIndex}`);

    onComplete({ ...fullMetrics, score, passed });
  }

  // ── Handle answer selection ───────────────────────────────────────────────
  function handleSelect(opt) {
    const isCorrect = opt.is_correct === true;
    setSelectedKey(opt.key);

    // Pause timer and accumulate elapsed time for this question
    setTimerActive(false);
    totalTimeRef.current += elapsed;

    if (!isCorrect) updateMis(opt.misconception_mapped ?? 0);

    if (attempt === 1) {
      const responseTime = (Date.now() - startTimeRef.current) / 1000;

      if (isCorrect) {
        const { marks, action } = evaluateAnswer({
          isCorrect: true,
          hintUsed,
          attempt: 1,
          difficulty,
        });

        // ── Resolve "candidate" → "increase" or "same" ───────────────────
        // action === "candidate": correct, attempt 1, no hint used.
        //
        // Step 1 — record this response time for the difficulty.
        // Step 2 — call shouldIncreaseDifficulty() which checks:
        //   (a) solved count (post-increment) >= THRESHOLDS[difficulty]
        //       → if NOT met, returns "same" immediately (not enough data yet)
        //   (b) only once threshold IS met: avg response time vs TIME_THRESHOLDS
        //       easy ≤ 20 s | medium ≤ 30 s | hard ≤ 45 s
        //       fast (avg ≤ threshold) → "increase"
        //       slow (avg >  threshold) → "same" (stay at current level)
        let resolvedAction = action;
        if (action === "candidate") {
          // Append current response time to the per-difficulty list
          responseTimesRef.current[difficulty] = [
            ...responseTimesRef.current[difficulty],
            responseTime,
          ];

          // Build post-increment solved counts (state hasn't updated yet)
          const statsForCheck = {
            num_easy_solved: statsRef.current.num_easy_solved + (difficulty === "easy" ? 1 : 0),
            num_med_solved: statsRef.current.num_med_solved + (difficulty === "medium" ? 1 : 0),
            num_hard_solved: statsRef.current.num_hard_solved + (difficulty === "hard" ? 1 : 0),
          };

          resolvedAction = shouldIncreaseDifficulty(
            difficulty,
            statsForCheck,
            responseTimesRef.current[difficulty],
          );
        }

        pendingAction.current = resolvedAction;

        updateStats(prev => {
          const u = { ...prev };
          u.marks_gained += marks;
          u.marks_total += difficultyMarks[difficulty];
          u.attempted += 1;
          if (difficulty === "easy") u.num_easy_solved += 1;
          if (difficulty === "medium") u.num_med_solved += 1;
          if (difficulty === "hard") u.num_hard_solved += 1;
          return u;
        });

        recordCorrect();
        setFeedback(opt.feedback);
        setPhase("next");

      } else {
        // Wrong on attempt 1 — give a retry; speed is not tracked for wrong answers
        setFeedback(opt.feedback);
        setAttempt(2);
        setPhase("retry");
        recordRetry();
      }

    } else {
      // attempt === 2 — speed is irrelevant, always "same"
      pendingAction.current = "same";

      if (isCorrect) {
        const { marks } = evaluateAnswer({
          isCorrect: true,
          hintUsed,
          attempt: 2,
          difficulty,
        });

        updateStats(prev => {
          const u = { ...prev };
          u.marks_gained += marks;
          u.marks_total += difficultyMarks[difficulty];
          u.attempted += 1;
          if (difficulty === "easy") u.num_easy_solved += 1;
          if (difficulty === "medium") u.num_med_solved += 1;
          if (difficulty === "hard") u.num_hard_solved += 1;
          return u;
        });

        recordCorrect();
        setFeedback(opt.feedback);
        setPhase("next");

      } else {
        updateStats(prev => ({
          ...prev,
          marks_total: prev.marks_total + difficultyMarks[difficulty],
          attempted: prev.attempted + 1,
        }));

        recordWrong();
        setFeedback(opt.feedback);
        setShowSolution(true);
        setPhase("solution");
      }
    }

    // 🧠 Save resume state
    localStorage.setItem(
      "its_resume",
      JSON.stringify({
        subtopicIndex,
        currentQuestion: current,
        difficulty,
        stats: statsRef.current,
        metrics: metricsRef.current,
        usedIds: Array.from(usedIds.current),
      })
    );
  }

  function handleHintUse() {
    if (!hintUsed) { setHintUsed(true); recordHintUsed(); }
  }

  function proceedToNext() {
    const remKey = checkRemedial(misRef.current);
    if (remKey) {
      setMis(prev => { const n = { ...prev, [remKey]: 0 }; misRef.current = n; return n; });
      setRemedialKey(remKey);
      return;
    }
    const nextDiff = nextDifficulty(difficulty, pendingAction.current);
    if (nextDiff === "end") { finishAssessment(); return; }
    loadNextQuestion(nextDiff);
    localStorage.setItem(
      "its_resume",
      JSON.stringify({
        subtopicIndex,
        currentQuestion: current,
        difficulty,
        stats: statsRef.current,
        metrics: metricsRef.current,
        usedIds: Array.from(usedIds.current),
      })
    );
  }

  function handleNext() { proceedToNext(); }
  function handleRemedialContinue() { setRemedialKey(null); proceedToNext(); }

  // ── Done screen ───────────────────────────────────────────────────────────
  if (assessmentDone) {
    const score = stats.marks_total > 0
      ? ((stats.marks_gained / stats.marks_total) * 100).toFixed(1)
      : "0.0";
    return (
      <div className="p-6 max-w-2xl mx-auto text-center mt-10 space-y-4">
        <h1 className="text-3xl font-bold text-green-700">Subtopic {subtopicIndex} Complete! 🎉</h1>
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
          <p className="text-lg">Questions Attempted: <strong>{stats.attempted}</strong></p>
          <p className="text-lg">Marks Gained: <strong>{stats.marks_gained.toFixed(1)}</strong></p>
          <p className="text-lg">Total Marks: <strong>{stats.marks_total}</strong></p>
          <p className="text-2xl font-bold text-blue-600">Score: {score}%</p>
          <p className="text-sm text-gray-500">
            Correct: {metrics.correct_answers} | Wrong: {metrics.wrong_answers} |
            Retries: {metrics.retry_count} | Hints: {metrics.hints_used}
          </p>
          <p className="text-xs text-gray-400 animate-pulse">Saving your session...</p>
        </div>
      </div>
    );
  }

  // ── Remedial screen ───────────────────────────────────────────────────────
  if (remedialKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-10">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-orange-200 text-center">
            <h1 className="text-3xl font-extrabold text-orange-700">⚠️ Let's Fix This Concept</h1>
            <p className="text-gray-600 mt-2">Looks like there's a small misconception — no worries, let's clear it up!</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-blue-100">
            <RemedialContent content={misconceptionsContent[remedialKey]} onContinue={handleRemedialContinue} />
          </div>
          <div className="bg-green-50 border border-green-300 p-4 rounded-2xl text-center">
            <p className="text-green-800 font-medium">💡 You're improving! Understanding mistakes is the fastest way to learn.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  const isAnswered = phase === "next" || phase === "solution";
  const threshold = TIME_THRESHOLDS[difficulty]; // easy:20  medium:30  hard:45

  return (
    <>
      <ExitGuard
        active={exitGuardActive}
        sessionData={sessionData}
        metricsRef={metricsRef}
        statsRef={statsRef}
        current={current}
        difficulty={difficulty}
        subtopicIndex={subtopicIndex}
        usedIds={usedIds}
        onConfirmExit={onExit}
      />
      <div className="p-6 max-w-2xl mx-auto space-y-4">

        {/* Status bar */}
        <div className="flex justify-between text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
          <span>Subtopic <strong>{subtopicIndex}</strong> — <span className="capitalize">{difficulty}</span></span>
          <span>Easy: {stats.num_easy_solved} | Med: {stats.num_med_solved} | Hard: {stats.num_hard_solved}</span>
          <span>Score: {stats.marks_total > 0 ? ((stats.marks_gained / stats.marks_total) * 100).toFixed(0) : 0}%</span>
        </div>

        {/* ── Question Timer ──────────────────────────────────────────────── */}
        <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold border-2 transition-colors ${timerColorClasses(elapsed, difficulty, timerActive)}`}>
          <span>{timerActive ? "⏱" : "⏸"}</span>
          <span>{timerDisplay}</span>
          {timerActive && elapsed >= threshold && (
            <span className="text-xs font-normal ml-1">Take your time!</span>
          )}
        </div>

        {/* Metrics row */}
        <div className="flex gap-4 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-4 py-2">
          <span>✅ {metrics.correct_answers}</span>
          <span>❌ {metrics.wrong_answers}</span>
          <span>🔁 Retries: {metrics.retry_count}</span>
          <span>💡 Hints: {metrics.hints_used}</span>
        </div>

        <QuestionCard question={current} onSelect={handleSelect} disabled={isAnswered} selectedKey={selectedKey} />

        {(phase === "answering" || phase === "retry") && (
          <HintBox hint={current.hint} used={hintUsed} onUse={handleHintUse} />
        )}

        {feedback && (
          <FeedbackBox
            feedback={feedback}
            isCorrect={current.options.find(o => o.key === selectedKey)?.is_correct}
          />
        )}

        {phase === "retry" && (
          <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-xl text-sm text-yellow-800">
            ⚠️ That's not quite right. You have one more attempt — choose carefully!
          </div>
        )}

        {showSolution && current.full_solution && (
          <div className="bg-blue-50 border border-blue-300 p-4 rounded-xl">
            <p className="font-semibold text-blue-800 mb-1">Full Solution:</p>
            <p className="text-blue-700 text-sm">{current.full_solution}</p>
          </div>
        )}

        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4 hover:bg-blue-700 transition font-semibold"
          >
            Next Question →
          </button>
        )}
      </div>
    </>
  );
}
