// import { loadProgress } from "../utils/progressManager";

// export default function ProfilePage({ studentId, onBack }) {
//   const progress = loadProgress(studentId);

//   return (
//     <div className="p-8 max-w-4xl mx-auto space-y-6">

//       {/* HEADER */}
//       <h1 className="text-3xl font-bold text-blue-800">
//         👤 Your Profile
//       </h1>

//       {/* BACK BUTTON */}
//       <button
//         onClick={onBack}
//         className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
//       >
//         ← Back to Dashboard
//       </button>

//       {/* SUBTOPIC REPORT */}
//       <div className="space-y-4">
//         {Object.entries(progress.subtopics).map(([id, data]) => {
//           const m = data.metrics;

//           return (
//             <div
//               key={id}
//               className="bg-white p-6 rounded-2xl shadow border border-gray-100"
//             >
//               {/* TITLE */}
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="font-semibold text-lg text-blue-800">
//                   Subtopic {id}
//                 </h2>

//                 <span className="font-bold text-green-600">
//                   accuracy: {data.score?.toFixed(1) || 0}%
//                 </span>
//               </div>

//               {/* IF NOT ATTEMPTED */}
//               {!m ? (
//                 <p className="text-gray-400 text-sm">
//                   Not attempted yet
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">

//                   <p>✅ Correct: <strong>{m.correct_answers}</strong></p>
//                   <p>❌ Wrong: <strong>{m.wrong_answers}</strong></p>

//                   <p>📊 Attempted: <strong>{m.questions_attempted}</strong></p>
//                   <p>🔁 Retries: <strong>{m.retry_count}</strong></p>

//                   <p>💡 Hints Used: <strong>{m.hints_used}</strong></p>
//                   <p>🏆 Marks: <strong>{m.marks_gained} / {m.marks_total}</strong></p>

//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* OVERALL SCORE */}
//       <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-2xl text-center shadow">
//         <h2 className="text-xl font-bold text-green-800">
//           Overall Score: {progress.overallScore.toFixed(1)}%
//         </h2>
//       </div>

//     </div>
//   );
// }

import { loadProgress } from "../utils/progressManager";

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

export default function ProfilePage({ studentId, onBack }) {
  const progress = loadProgress(studentId);

  // Compute total time across all completed subtopics
  const totalSeconds = Object.values(progress.subtopics).reduce((sum, data) => {
    return sum + (data.metrics?.time_spent_seconds || 0);
  }, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-blue-800">
        👤 Your Profile
      </h1>

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
      >
        ← Back to Dashboard
      </button>

      {/* SUBTOPIC REPORT */}
      <div className="space-y-4">
        {Object.entries(progress.subtopics).map(([id, data]) => {
          const m = data.metrics;

          return (
            <div
              key={id}
              className="bg-white p-6 rounded-2xl shadow border border-gray-100"
            >
              {/* TITLE */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg text-blue-800">
                  Subtopic {id}
                </h2>

                <span className="font-bold text-green-600">
                  accuracy: {data.score?.toFixed(1) || 0}%
                </span>
              </div>

              {/* IF NOT ATTEMPTED */}
              {!m ? (
                <p className="text-gray-400 text-sm">
                  Not attempted yet
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">

                  <p>✅ Correct: <strong>{m.correct_answers}</strong></p>
                  <p>❌ Wrong: <strong>{m.wrong_answers}</strong></p>

                  <p>📊 Attempted: <strong>{m.questions_attempted}</strong></p>
                  <p>🔁 Retries: <strong>{m.retry_count}</strong></p>

                  <p>💡 Hints Used: <strong>{m.hints_used}</strong></p>
                  <p>🏆 Marks: <strong>{m.marks_gained} / {m.marks_total}</strong></p>

                  {/* ⏱ Time Spent */}
                  <p className="col-span-2 mt-1 pt-2 border-t border-gray-100">
                    ⏱ Time Spent: <strong className="text-blue-700">{formatTime(m.time_spent_seconds)}</strong>
                    {m.questions_attempted > 0 && m.time_spent_seconds > 0 && (
                      <span className="text-gray-400 ml-2 text-xs">
                        {/* (~{formatTime(Math.round(m.time_spent_seconds / m.questions_attempted))} per question) */}
                      </span>
                    )}
                  </p>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* OVERALL SCORE + TIME */}
      <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-2xl text-center shadow space-y-1">
        <h2 className="text-xl font-bold text-green-800">
          Overall Score: {progress.overallScore.toFixed(1)}%
        </h2>
        {totalSeconds > 0 && (
          <p className="text-green-700 text-sm">
            ⏱ Total Time Spent: <strong>{formatTime(totalSeconds)}</strong>
          </p>
        )}
      </div>

    </div>
  );
}