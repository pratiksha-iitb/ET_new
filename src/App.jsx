
// import { useState, useEffect } from "react";
// import axios from "axios";

// import AuthPage from "./pages/AuthPage";
// import SubtopicDashboard from "./pages/SubtopicDashboard";
// import AssessmentPage from "./pages/AssessmentPage";
// import ProfilePage from "./pages/ProfilePage";
// import ResultPage from "./pages/ResultPage";

// import ReadingPage1 from "./pages/ReadingPage1";
// import ReadingPage2 from "./pages/ReadingPage2";
// import ReadingPage3 from "./pages/ReadingPage3";
// import ReadingPage4 from "./pages/ReadingPage4";
// import ReadingPage5 from "./pages/ReadingPage5";

// import {
//   generateSessionId,
//   createSessionData,
//   dispatchPayload,
//   retryPendingPayload,
//   CHAPTER_METADATA,
// } from "./utils/sessionManager";

// const READING_PAGES = {
//   1: ReadingPage1,
//   2: ReadingPage2,
//   3: ReadingPage3,
//   4: ReadingPage4,
//   5: ReadingPage5,
// };

// const SCREENS = {
//   AUTH: "auth",
//   DASHBOARD: "dashboard",
//   READING: "reading",
//   ASSESSMENT: "assessment",
//   PROFILE: "profile",
//   RESULT: "result",
// };

// export default function App() {
//   // const [student, setStudent] = useState(() => {
//   //   const id = sessionStorage.getItem("its_student_id");
//   //   const name = sessionStorage.getItem("its_student_name");
//   //   return id ? { studentId: id, studentName: name } : null;
//   // });
//   const [student, setStudent] = useState(null);

//   const [screen, setScreen] = useState(
//     student ? SCREENS.DASHBOARD : SCREENS.AUTH
//   );
//   const [activeSubtopic, setActiveSubtopic] = useState(null);
//   const [completed, setCompleted] = useState(new Set());
//   const [sessionData, setSessionData] = useState(null);
//   const [resultData, setResultData] = useState(null);
//   const [recommendation, setRecommendation] = useState(null);

//   // 🔥 NEW: Chapter metrics
//   const [chapterMetrics, setChapterMetrics] = useState({
//     correct_answers: 0,
//     wrong_answers: 0,
//     questions_attempted: 0,
//     retry_count: 0,
//     hints_used: 0,
//     time_spent_seconds: 0,
//   });

//   // 🔥 URL PARAM EXTRACTION (MERGE)
//   // useEffect(() => {
//   //   retryPendingPayload();

//   //   const params = new URLSearchParams(window.location.search);

//   //   const token = params.get("token");
//   //   const student_id = params.get("student_id");
//   //   const session_id = params.get("session_id");

//   //   if (token && student_id && session_id) {
//   //     sessionStorage.setItem("token", token);
//   //     sessionStorage.setItem("student_id", student_id);
//   //     sessionStorage.setItem("session_id", session_id);
//   //   }
//   // }, []);
//   useEffect(() => {
//     retryPendingPayload();

//     const params = new URLSearchParams(window.location.search);

//     const token = params.get("token");
//     const student_id = params.get("student_id");
//     const session_id = params.get("session_id");

//     if (token && student_id && session_id) {
//       console.log("🔥 Merge login detected");

//       const currentStudent = sessionStorage.getItem("student_id");

//       // 🚨 IF NEW STUDENT → RESET EVERYTHING
//       if (currentStudent !== student_id) {
//         console.log("🔄 Switching student session");

//         // Clear old session
//         sessionStorage.clear();

//         // Clear app state storage
//         localStorage.removeItem("its_resume");
//         localStorage.removeItem("pendingPayload");

//         // Reset React state
//         setCompleted(new Set());
//         setActiveSubtopic(null);
//         setSessionData(null);
//         setResultData(null);
//         setRecommendation(null);
//         setChapterMetrics({
//           correct_answers: 0,
//           wrong_answers: 0,
//           questions_attempted: 0,
//           retry_count: 0,
//           hints_used: 0,
//           time_spent_seconds: 0,
//         });
//       }

//       // ✅ SET NEW SESSION
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("student_id", student_id);
//       sessionStorage.setItem("session_id", session_id);

//       // ✅ UPDATE UI STATE (CRITICAL FIX)
//       setStudent({
//         studentId: student_id,
//         studentName: student_id, // or fetch name if needed
//       });

//       setScreen(SCREENS.DASHBOARD);
//     }
//   }, [window.location.search]);

//   function handleAuth(studentInfo) {
//     setStudent(studentInfo);
//     setScreen(SCREENS.DASHBOARD);
//   }

//   function handleLogout() {
//     sessionStorage.clear();
//     setStudent(null);
//     setScreen(SCREENS.AUTH);
//     setCompleted(new Set());
//     setActiveSubtopic(null);
//     setSessionData(null);
//   }
//   async function handleExitCourse() {
//     const confirmExit = window.confirm("Exit full course?");

//     if (!confirmExit) return;

//     const token = sessionStorage.getItem("token");

//     const payload = {
//       student_id: sessionStorage.getItem("student_id"),
//       session_id: sessionStorage.getItem("session_id"),
//       chapter_id: "grade8_exponents_and_powers",

//       timestamp: new Date().toISOString(),
//       session_status: "exited_midway",

//       correct_answers: chapterMetrics.correct_answers,
//       wrong_answers: chapterMetrics.wrong_answers,
//       questions_attempted: chapterMetrics.questions_attempted,

//       total_questions: 60,
//       retry_count: chapterMetrics.retry_count,
//       hints_used: chapterMetrics.hints_used,
//       total_hints_embedded: 20,

//       time_spent_seconds: Math.max(60, Math.round(chapterMetrics.time_spent_seconds)),

//       topic_completion_ratio: completed.size / 5,
//     };

//     console.log("EXIT COURSE PAYLOAD:", payload);

//     try {
//       const res = await fetch("https://kaushik-dev.online/api/recommend/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       setRecommendation(data);

//       alert(data.recommendation.reason);

//       // 👉 REDIRECT BACK TO MERGE PLATFORM
//       window.location.href = "https://kaushik-dev.online/dashboard"; // or given URL

//     } catch (err) {
//       console.error(err);
//       alert("Failed to send session");
//     }
//   }

//   function handleSelectSubtopic(id) {
//     setActiveSubtopic(id);
//     setScreen(SCREENS.READING);
//   }

//   function handleStartAssessment() {
//     localStorage.removeItem(`session_${student.studentId}_${activeSubtopic}`);

//     const sessionId = generateSessionId(student.studentId);

//     const sd = createSessionData({
//       studentId: student.studentId,
//       sessionId,
//       subtopicIndex: activeSubtopic,
//     });

//     setSessionData(sd);
//     setScreen(SCREENS.ASSESSMENT);
//   }

//   // 🔥 UPDATED: aggregate + no API call here
//   async function handleAssessmentComplete(finalMetrics) {
//     // aggregate into chapter
//     setChapterMetrics(prev => ({
//       correct_answers: prev.correct_answers + finalMetrics.correct_answers,
//       wrong_answers: prev.wrong_answers + finalMetrics.wrong_answers,
//       questions_attempted: prev.questions_attempted + finalMetrics.questions_attempted,
//       retry_count: prev.retry_count + finalMetrics.retry_count,
//       hints_used: prev.hints_used + finalMetrics.hints_used,
//       time_spent_seconds: prev.time_spent_seconds + finalMetrics.time_spent_seconds,
//     }));

//     setResultData(finalMetrics);
//     setScreen(SCREENS.RESULT);
//   }

//   function handleAssessmentExit() {
//     setSessionData(null);
//     setActiveSubtopic(null);
//     setScreen(SCREENS.DASHBOARD);
//   }

//   // 🔥 FINAL API CALL (ONLY ONCE)
//   async function sendFinalPayload() {
//     const token = sessionStorage.getItem("token");
//     const student_id = sessionStorage.getItem("student_id");
//     const session_id = sessionStorage.getItem("session_id");

//     const payload = {
//       student_id,
//       session_id,
//       chapter_id: "grade8_exponents_and_powers",

//       timestamp: new Date().toISOString(),
//       session_status: "completed",

//       correct_answers: chapterMetrics.correct_answers,
//       wrong_answers: chapterMetrics.wrong_answers,
//       questions_attempted: chapterMetrics.questions_attempted,

//       total_questions: chapterMetrics.questions_attempted, // 🔥 update if needed

//       retry_count: chapterMetrics.retry_count,
//       hints_used: chapterMetrics.hints_used,
//       total_hints_embedded: chapterMetrics.questions_attempted,

//       time_spent_seconds: Math.round(chapterMetrics.time_spent_seconds),

//       topic_completion_ratio: Number((completed.size / 5).toFixed(2)),
//     };
//     console.log("FINAL PAYLOAD:", payload);
//     try {
//       const res = await axios.post(
//         "https://kaushik-dev.online/api/recommend/",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("✅ Recommendation:", res.data);

//       setRecommendation(res.data); // 🔥 IMPORTANT

//     } catch (err) {
//       console.error("❌ API Error:", err);
//       alert("Failed to fetch recommendation");
//     }
//   }

//   // 🔥 TRIGGER WHEN ALL SUBTOPICS COMPLETE
//   useEffect(() => {
//     if (completed.size === 5) {
//       sendFinalPayload();
//     }
//   }, [completed]);

//   // ── NAV ─────────────────
//   const Nav = () => (
//     <div className="flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30 shadow-sm">
//       <span className="font-bold text-blue-800">
//         Power Play 🚀
//         <span className="text-xs text-gray-400 ml-2 font-normal">
//           {CHAPTER_METADATA.chapter_name}
//         </span>
//       </span>

//       <div className="flex items-center gap-3">
//         <button
//           onClick={() => setScreen(SCREENS.PROFILE)}
//           className="bg-white px-4 py-2 rounded-xl shadow"
//         >
//           👤 {student?.studentName}
//         </button>

//         {/* <button
//           onClick={handleLogout}
//           className="text-xs text-red-500 border px-3 py-2 rounded-xl bg-white"
//         >
//           Logout
//         </button> */}
//         <button
//           onClick={handleExitCourse}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg"
//         >
//           Exit Course
//         </button>
//       </div>
//     </div>
//   );

//   // ── SCREENS ─────────────────

//   if (screen === SCREENS.AUTH) {
//     return <AuthPage onAuth={handleAuth} />;
//   }

//   if (screen === SCREENS.PROFILE) {
//     return (
//       <>
//         <Nav />
//         <ProfilePage
//           studentId={student?.studentId}
//           onBack={() => setScreen(SCREENS.DASHBOARD)}
//         />
//       </>
//     );
//   }

//   if (screen === SCREENS.DASHBOARD) {
//     return (
//       <>
//         <Nav />
//         <SubtopicDashboard
//           studentId={student.studentId}
//           onSelect={handleSelectSubtopic}
//           recommendation={recommendation}
//         />
//       </>
//     );
//   }

//   if (screen === SCREENS.READING && activeSubtopic) {
//     const ReadingPage = READING_PAGES[activeSubtopic];
//     return (
//       <>
//         <Nav />
//         <ReadingPage onStartAssessment={handleStartAssessment} />
//       </>
//     );
//   }

//   if (screen === SCREENS.ASSESSMENT && activeSubtopic && sessionData) {
//     return (
//       <>
//         <Nav />
//         <AssessmentPage
//           subtopicIndex={activeSubtopic}
//           sessionData={sessionData}
//           onComplete={handleAssessmentComplete}
//           onExit={handleAssessmentExit}
//         />
//       </>
//     );
//   }

//   if (screen === SCREENS.RESULT && resultData) {
//     return (
//       <>
//         <Nav />
//         <ResultPage
//           stats={resultData}
//           onBack={() => {
//             setCompleted(prev => new Set([...prev, activeSubtopic]));
//             setActiveSubtopic(null);
//             setSessionData(null);
//             setResultData(null);
//             setScreen(SCREENS.DASHBOARD);
//           }}
//         />
//       </>
//     );
//   }

//   return null;
// }




import { useState, useEffect } from "react";
import axios from "axios";

import AuthPage from "./pages/AuthPage";
import SubtopicDashboard from "./pages/SubtopicDashboard";
import AssessmentPage from "./pages/AssessmentPage";
import ProfilePage from "./pages/ProfilePage";
import ResultPage from "./pages/ResultPage";

import ReadingPage1 from "./pages/ReadingPage1";
import ReadingPage2 from "./pages/ReadingPage2";
import ReadingPage3 from "./pages/ReadingPage3";
import ReadingPage4 from "./pages/ReadingPage4";
import ReadingPage5 from "./pages/ReadingPage5";

import {
  generateSessionId,
  createSessionData,
  retryPendingPayload,
  CHAPTER_METADATA,
} from "./utils/sessionManager";

const READING_PAGES = {
  1: ReadingPage1,
  2: ReadingPage2,
  3: ReadingPage3,
  4: ReadingPage4,
  5: ReadingPage5,
};

const SCREENS = {
  AUTH: "auth",
  DASHBOARD: "dashboard",
  READING: "reading",
  ASSESSMENT: "assessment",
  PROFILE: "profile",
  RESULT: "result",
};

export default function App() {
  const [student, setStudent] = useState(null);
  const [screen, setScreen] = useState(SCREENS.AUTH);
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [sessionData, setSessionData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  // 🔥 NEW
  const [showRecommendation, setShowRecommendation] = useState(false);

  const [chapterMetrics, setChapterMetrics] = useState({
    correct_answers: 0,
    wrong_answers: 0,
    questions_attempted: 0,
    retry_count: 0,
    hints_used: 0,
    time_spent_seconds: 0,
  });

  // 🔥 MERGE LOGIN HANDLING
  useEffect(() => {
    retryPendingPayload();

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const student_id = params.get("student_id");
    const session_id = params.get("session_id");

    if (token && student_id && session_id) {
      console.log("🔥 Merge login detected");

      const currentStudent = sessionStorage.getItem("student_id");

      if (currentStudent !== student_id) {
        console.log("🔄 Switching student session");

        sessionStorage.clear();
        localStorage.removeItem("its_resume");
        localStorage.removeItem("pendingPayload");

        setCompleted(new Set());
        setActiveSubtopic(null);
        setSessionData(null);
        setResultData(null);
        setRecommendation(null);
        setShowRecommendation(false);

        setChapterMetrics({
          correct_answers: 0,
          wrong_answers: 0,
          questions_attempted: 0,
          retry_count: 0,
          hints_used: 0,
          time_spent_seconds: 0,
        });
      }

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("student_id", student_id);
      sessionStorage.setItem("session_id", session_id);

      setStudent({
        studentId: student_id,
        studentName: student_id,
      });

      setScreen(SCREENS.DASHBOARD);
    }
  }, [window.location.search]);

  function handleAuth(studentInfo) {
    setStudent(studentInfo);
    setScreen(SCREENS.DASHBOARD);
  }

  function handleLogout() {
    sessionStorage.clear();
    setStudent(null);
    setScreen(SCREENS.AUTH);
    setCompleted(new Set());
    setActiveSubtopic(null);
    setSessionData(null);
  }

  // 🔥 EXIT COURSE (FIXED)
  async function handleExitCourse() {
    const confirmExit = window.confirm("Exit full course?");
    if (!confirmExit) return;

    const token = sessionStorage.getItem("token");

    const payload = {
      student_id: sessionStorage.getItem("student_id"),
      session_id: sessionStorage.getItem("session_id"),
      chapter_id: "grade8_exponents_and_powers",

      timestamp: new Date().toISOString(),
      session_status: "exited_midway",

      correct_answers: chapterMetrics.correct_answers,
      wrong_answers: chapterMetrics.wrong_answers,
      questions_attempted: chapterMetrics.questions_attempted,

      total_questions: 60,
      retry_count: chapterMetrics.retry_count,
      hints_used: chapterMetrics.hints_used,
      total_hints_embedded: 60,

      time_spent_seconds: Math.max(
        60,
        Math.round(chapterMetrics.time_spent_seconds)
      ),

      topic_completion_ratio: completed.size / 5,
    };

    console.log("EXIT COURSE PAYLOAD:", payload);

    try {
      const res = await fetch("https://kaushik-dev.online/api/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setRecommendation(data);
      setShowRecommendation(true); // 🔥 SHOW UI

    } catch (err) {
      console.error(err);
      alert("Failed to send session");
    }
  }

  function handleSelectSubtopic(id) {
    setActiveSubtopic(id);
    setScreen(SCREENS.READING);
  }

  function handleStartAssessment() {
    const sessionId = generateSessionId(student.studentId);

    const sd = createSessionData({
      studentId: student.studentId,
      sessionId,
      subtopicIndex: activeSubtopic,
    });

    setSessionData(sd);
    setScreen(SCREENS.ASSESSMENT);
  }

  async function handleAssessmentComplete(finalMetrics) {
    setChapterMetrics(prev => ({
      correct_answers: prev.correct_answers + finalMetrics.correct_answers,
      wrong_answers: prev.wrong_answers + finalMetrics.wrong_answers,
      questions_attempted:
        prev.questions_attempted + finalMetrics.questions_attempted,
      retry_count: prev.retry_count + finalMetrics.retry_count,
      hints_used: prev.hints_used + finalMetrics.hints_used,
      time_spent_seconds:
        prev.time_spent_seconds + finalMetrics.time_spent_seconds,
    }));

    setResultData(finalMetrics);
    setScreen(SCREENS.RESULT);
  }

  function handleAssessmentExit() {
    setSessionData(null);
    setActiveSubtopic(null);
    setScreen(SCREENS.DASHBOARD);
  }

  async function sendFinalPayload() {
    const token = sessionStorage.getItem("token");
    const student_id = sessionStorage.getItem("student_id");
    const session_id = sessionStorage.getItem("session_id");

    const payload = {
      student_id,
      session_id,
      chapter_id: "grade8_exponents_and_powers",

      timestamp: new Date().toISOString(),
      session_status: "completed",

      correct_answers: chapterMetrics.correct_answers,
      wrong_answers: chapterMetrics.wrong_answers,
      questions_attempted: chapterMetrics.questions_attempted,

      total_questions: chapterMetrics.questions_attempted,
      retry_count: chapterMetrics.retry_count,
      hints_used: chapterMetrics.hints_used,
      total_hints_embedded: chapterMetrics.questions_attempted,

      time_spent_seconds: Math.round(chapterMetrics.time_spent_seconds),

      topic_completion_ratio: Number((completed.size / 5).toFixed(2)),
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      const res = await fetch("https://kaushik-dev.online/api/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setRecommendation(data);
      setShowRecommendation(true);

    } catch (err) {
      console.error("❌ API Error:", err);
    }
  }

  useEffect(() => {
    if (completed.size === 5) {
      sendFinalPayload();
    }
  }, [completed]);

  const Nav = () => (
    <div className="flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30 shadow-sm">
      <span className="font-bold text-blue-800">
        Power Play 🚀
        <span className="text-xs text-gray-400 ml-2 font-normal">
          {CHAPTER_METADATA.chapter_name}
        </span>
      </span>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setScreen(SCREENS.PROFILE)}
          className="bg-white px-4 py-2 rounded-xl shadow"
        >
          👤 {student?.studentName}
        </button>

        <button
          onClick={handleExitCourse}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Exit Course
        </button>
      </div>
    </div>
  );

  if (screen === SCREENS.AUTH) return <AuthPage onAuth={handleAuth} />;

  if (screen === SCREENS.DASHBOARD) {
    return (
      <>
        <Nav />

        {/* 🔥 RECOMMENDATION CARD (TOP) */}
        {recommendation && showRecommendation && (
          <div className="max-w-3xl mx-auto mt-6 p-6 rounded-2xl shadow bg-white border border-blue-200">

            <h2 className="text-xl font-bold text-blue-700 mb-3">
              🎯 Learning Recommendation
            </h2>

            {/* BASIC INFO */}
            <div className="text-sm text-gray-800 space-y-1">
              <p><strong>Student ID:</strong> {recommendation.student_id}</p>
              <p><strong>Chapter:</strong> {recommendation.chapter_id}</p>
              <p>
                <strong>Learning State:</strong>{" "}
                <span className={`capitalize font-semibold ${recommendation.learning_state === "strong"
                    ? "text-green-600"
                    : "text-red-600"
                  }`}>
                  {recommendation.learning_state}
                </span>
              </p>

              <p><strong>Performance Score:</strong> {recommendation.performance_score?.toFixed(2)}</p>
              <p><strong>Confidence Score:</strong> {recommendation.confidence_score?.toFixed(2)}</p>
            </div>

            {/* DIAGNOSIS */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border text-sm">
              <h3 className="font-semibold text-gray-700 mb-2">📊 Diagnosis</h3>

              <p><strong>Accuracy:</strong> {recommendation.diagnosis?.accuracy}</p>
              <p><strong>Hint Dependency:</strong> {recommendation.diagnosis?.hint_dependency}</p>
              <p><strong>Retry Behavior:</strong> {recommendation.diagnosis?.retry_behavior}</p>
              <p><strong>Time Efficiency:</strong> {recommendation.diagnosis?.time_efficiency}</p>

              {/* HISTORY */}
              <div className="mt-3 text-gray-600">
                <p><strong>Past Attempts:</strong> {recommendation.diagnosis?.history?.past_attempts}</p>
                <p><strong>Average Performance:</strong> {recommendation.diagnosis?.history?.avg_performance ?? "N/A"}</p>
                <p><strong>Trend:</strong> {recommendation.diagnosis?.history?.trend}</p>
              </div>
            </div>

            {/* RECOMMENDATION */}
            <div className="mt-5">
              <h3 className="font-semibold text-gray-800 mb-1">🚀 Recommendation</h3>

              <p>
                <strong>Type:</strong>{" "}
                <span className="capitalize">
                  {recommendation.recommendation?.type}
                </span>
              </p>

              <p className="mt-2 font-medium text-gray-800">
                💡 {recommendation.recommendation?.reason}
              </p>

              {/* NEXT STEPS */}
              {recommendation.recommendation?.next_steps && (
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  {recommendation.recommendation.next_steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* PREREQUISITE BUTTON */}
            {recommendation.recommendation?.prerequisite_url && (
              <a
                href={recommendation.recommendation.prerequisite_url}
                className="inline-block mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                🔁 Go to Prerequisite Chapter
              </a>
            )}

            {/* CTA BUTTON */}
            <button
              className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => window.location.href = "https://kaushik-dev.online/dashboard"}
            >
              Continue Learning →
            </button>

          </div>
        )}
        {/* 🔥 RECOMMENDATION UI ENDS HERE */}

        <SubtopicDashboard
          studentId={student.studentId}
          onSelect={handleSelectSubtopic}
          recommendation={recommendation}
        />
      </>
    );
  }

  if (screen === SCREENS.READING && activeSubtopic) {
    const ReadingPage = READING_PAGES[activeSubtopic];
    return (
      <>
        <Nav />
        <ReadingPage onStartAssessment={handleStartAssessment} />
      </>
    );
  }

  if (screen === SCREENS.ASSESSMENT && activeSubtopic && sessionData) {
    return (
      <>
        <Nav />
        <AssessmentPage
          subtopicIndex={activeSubtopic}
          sessionData={sessionData}
          onComplete={handleAssessmentComplete}
          onExit={handleAssessmentExit}
        />
      </>
    );
  }

  if (screen === SCREENS.RESULT && resultData) {
    return (
      <>
        <Nav />
        <ResultPage
          stats={resultData}
          onBack={() => {
            setCompleted(prev => new Set([...prev, activeSubtopic]));
            setActiveSubtopic(null);
            setSessionData(null);
            setResultData(null);
            setScreen(SCREENS.DASHBOARD);
          }}
        />
      </>
    );
  }

  if (screen === SCREENS.PROFILE) {
    return (
      <>
        <Nav />
        <ProfilePage
          studentId={student?.studentId}
          onBack={() => setScreen(SCREENS.DASHBOARD)}
        />
      </>
    );
  }

  return null;
}