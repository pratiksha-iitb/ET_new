export default function RemedialContent({ content, onContinue }) {
  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-orange-200 space-y-5">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-orange-700">
        {content.title}
      </h2>

      {/* MISCONCEPTION */}
      {content.misconception && (
        <div className="bg-red-50 border border-red-300 p-4 rounded-xl">
          <p className="text-red-800">
            ❌ <strong>Common Mistake:</strong> {content.misconception}
          </p>
        </div>
      )}

      {/* EXPLANATION */}
      <p className="text-gray-700 leading-relaxed">
        {content.explanation}
      </p>

      {/* EXAMPLE */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
        <p className="font-semibold text-blue-800 mb-1">📘 Example</p>
        <p className="text-gray-700 font-mono">{content.example}</p>
      </div>

      {/* TIP */}
      {content.tip && (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-xl">
          <p className="text-yellow-800">
            💡 <strong>Tip:</strong> {content.tip}
          </p>
        </div>
      )}

      {/* PRACTICE QUESTIONS */}
      {content.practiceQuestions && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-800">
            🧠 Quick Practice
          </h3>

          {content.practiceQuestions.map((q, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 p-4 rounded-xl"
            >
              <p className="font-medium mb-2">
                {index + 1}. {q.question}
              </p>

              <ul className="list-disc list-inside text-gray-700 mb-2">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>

              <p className="text-green-700 font-semibold text-sm">
                ✅ Answer: {q.correctAnswer}
              </p>

              <p className="text-gray-600 text-sm">
                💡 {q.solution}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CONTINUE BUTTON */}
      <button
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition font-semibold shadow-md hover:scale-105"
      >
        Got it, Continue →
      </button>

    </div>
  );
}