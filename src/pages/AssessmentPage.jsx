/**
 * AssessmentPage.jsx
 * Calls onComplete(metrics) passing live metrics up to App.
 * App is responsible for dispatching the payload — avoids unmount timing issues.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { difficultyMarks, evaluateAnswer, nextDifficulty, checkRemedial } from "../utils/adaptiveEngine";
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

  // const [difficulty, setDifficulty] = useState("easy");
  const usedIds = useRef(new Set());

  useEffect(() => {
    if (saved && saved.subtopicIndex === subtopicIndex) {
      usedIds.current = new Set(saved.usedIds);
    }
  }, []);
  const startTimeRef = useRef(Date.now());
  const pendingAction = useRef("same");

  const saved = JSON.parse(localStorage.getItem("its_resume"));
  // 🔥 LOAD DIFFICULTY
  const [difficulty, setDifficulty] = useState(() => {
    if (saved && saved.subtopicIndex === subtopicIndex) {
      return saved.difficulty;
    }
    return "easy";
  });

  const [current, setCurrent] = useState(() => {
    if (saved && saved.subtopicIndex === subtopicIndex) {
      return saved.currentQuestion;
    }

    const q = pickQuestion(pool.current, "easy", usedIds.current);
    if (q) usedIds.current.add(q.id);
    return q;
  });

  const [stats, setStats] = useState(INIT_STATS);
  const statsRef = useRef(INIT_STATS);
  useEffect(() => {
    if (saved && saved.subtopicIndex === subtopicIndex) {
      statsRef.current = saved.stats;
      setStats(saved.stats);
    }
  }, []);
  function updateStats(updater) {
    setStats(prev => { const next = updater(prev); statsRef.current = next; return next; });
  }

  const [attempt, setAttempt] = useState(1);
  const [hintUsed, setHintUsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [phase, setPhase] = useState("answering");

  const [mis, setMis] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
  const misRef = useRef({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
  function updateMis(key) {
    setMis(prev => { const next = { ...prev, [key]: prev[key] + 1 }; misRef.current = next; return next; });
  }

  const { metrics, metricsRef, recordCorrect, recordWrong, recordRetry, recordHintUsed } = useMetrics();
  useEffect(() => {
    if (saved && saved.subtopicIndex === subtopicIndex) {
      metricsRef.current = saved.metrics;
    }
  }, []);

  const [remedialKey, setRemedialKey] = useState(null);
  const [assessmentDone, setAssessmentDone] = useState(false);
  const [exitGuardActive, setExitGuardActive] = useState(true);

  // const loadNextQuestion = useCallback((diff) => {
  //   const q = pickQuestion(pool.current, diff, usedIds.current);
  //   if (!q) {
  //     const nextDiff = diff === "easy"
  //       ? "medium"
  //       : diff === "medium"
  //         ? "hard"
  //         : "end";

  //     if (nextDiff === "end") {
  //       finishAssessment();
  //     } else {
  //       loadNextQuestion(nextDiff);
  //     }
  //     return;
  //   }
  //   usedIds.current.add(q.id);
  //   setCurrent(q);
  //   setDifficulty(diff);
  //   startTimeRef.current = Date.now();
  //   setAttempt(1); setHintUsed(false); setSelectedKey(null);
  //   setFeedback(""); setShowSolution(false); setPhase("answering");
  // }, []); // eslint-disable-line
  const loadNextQuestion = useCallback((diff) => {
    const q = pickQuestion(pool.current, diff, usedIds.current);

    if (!q) {
      // try next difficulty ONCE
      if (diff === "easy") return loadNextQuestion("medium");
      if (diff === "medium") return loadNextQuestion("hard");

      // hard exhausted → END
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

  }, []);
  // ── Finish: disarm guard, pass metrics to App SYNCHRONOUSLY ──────────────
  // function finishAssessment() {
  //   setExitGuardActive(false);
  //   setAssessmentDone(true);
  //   // Pass the latest metrics snapshot directly — no async, no unmount race
  //   onComplete(metricsRef.current);
  // }

  function finishAssessment() {
    setExitGuardActive(false);
    setAssessmentDone(true);

    const studentId = sessionData.student_id;

    // 🧮 calculate score
    const score = statsRef.current.marks_total > 0
      ? (statsRef.current.marks_gained / statsRef.current.marks_total) * 100
      : 0;

    // 📊 load existing progress
    const progress = loadProgress(studentId);

    // 🔥 FULL METRICS OBJECT
    const fullMetrics = {
      correct_answers: metricsRef.current.correct_answers,
      wrong_answers: metricsRef.current.wrong_answers,
      questions_attempted: metricsRef.current.questions_attempted,
      retry_count: metricsRef.current.retry_count,
      hints_used: metricsRef.current.hints_used,
      marks_gained: statsRef.current.marks_gained,
      marks_total: statsRef.current.marks_total,
    };

    // ✅ update current subtopic with full data
    progress.subtopics[subtopicIndex] = {
      score,
      completed: true,
      metrics: fullMetrics, // 🔥 IMPORTANT ADDITION
    };

    // 📈 calculate overall score
    const scores = Object.values(progress.subtopics).map(s => s.score || 0);
    progress.overallScore = scores.reduce((a, b) => a + b, 0) / 5;

    // 💾 save progress
    saveProgress(studentId, progress);
    localStorage.removeItem("its_resume");
    // 🚀 send full data to App (for Result Page)
    onComplete({
      ...fullMetrics,
      score,
    });
  }

  function handleSelect(opt) {
    const isCorrect = opt.is_correct === true;
    setSelectedKey(opt.key);

    if (!isCorrect) updateMis(opt.misconception_mapped ?? 0);

    if (attempt === 1) {
      const responseTime = (Date.now() - startTimeRef.current) / 1000;

      if (isCorrect) {
        const { marks, action } = evaluateAnswer({
          isCorrect: true,
          responseTime,
          hintUsed,
          attempt: 1,
          difficulty,
        });

        pendingAction.current = action;

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
        // ❌ DO NOT REMOVE SELECTED KEY (fix UI bug)
        // setSelectedKey(null); ❌ remove this line

        setFeedback(opt.feedback);
        setAttempt(2);
        setPhase("retry");
        recordRetry();
      }

    } else {
      pendingAction.current = "same";

      if (isCorrect) {
        const { marks } = evaluateAnswer({
          isCorrect: true,
          responseTime: 0,
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

    // 🧠 🔥 SAVE RESUME STATE (VERY IMPORTANT)
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
    const nextDiff = nextDifficulty(difficulty, pendingAction.current, statsRef.current);
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

  // ── Done screen (brief — App navigates away after dispatch) ──────────────
  if (assessmentDone) {
    const score = stats.marks_total > 0
      ? ((stats.marks_gained / stats.marks_total) * 100).toFixed(1) : "0.0";
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

  return (
    <>
      <ExitGuard
        active={exitGuardActive}
        sessionData={sessionData}
        metricsRef={metricsRef}
        statsRef={statsRef}          // 🔥 add
        current={current}            // 🔥 add
        difficulty={difficulty}      // 🔥 add
        subtopicIndex={subtopicIndex}// 🔥 add
        usedIds={usedIds}            // 🔥 add
        onConfirmExit={onExit}
      />
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <div className="flex justify-between text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
          <span>Subtopic <strong>{subtopicIndex}</strong> — <span className="capitalize">{difficulty}</span></span>
          <span>Easy: {stats.num_easy_solved} | Med: {stats.num_med_solved} | Hard: {stats.num_hard_solved}</span>
          <span>Score: {stats.marks_total > 0 ? ((stats.marks_gained / stats.marks_total) * 100).toFixed(0) : 0}%</span>
        </div>

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
          <button onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4 hover:bg-blue-700 transition font-semibold">
            Next Question →
          </button>
        )}
      </div>
    </>
  );
}
