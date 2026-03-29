// /**
//  * App.jsx
//  * Owns session lifecycle. Dispatches payload BEFORE changing screen
//  * so localStorage write completes before any component unmounts.
//  */

// import { useState, useEffect } from "react";

// import AuthPage from "./pages/AuthPage";
// import SubtopicDashboard from "./pages/SubtopicDashboard";
// import AssessmentPage from "./pages/AssessmentPage";
// import ProfilePage from "./pages/ProfilePage";

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

// const READING_PAGES = { 1: ReadingPage1, 2: ReadingPage2, 3: ReadingPage3, 4: ReadingPage4, 5: ReadingPage5 };
// const SCREENS = { AUTH: "auth", DASHBOARD: "dashboard", READING: "reading", ASSESSMENT: "assessment" };

// export default function App() {
//   const [student, setStudent] = useState(() => {
//     const id = sessionStorage.getItem("its_student_id");
//     const name = sessionStorage.getItem("its_student_name");
//     return id ? { studentId: id, studentName: name } : null;
//   });

//   const [screen, setScreen] = useState(student ? SCREENS.DASHBOARD : SCREENS.AUTH);
//   const [activeSubtopic, setActiveSubtopic] = useState(null);
//   const [completed, setCompleted] = useState(new Set());
//   const [sessionData, setSessionData] = useState(null);

//   // Retry any payload that failed on previous visit
//   useEffect(() => { retryPendingPayload(); }, []);

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
//     const sessionId = generateSessionId(student.studentId);
//     const sd = createSessionData({ studentId: student.studentId, sessionId, subtopicIndex: activeSubtopic });
//     setSessionData(sd);
//     setScreen(SCREENS.ASSESSMENT);
//   }

//   // ── Called by AssessmentPage with final metrics snapshot ─────────────────
//   // dispatch happens HERE in App, BEFORE screen changes — no unmount race
//   async function handleAssessmentComplete(finalMetrics) {
//     if (sessionData) {
//       await dispatchPayload(sessionData, finalMetrics, "completed");
//     }
//     setCompleted(prev => new Set([...prev, activeSubtopic]));
//     setSessionData(null);
//     setActiveSubtopic(null);
//     setScreen(SCREENS.DASHBOARD);
//   }

//   // ── Called by ExitGuard after user confirms exit ──────────────────────────
//   // ExitGuard dispatches its own payload (with metricsRef) then calls this
//   function handleAssessmentExit() {
//     setSessionData(null);
//     setActiveSubtopic(null);
//     setScreen(SCREENS.DASHBOARD);
//   }

//   // ── Render ────────────────────────────────────────────────────────────────
//   if (screen === SCREENS.AUTH) {
//     return <AuthPage onAuth={handleAuth} />;
//   }

//   const Nav = () => (
//     <div className="flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30 shadow-sm">
//       <span className="font-bold text-blue-800">
//         Power Play 🚀
//         <span className="text-xs text-gray-400 ml-2 font-normal">{CHAPTER_METADATA.chapter_name}</span>
//       </span>
//       <div className="absolute top-1 right-6 flex items-center gap-3">

//         {/* PROFILE BUTTON */}
//         <button
//           onClick={() => onSelect("profile")}
//           className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
//         >
//           👤 {student?.studentName}
//         </button>

//         {/* LOGOUT BUTTON */}
//         <button
//           onClick={handleLogout}
//           className="text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-2 rounded-xl bg-white shadow hover:shadow-md transition"
//         >
//           Logout
//         </button>

//       </div>
//     </div>
//   );

//   if (screen === SCREENS.DASHBOARD) {
//     return <><Nav /><SubtopicDashboard completed={completed} onSelect={handleSelectSubtopic} /></>;
//   }

//   if (screen === SCREENS.READING && activeSubtopic) {
//     const ReadingPage = READING_PAGES[activeSubtopic];
//     return <><Nav /><ReadingPage onStartAssessment={handleStartAssessment} /></>;
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

//   return null;
// }



/**
 * App.jsx
 * Owns session lifecycle. Dispatches payload BEFORE changing screen
 * so localStorage write completes before any component unmounts.
 */

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
  PROFILE: "profile", // ✅ added
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

  useEffect(() => {
    retryPendingPayload();
  }, []);

  function handleAuth(studentInfo) {
    setStudent(studentInfo);
    setScreen(SCREENS.DASHBOARD);
  }

  function handleLogout() {
    sessionStorage.removeItem("its_student_id");
    sessionStorage.removeItem("its_student_name");
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
    if (sessionData) {
      await dispatchPayload(sessionData, finalMetrics, "completed");
    }

    setResultData(finalMetrics); // 🔥 store result

    setScreen(SCREENS.RESULT);   // 🔥 go to result screen
  }

  function handleAssessmentExit() {
    setSessionData(null);
    setActiveSubtopic(null);
    setScreen(SCREENS.DASHBOARD);
  }

  // ── NAVBAR ─────────────────────────────────────────
  const Nav = () => (
    <div className="flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30 shadow-sm">

      {/* LEFT TITLE */}
      <span className="font-bold text-blue-800">
        Power Play 🚀
        <span className="text-xs text-gray-400 ml-2 font-normal">
          {CHAPTER_METADATA.chapter_name}
        </span>
      </span>

      {/* RIGHT BUTTONS */}
      <div className="flex items-center gap-3">

        {/* PROFILE */}
        <button
          onClick={() => setScreen(SCREENS.PROFILE)}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
        >
          👤 {student?.studentName}
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-2 rounded-xl bg-white shadow hover:shadow-md transition"
        >
          Logout
        </button>

      </div>
    </div>
  );

  // ── SCREENS ────────────────────────────────────────

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