export default function ResultPage({ stats, onBack }) {
  const score =
    stats.marks_total > 0
      ? (stats.marks_gained / stats.marks_total) * 100
      : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">

      <div className="bg-white p-8 rounded-3xl shadow-xl text-center space-y-5 max-w-md w-full">

        <h1 className="text-3xl font-bold text-blue-800">
          🎯 Your Performance
        </h1>

        {/* SCORE */}
        <div className="text-5xl font-extrabold text-green-600">
          {score.toFixed(1)}%
        </div>

        {/* DETAILS */}
        <div className="text-gray-700 space-y-1">
          <p>✅ Correct: {stats.correct_answers}</p>
          <p>❌ Wrong: {stats.wrong_answers}</p>
          <p>📊 Attempted: {stats.questions_attempted}</p>
          <p>🔁 Retries: {stats.retry_count}</p>
          <p>💡 Hints Used: {stats.hints_used}</p>
          <p>🏆 Marks: {stats.marks_gained} / {stats.marks_total}</p>
        </div>

        {/* BUTTON */}
        <button
          onClick={onBack}
          className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Back to Dashboard →
        </button>

      </div>

    </div>
  );
}