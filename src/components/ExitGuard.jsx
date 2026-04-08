/**
 * ExitGuard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles two "exited_midway" triggers:
 *
 *  1. Browser-level exit (tab close / refresh / URL change):
 *     Uses window.onbeforeunload to fire a synchronous beacon payload,
 *     and shows the browser's native "Are you sure?" dialog.
 *
 *  2. In-app navigation (e.g. clicking back to dashboard mid-assessment):
 *     Shows a custom modal asking the student to confirm.
 *     If confirmed → dispatch exit payload → call onConfirmExit().
 *
 * Mount this component inside AssessmentPage while an assessment is active.
 * Unmount it (or set active=false) once assessment completes normally.
 */


// import { useEffect, useState } from "react";
// import { dispatchPayload } from "../utils/sessionManager";

// export default function ExitGuard({
//   active,           // boolean — only guard when true (assessment in progress)
//   sessionData,      // from createSessionData()
//   metricsRef,       // ref to live metrics (synchronous read)
//   statsRef,        // 🔥 ADD THIS
//   current,         // 🔥 ADD THIS
//   difficulty,      // 🔥 ADD THIS
//   subtopicIndex,   // 🔥 ADD THIS
//   usedIds,         // 🔥 ADD THIS
//   onConfirmExit,    // called after user confirms exit and payload is sent
// }) {
//   const [showModal, setShowModal] = useState(false);

//   // ── 1. Browser-level exit guard ───────────────────────────────────────────
//   useEffect(() => {
//     if (!active) return;

//     function handleBeforeUnload(e) {
//   e.preventDefault();
//   e.returnValue = "";

//   try {
//     // 🔥 SAVE RESUME
//     localStorage.setItem(
//       "its_resume",
//       JSON.stringify({
//         subtopicIndex,
//         currentQuestion: current,
//         difficulty,
//         stats: statsRef.current,
//         metrics: metricsRef.current,
//         usedIds: Array.from(usedIds.current),
//       })
//     );

//     const timeSpent = Math.round(
//       (Date.now() - new Date(sessionData.start_time).getTime()) / 1000
//     );

//     const payload = {
//       student_id: sessionData.student_id,
//       session_id: sessionData.session_id,
//       chapter_id: sessionData.chapter_id,

//       timestamp: new Date().toISOString(),
//       session_status: "exited_midway",

//       correct_answers: metricsRef.current.correct_answers,
//       wrong_answers: metricsRef.current.wrong_answers,
//       questions_attempted: metricsRef.current.questions_attempted,

//       total_questions: 60,
//       retry_count: metricsRef.current.retry_count,
//       hints_used: metricsRef.current.hints_used,
//       total_hints_embedded: 60,

//       time_spent_seconds: timeSpent,
//       topic_completion_ratio: Number((completed.size / 5).toFixed(2)),  // partial
//     };

//     const blob = new Blob([JSON.stringify(payload)], {
//       type: "application/json",
//     });

//     navigator.sendBeacon(
//       "https://kaushik-dev.online/api/recommend/",
//       blob
//     );

//   } catch (_) {}
// }
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [active, sessionData, metricsRef]);

//   // ── 2. In-app exit — show custom modal ───────────────────────────────────
//   // async function handleConfirmExit() {
//   //   setShowModal(false);
//   //   await dispatchPayload(sessionData, metricsRef.current, "exited_midway");
//   //   onConfirmExit();
//   // }
//  async function handleConfirmExit() {
//   setShowModal(false);

//   // 🔥 SAVE RESUME
//   localStorage.setItem(
//     "its_resume",
//     JSON.stringify({
//       subtopicIndex,
//       currentQuestion: current,
//       difficulty,
//       stats: statsRef.current,
//       metrics: metricsRef.current,
//       usedIds: Array.from(usedIds.current),
//     })
//   );

//   const token = sessionStorage.getItem("token");

//   const timeSpent = Math.round(
//     (Date.now() - new Date(sessionData.start_time).getTime()) / 1000
//   );

//   const payload = {
//     student_id: sessionData.student_id,
//     session_id: sessionData.session_id,
//     chapter_id: sessionData.chapter_id,

//     timestamp: new Date().toISOString(),
//     session_status: "exited_midway",

//     correct_answers: metricsRef.current.correct_answers,
//     wrong_answers: metricsRef.current.wrong_answers,
//     questions_attempted: metricsRef.current.questions_attempted,

//     total_questions: 60,
//     retry_count: metricsRef.current.retry_count,
//     hints_used: metricsRef.current.hints_used,
//     total_hints_embedded: 60,

//     time_spent_seconds: timeSpent,
//     topic_completion_ratio: Number((completed.size / 5).toFixed(2)),
//   };
//   console.log("FINAL PAYLOAD:", payload);
//   try {
//     await fetch("https://kaushik-dev.online/api/recommend/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });
//   } catch (err) {
//     console.error("Exit API error", err);
//   }

//   onConfirmExit();
// }

//   if (!active) return null;

//   return (
//     <>
//       {/* Floating "Exit Assessment" button visible during assessment */}
//       <div className="fixed top-4 left-4 z-40">
//         <button
//           onClick={() => setShowModal(true)}
//           className="text-xs bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg shadow hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
//         >
//           ✕ Exit Assessment
//         </button>
//       </div>

//       {/* Custom exit confirmation modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//           <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full space-y-5 border border-red-100">

//             <div className="text-center space-y-2">
//               <span className="text-5xl">⚠️</span>
//               <h2 className="text-xl font-bold text-gray-800">Exit Assessment?</h2>
//               <p className="text-gray-500 text-sm">
//                 Your progress will be saved, but this session will be marked as
//                 <strong> exited midway</strong>. You can restart the subtopic later.
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
//               >
//                 Stay
//               </button>
//               <button
//                 onClick={handleConfirmExit}
//                 className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
//               >
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

/**
 * ExitGuard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles two "exited_midway" triggers:
 *
 *  1. Browser-level exit (tab close / refresh / URL change):
 *     Uses window.onbeforeunload to fire a synchronous beacon payload,
 *     and shows the browser's native "Are you sure?" dialog.
 *
 *  2. In-app navigation (e.g. clicking back to dashboard mid-assessment):
 *     Shows a custom modal asking the student to confirm.
 *     If confirmed → dispatch exit payload → call onConfirmExit().
 *
 * Mount this component inside AssessmentPage while an assessment is active.
 * Unmount it (or set active=false) once assessment completes normally.
 */


import { useEffect, useState } from "react";
import { dispatchPayload } from "../utils/sessionManager";

export default function ExitGuard({
  active,           // boolean — only guard when true (assessment in progress)
  sessionData,      // from createSessionData()
  metricsRef,       // ref to live metrics (synchronous read)
  statsRef,        // 🔥 ADD THIS
  current,         // 🔥 ADD THIS
  difficulty,      // 🔥 ADD THIS
  subtopicIndex,   // 🔥 ADD THIS
  usedIds,         // 🔥 ADD THIS
  onConfirmExit,    // called after user confirms exit and payload is sent
}) {
  const [showModal, setShowModal] = useState(false);

  // ── 1. Browser-level exit guard ───────────────────────────────────────────
  useEffect(() => {
    if (!active) return;

    // function handleBeforeUnload(e) {
    //   // Show native browser confirmation dialog
    //   e.preventDefault();
    //   e.returnValue = ""; // required for Chrome

    //   // Attempt to send exit payload via sendBeacon (works even when page is closing)
    //   // sendBeacon is fire-and-forget — no await possible here
    //   try {
    //     const payload = {
    //       ...metricsRef.current,
    //       student_id:          sessionData.student_id,
    //       session_id:          sessionData.session_id,
    //       chapter_id:          sessionData.chapter_id,
    //       session_status:      "exited_midway",
    //       timestamp:           new Date().toISOString(),
    //       time_spent_seconds:  Math.round((Date.now() - new Date(sessionData.start_time).getTime()) / 1000),
    //     };
    //     const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    //     navigator.sendBeacon("/api/sessions/exit", blob); // adjust endpoint as needed
    //   } catch (_) { /* silent fail */ }
    // }
    function handleBeforeUnload(e) {
      e.preventDefault();
      e.returnValue = "";

      try {
        // 🔥 SAVE RESUME
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

        const payload = {
          ...metricsRef.current,
          student_id: sessionData.student_id,
          session_id: sessionData.session_id,
          chapter_id: sessionData.chapter_id,
          session_status: "exited_midway",
          timestamp: new Date().toISOString(),
          time_spent_seconds: Math.round(
            (Date.now() - new Date(sessionData.start_time).getTime()) / 1000
          ),
        };

        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });

        navigator.sendBeacon("/api/sessions/exit", blob);

      } catch (_) { }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [active, sessionData, metricsRef]);

  // ── 2. In-app exit — show custom modal ───────────────────────────────────
  // async function handleConfirmExit() {
  //   setShowModal(false);
  //   await dispatchPayload(sessionData, metricsRef.current, "exited_midway");
  //   onConfirmExit();
  // }
  async function handleConfirmExit() {
    setShowModal(false);

    // 🔥 SAVE RESUME BEFORE EXIT
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

    await dispatchPayload(sessionData, metricsRef.current, "exited_midway");

    onConfirmExit();
  }

  if (!active) return null;

  return (
    <>
      {/* Floating "Exit Assessment" button visible during assessment */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => setShowModal(true)}
          className="text-xs bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg shadow hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
        >
          ✕ Exit Assessment
        </button>
      </div>

      {/* Custom exit confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full space-y-5 border border-red-100">

            <div className="text-center space-y-2">
              <span className="text-5xl">⚠️</span>
              <h2 className="text-xl font-bold text-gray-800">Exit Assessment?</h2>
              <p className="text-gray-500 text-sm">
                Your progress will be saved, but this session will be marked as
                <strong> exited midway</strong>. You can restart the subtopic later.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Stay
              </button>
              <button
                onClick={handleConfirmExit}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}