/**
 * SubtopicDashboard.jsx
 *
 * Landing screen listing all 5 subtopics.
 *
 * HOW TO CUSTOMISE:
 * - Edit the `SUBTOPICS` array: set `title` and `description` for each subtopic.
 * - Do NOT change the `id` values (1–5) — they map to ReadingPageN and questionsN.json.
 * - Do NOT change prop names `completed` or `onSelect`.
 */

// TODO: Replace each title and description with your actual subtopic content

// const SUBTOPICS = [
//   {
//     id: 1,
//     title: "Powers with Negative Exponents",
//     description:
//       "Understand how negative exponents work and learn to convert them using the reciprocal rule.",
//     icon: "🔄",
//   },
//   {
//     id: 2,
//     title: "Expanded Form using Exponents",
//     description:
//       "Represent numbers and decimals in expanded form using powers of 10.",
//     icon: "🔢",
//   },
//   {
//     id: 3,
//     title: "Laws of Exponents",
//     description:
//       "Apply product, quotient, and power laws to simplify expressions.",
//     icon: "📐",
//   },
//   {
//     id: 4,
//     title: "Expressing numbers in Standard Form",
//     description:
//       "Combine multiple exponent rules to solve complex expressions step-by-step.",
//     icon: "⚡",
//   },
//   {
//     id: 5,
//     title: "Comparing very large and very small numbers",
//     description:
//       "Explore how exponents are used in science, measurements, and real-world problems.",
//     icon: "🌍",
//   },
// ];

// const COLORS = [
//   "from-blue-100 to-blue-50",
//   "from-purple-100 to-purple-50",
//   "from-green-100 to-green-50",
//   "from-yellow-100 to-yellow-50",
//   "from-pink-100 to-pink-50",
// ];

// export default function SubtopicDashboard({ onSelect, completed = new Set() }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 py-10">

//       <div className="max-w-6xl mx-auto px-6 space-y-10">

//         {/* ── HEADER ───────────────── */}
//         <div className="text-center space-y-2">
//           <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
//             Power Play 🚀
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Choose a subtopic and start learning step-by-step
//           </p>
//           <p className="text-gray-600 font-bold text-lg">
//             Exponents and Powers (Grade 8)
//           </p>
//         </div>

//         {/* ── PROGRESS BAR ───────────────── */}
//         <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow border border-blue-100">
//           <p className="text-sm text-gray-600 mb-2">
//             Progress: {completed.size} / 5 completed
//           </p>

//           <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//             <div
//               className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500"
//               style={{ width: `${(completed.size / 5) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* ── SUBTOPIC CARDS ───────────────── */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {SUBTOPICS.map(sub => {
//             const isDone = completed.has(sub.id);

//             return (
//               <button
//                 key={sub.id}
//                 onClick={() => onSelect(sub.id)}
//                 className={`text-left p-6 rounded-3xl shadow-lg border transition transform 
//                 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl
//                 bg-gradient-to-r ${COLORS[sub.id - 1]}
//                 ${isDone
//                     ? "border-green-400 ring-2 ring-green-300"
//                     : "border-white"
//                   }`}
//               >

//                 {/* TOP ROW */}
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-4xl drop-shadow-sm">{sub.icon}</span>

//                   {isDone && (
//                     <span className="text-green-700 font-bold text-sm bg-green-100 px-2 py-1 rounded-lg">
//                       ✓ Done
//                     </span>
//                   )}
//                 </div>

//                 {/* SUBTOPIC NUMBER */}
//                 <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
//                   Subtopic {sub.id}
//                 </p>

//                 {/* TITLE */}
//                 <h2 className="text-lg font-semibold text-blue-900">
//                   {sub.title}
//                 </h2>

//                 {/* DESCRIPTION */}
//                 <p className="text-sm text-gray-600 mt-2">
//                   {sub.description}
//                 </p>

//               </button>
//             );
//           })}
//         </div>

//         {/* ── COMPLETION MESSAGE ───────────────── */}
//         {completed.size === 5 && (
//           <div className="bg-green-100 border border-green-400 p-5 rounded-2xl text-center shadow animate-pulse">
//             <p className="text-green-800 font-bold text-lg">
//               🎉 All subtopics completed! You're a pro!
//             </p>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }
import { loadProgress } from "../utils/progressManager";

const SUBTOPICS = [
  {
    id: 1,
    title: "Powers with Negative Exponents",
    description:
      "Understand how negative exponents work and learn to convert them using the reciprocal rule.",
    icon: "🔄",
  },
  {
    id: 2,
    title: "Expanded Form using Exponents",
    description:
      "Represent numbers and decimals in expanded form using powers of 10.",
    icon: "🔢",
  },
  {
    id: 3,
    title: "Laws of Exponents",
    description:
      "Apply product, quotient, and power laws to simplify expressions.",
    icon: "📐",
  },
  {
    id: 4,
    title: "Expressing numbers in Standard Form",
    description:
      "Combine multiple exponent rules to solve complex expressions step-by-step.",
    icon: "⚡",
  },
  {
    id: 5,
    title: "Comparing very large and very small numbers",
    description:
      "Explore how exponents are used in science, measurements, and real-world problems.",
    icon: "🌍",
  },
];

const COLORS = [
  "from-blue-100 to-blue-50",
  "from-purple-100 to-purple-50",
  "from-green-100 to-green-50",
  "from-yellow-100 to-yellow-50",
  "from-pink-100 to-pink-50",
];

export default function SubtopicDashboard({ onSelect, studentId ,  recommendation}) {
  const progress = loadProgress(studentId) || { subtopics: {} };

  // ✅ FIX: count based on SCORE > 35 (NOT just completed)
  const completedCount = Object.values(progress.subtopics).filter(
    s => (s?.score || 0) > 35
  ).length;

  // 🔒 Unlock logic
  function isUnlocked(id) {
    if (id === 1) return true;

    const prev = progress.subtopics[id - 1];
    return (prev?.score || 0) > 35;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* ── HEADER ───────────────── */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
            Power Play 🚀
          </h1>
          <p className="text-gray-600 text-lg">
            Choose a subtopic and start learning step-by-step
          </p>
          <p className="text-gray-600 font-bold text-lg">
            Exponents and Powers (Grade 8)
          </p>
        </div>

        {/* ── PROGRESS BAR ───────────────── */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow border border-blue-100">
          <p className="text-sm text-gray-600 mb-2">
            Progress: {completedCount} / 5 completed
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* ── SUBTOPIC CARDS ───────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {SUBTOPICS.map(sub => {
            const unlocked = isUnlocked(sub.id);
            const data = progress.subtopics[sub.id] || {};
            const score = data.score || 0;
            const isDone = score > 35;

            return (
              <button
                key={sub.id}
                onClick={() => unlocked && onSelect(sub.id)}
                className={`text-left p-6 rounded-3xl shadow-lg border transition transform
                ${unlocked
                    ? "hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                  }
                bg-gradient-to-r ${COLORS[sub.id - 1]}
                ${isDone ? "border-green-400 ring-2 ring-green-300" : "border-white"}
                `}
              >

                {/* TOP ROW */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-4xl">
                    {unlocked ? sub.icon : "🔒"}
                  </span>

                  {isDone && (
                    <span className="text-green-700 font-bold text-sm bg-green-100 px-2 py-1 rounded-lg">
                      ✓ Passed
                    </span>
                  )}
                </div>

                {/* SUBTOPIC NUMBER */}
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Subtopic {sub.id}
                </p>

                {/* TITLE */}
                <h2 className="text-lg font-semibold text-blue-900">
                  {sub.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 mt-2">
                  {sub.description}
                </p>

                {/* SCORE */}
                {data.completed && (
                  <p className={`mt-3 text-sm font-semibold ${score > 35 ? "text-green-700" : "text-red-600"
                    }`}>
                    Score: {score.toFixed(1)}%
                  </p>
                )}

                {/* LOCK MESSAGE */}
                {!unlocked && (
                  <p className="text-xs text-red-500 mt-2">
                    🔒 Score more than 35% in previous subtopic to unlock
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* ── COMPLETION MESSAGE ───────────────── */}
        {/* — COMPLETION MESSAGE — */}
        {completedCount === 5 && (
          <>
            <div className="bg-green-100 border border-green-400 p-5 rounded-2xl text-center shadow">
              <p className="text-green-800 font-bold text-lg">
                🎉 All subtopics completed! You're a pro!
              </p>
            </div>

            {/* 🔥 RECOMMENDATION UI STARTS HERE */}
            {recommendation && (
              <div className="max-w-3xl mx-auto mt-6 p-6 rounded-2xl shadow bg-white border border-blue-200">

                <h2 className="text-xl font-bold text-blue-700 mb-3">
                  🎯 Learning Recommendation
                </h2>

                <p>
                  <strong>Learning State:</strong>{" "}
                  <span className="capitalize text-green-600 font-semibold">
                    {recommendation.learning_state}
                  </span>
                </p>

                <p>
                  <strong>Performance Score:</strong>{" "}
                  {recommendation.performance_score?.toFixed(2)}
                </p>

                <p>
                  <strong>Confidence Score:</strong>{" "}
                  {recommendation.confidence_score?.toFixed(2)}
                </p>

                {/* Diagnosis */}
                <div className="mt-3 text-sm text-gray-700">
                  <p><strong>Accuracy:</strong> {recommendation.diagnosis?.accuracy}</p>
                  <p><strong>Hint Dependency:</strong> {recommendation.diagnosis?.hint_dependency}</p>
                  <p><strong>Retry Behavior:</strong> {recommendation.diagnosis?.retry_behavior}</p>
                  <p><strong>Time Efficiency:</strong> {recommendation.diagnosis?.time_efficiency}</p>
                </div>

                {/* Reason */}
                <p className="mt-4 text-gray-800 font-medium">
                  💡 {recommendation.recommendation.reason}
                </p>

                {/* Next Steps */}
                {recommendation.recommendation.next_steps && (
                  <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                    {recommendation.recommendation.next_steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                )}

                {/* Prerequisite */}
                {recommendation.recommendation.prerequisite_url && (
                  <a
                    href={recommendation.recommendation.prerequisite_url}
                    className="inline-block mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    🔁 Go to Prerequisite Chapter
                  </a>
                )}

              </div>
            )}
            {/* 🔥 RECOMMENDATION UI ENDS HERE */}
          </>
        )}

      </div>
    </div>
  );
}