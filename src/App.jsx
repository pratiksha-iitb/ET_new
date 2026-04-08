
// import { useState, useEffect } from "react";

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
//   PROFILE: "profile", // ✅ added
//   RESULT: "result",
// };

// export default function App() {
//   const [student, setStudent] = useState(() => {
//     const id = sessionStorage.getItem("its_student_id");
//     const name = sessionStorage.getItem("its_student_name");
//     return id ? { studentId: id, studentName: name } : null;
//   });

//   const [screen, setScreen] = useState(
//     student ? SCREENS.DASHBOARD : SCREENS.AUTH
//   );
//   const [activeSubtopic, setActiveSubtopic] = useState(null);
//   const [completed, setCompleted] = useState(new Set());
//   const [sessionData, setSessionData] = useState(null);
//   const [resultData, setResultData] = useState(null);

//   useEffect(() => {
//     retryPendingPayload();
//   }, []);

//   function handleAuth(studentInfo) {
//     setStudent(studentInfo);
//     setScreen(SCREENS.DASHBOARD);
//   }

//   function handleLogout() {
//     sessionStorage.removeItem("its_student_id");
//     sessionStorage.removeItem("its_student_name");
//     setStudent(null);
//     setScreen(SCREENS.AUTH);
//     setCompleted(new Set());
//     setActiveSubtopic(null);
//     setSessionData(null);
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
//       subtopicIndex: activeSubtopic
//     });

//     setSessionData(sd);
//     setScreen(SCREENS.ASSESSMENT);
//     setScreen(SCREENS.ASSESSMENT);
//   }

//   async function handleAssessmentComplete(finalMetrics) {
//     if (sessionData) {
//       await dispatchPayload(sessionData, finalMetrics, "completed");
//     }

//     setResultData(finalMetrics); // 🔥 store result

//     setScreen(SCREENS.RESULT);   // 🔥 go to result screen
//   }

//   function handleAssessmentExit() {
//     setSessionData(null);
//     setActiveSubtopic(null);
//     setScreen(SCREENS.DASHBOARD);
//   }

//   // ── NAVBAR ─────────────────────────────────────────
//   const Nav = () => (
//     <div className="flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30 shadow-sm">

//       {/* LEFT TITLE */}
//       <span className="font-bold text-blue-800">
//         Power Play 🚀
//         <span className="text-xs text-gray-400 ml-2 font-normal">
//           {CHAPTER_METADATA.chapter_name}
//         </span>
//       </span>

//       {/* RIGHT BUTTONS */}
//       <div className="flex items-center gap-3">

//         {/* PROFILE */}
//         <button
//           onClick={() => setScreen(SCREENS.PROFILE)}
//           className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
//         >
//           👤 {student?.studentName}
//         </button>

//         {/* LOGOUT */}
//         <button
//           onClick={handleLogout}
//           className="text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-2 rounded-xl bg-white shadow hover:shadow-md transition"
//         >
//           Logout
//         </button>

//       </div>
//     </div>
//   );

//   // ── SCREENS ────────────────────────────────────────

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
  dispatchPayload,
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
  const [student, setStudent] = useState(() => {
    const id = sessionStorage.getItem("its_student_id");
    const name = sessionStorage.getItem("its_student_name");
    return id ? { studentId: id, studentName: name } : null;
  });

  const [screen, setScreen] = useState(
    student ? SCREENS.DASHBOARD : SCREENS.AUTH
  );
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [sessionData, setSessionData] = useState(null);
  const [resultData, setResultData] = useState(null);

  // 🔥 NEW: Chapter metrics
  const [chapterMetrics, setChapterMetrics] = useState({
    correct_answers: 0,
    wrong_answers: 0,
    questions_attempted: 0,
    retry_count: 0,
    hints_used: 0,
    time_spent_seconds: 0,
  });

  // 🔥 URL PARAM EXTRACTION (MERGE)
  useEffect(() => {
    retryPendingPayload();

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const student_id = params.get("student_id");
    const session_id = params.get("session_id");

    if (token && student_id && session_id) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("student_id", student_id);
      sessionStorage.setItem("session_id", session_id);
    }
  }, []);

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

  function handleSelectSubtopic(id) {
    setActiveSubtopic(id);
    setScreen(SCREENS.READING);
  }

  function handleStartAssessment() {
    localStorage.removeItem(`session_${student.studentId}_${activeSubtopic}`);

    const sessionId = generateSessionId(student.studentId);

    const sd = createSessionData({
      studentId: student.studentId,
      sessionId,
      subtopicIndex: activeSubtopic,
    });

    setSessionData(sd);
    setScreen(SCREENS.ASSESSMENT);
  }

  // 🔥 UPDATED: aggregate + no API call here
  async function handleAssessmentComplete(finalMetrics) {
    // aggregate into chapter
    setChapterMetrics(prev => ({
      correct_answers: prev.correct_answers + finalMetrics.correct_answers,
      wrong_answers: prev.wrong_answers + finalMetrics.wrong_answers,
      questions_attempted: prev.questions_attempted + finalMetrics.questions_attempted,
      retry_count: prev.retry_count + finalMetrics.retry_count,
      hints_used: prev.hints_used + finalMetrics.hints_used,
      time_spent_seconds: prev.time_spent_seconds + finalMetrics.time_spent_seconds,
    }));

    setResultData(finalMetrics);
    setScreen(SCREENS.RESULT);
  }

  function handleAssessmentExit() {
    setSessionData(null);
    setActiveSubtopic(null);
    setScreen(SCREENS.DASHBOARD);
  }

  // 🔥 FINAL API CALL (ONLY ONCE)
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

      total_questions:chapterMetrics.questions_attempted, // 🔥 update if needed

      retry_count: chapterMetrics.retry_count,
      hints_used: chapterMetrics.hints_used,
      total_hints_embedded: chapterMetrics.questions_attempted,

      time_spent_seconds: Math.round(chapterMetrics.time_spent_seconds),

      topic_completion_ratio: Number((completed.size / 5).toFixed(2)), 
    };
    console.log("FINAL PAYLOAD:", payload);
    try {
      const res = await fetch(
        "https://kaushik-dev.online/api/recommend/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      alert(data.recommendation?.reason || "Recommendation received");

    } catch (err) {
      console.error("API Error", err);
      localStorage.setItem("pendingPayload", JSON.stringify(payload));
    }
  }

  // 🔥 TRIGGER WHEN ALL SUBTOPICS COMPLETE
  useEffect(() => {
    if (completed.size === 5) {
      sendFinalPayload();
    }
  }, [completed]);

  // ── NAV ─────────────────
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
          onClick={handleLogout}
          className="text-xs text-red-500 border px-3 py-2 rounded-xl bg-white"
        >
          Logout
        </button>
      </div>
    </div>
  );

  // ── SCREENS ─────────────────

  if (screen === SCREENS.AUTH) {
    return <AuthPage onAuth={handleAuth} />;
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

  if (screen === SCREENS.DASHBOARD) {
    return (
      <>
        <Nav />
        <SubtopicDashboard
          studentId={student.studentId}
          onSelect={handleSelectSubtopic}
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

  return null;
}