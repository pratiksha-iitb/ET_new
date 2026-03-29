/**
 * sessionManager.js
 */

export const CHAPTER_METADATA = {
  grade: 8,
  chapter_name: "Exponents and Powers",
  chapter_id: "grade8_exponents_and_powers",
  chapter_url: "/assessment",
  chapter_difficulty: 0.5,
  expected_completion_time_seconds: 600,
  subtopics: [
    { subtopic_id: "grade8_exp_subtopic1", name: "Powers with Negative Exponents",             difficulty: 0.4  },
    { subtopic_id: "grade8_exp_subtopic2", name: "Expanded Form using Exponents",               difficulty: 0.45 },
    { subtopic_id: "grade8_exp_subtopic3", name: "Laws of Exponents",                           difficulty: 0.5  },
    { subtopic_id: "grade8_exp_subtopic4", name: "Expressing Numbers in Standard Form",         difficulty: 0.55 },
    { subtopic_id: "grade8_exp_subtopic5", name: "Comparing Very Large and Very Small Numbers", difficulty: 0.6  },
  ],
  prerequisites: [],
};

export const TOTAL_HINTS_EMBEDDED = 12;
export const TOTAL_QUESTIONS      = 12;

const PENDING_KEY = "its_pendingPayload";
const LAST_KEY    = "its_lastPayload";

export function generateSessionId(studentId) {
  return `s_${studentId}_${Date.now()}`;
}

export function createSessionData({ studentId, sessionId, subtopicIndex }) {
  return {
    student_id:  studentId,
    session_id:  sessionId,
    chapter_id:  CHAPTER_METADATA.chapter_id,
    subtopic_id: CHAPTER_METADATA.subtopics[subtopicIndex - 1]?.subtopic_id ?? "",
    start_time:  new Date().toISOString(),
    status:      "in_progress",
  };
}

export function buildPayload(sessionData, metrics, status) {
  const endTime   = new Date().toISOString();
  const startMs   = new Date(sessionData.start_time).getTime();
  const timeSpent = Math.round((Date.now() - startMs) / 1000);
  const ratio     = parseFloat((metrics.questions_attempted / TOTAL_QUESTIONS).toFixed(4));

  return {
    student_id:             sessionData.student_id,
    session_id:             sessionData.session_id,
    chapter_id:             sessionData.chapter_id,
    subtopic_id:            sessionData.subtopic_id,
    timestamp:              endTime,
    session_status:         status,
    correct_answers:        metrics.correct_answers,
    wrong_answers:          metrics.wrong_answers,
    questions_attempted:    metrics.questions_attempted,
    total_questions:        TOTAL_QUESTIONS,
    retry_count:            metrics.retry_count,
    hints_used:             metrics.hints_used,
    total_hints_embedded:   TOTAL_HINTS_EMBEDDED,
    time_spent_seconds:     timeSpent,
    topic_completion_ratio: ratio,
  };
}

export function validatePayload(payload) {
  const errors = [];
  const { correct_answers: c, wrong_answers: w, questions_attempted: a,
          total_questions: t, hints_used: h, total_hints_embedded: he,
          topic_completion_ratio: r } = payload;

  if (c + w > a)  errors.push(`correct(${c}) + wrong(${w}) > attempted(${a})`);
  if (a > t)      errors.push(`attempted(${a}) > total(${t})`);
  if (h > he)     errors.push(`hints_used(${h}) > embedded(${he})`);
  if (r < 0 || r > 1) errors.push(`ratio(${r}) out of [0,1]`);
  if (!payload.student_id || !payload.session_id) errors.push("Missing student_id or session_id");

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

// ── Write payload to localStorage directly — no fetch involved ────────────────
// This is the guaranteed storage step. Called before anything async.
function writeToStorage(payload) {
  const str = JSON.stringify(payload, null, 2);
  try {
    localStorage.setItem(LAST_KEY,    str);
    localStorage.setItem(PENDING_KEY, str);
    console.log("%c[ITS] ✅ Payload written to localStorage", "color: green; font-weight: bold");
    console.log(payload);
  } catch (e) {
    console.error("[ITS] localStorage write failed:", e);
  }
}

const MERGE_API_ENDPOINT = import.meta.env.VITE_MERGE_API_ENDPOINT || "https://your_merge_api_endpoint/sessions";
const MERGE_API_TOKEN    = import.meta.env.VITE_MERGE_API_TOKEN    || "your_bearer_token";

export async function sendPayload(payload) {
  const isPlaceholder = MERGE_API_ENDPOINT.includes("your_merge_api") ||
                        MERGE_API_ENDPOINT.includes("YOUR_MERGE");
  if (isPlaceholder) {
    console.log("%c[ITS] Merge endpoint not configured — payload stored locally only", "color: orange");
    return { success: false, reason: "placeholder_endpoint" };
  }

  try {
    const res = await fetch(MERGE_API_ENDPOINT, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${MERGE_API_TOKEN}` },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    localStorage.removeItem(PENDING_KEY);
    console.log("%c[ITS] ✅ Sent to Merge API", "color: green; font-weight: bold");
    return { success: true };
  } catch (err) {
    console.warn("[ITS] Send failed, payload already in localStorage for retry:", err.message);
    return { success: false, error: err.message };
  }
}

export async function retryPendingPayload() {
  const isPlaceholder = MERGE_API_ENDPOINT.includes("your_merge_api") ||
                        MERGE_API_ENDPOINT.includes("YOUR_MERGE");
  if (isPlaceholder) return; // silently skip — no point retrying placeholder

  const stored = localStorage.getItem(PENDING_KEY);
  if (!stored || stored === "null") return;

  let payload;
  try { payload = JSON.parse(stored); } catch { localStorage.removeItem(PENDING_KEY); return; }

  console.log("[ITS] Retrying pending payload:", payload.session_id);
  await sendPayload(payload);
}

// ── MASTER DISPATCH ───────────────────────────────────────────────────────────
// Step 1: build + validate + write to localStorage  (synchronous, guaranteed)
// Step 2: attempt API send                          (async, best-effort)
export async function dispatchPayload(sessionData, metrics, status) {
  console.log("[ITS] dispatchPayload called — sessionData:", sessionData, "metrics:", metrics);

  if (!sessionData || !sessionData.student_id) {
    console.error("[ITS] dispatchPayload: sessionData is missing or invalid", sessionData);
    return { dispatched: false, error: "invalid sessionData" };
  }

  if (!metrics) {
    console.error("[ITS] dispatchPayload: metrics is missing", metrics);
    return { dispatched: false, error: "invalid metrics" };
  }

  const payload = buildPayload(sessionData, metrics, status);
  const { valid, errors } = validatePayload(payload);

  if (!valid) {
    console.error("[ITS] ❌ Validation failed:", errors);
    // Still write to localStorage so you can inspect what went wrong
    writeToStorage(payload);
    return { dispatched: false, validationErrors: errors };
  }

  // ✅ Write to localStorage FIRST — before any async call
  writeToStorage(payload);

  // Then attempt API send (non-blocking on failure)
  await sendPayload(payload);

  return { dispatched: true, payload };
}
