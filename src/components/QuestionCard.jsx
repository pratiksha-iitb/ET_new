export default function QuestionCard({ question, onSelect, disabled = false, selectedKey = null }) {
  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-blue-100">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-blue-800 mb-2">
        {question.title}
      </h2>

      {/* QUESTION */}
      <p className="mb-5 text-gray-700 leading-relaxed">
        {question.question_text}
      </p>

      {/* OPTIONS */}
      <div className="grid gap-3">
        {question.options.map(opt => {
          let cls =
            "p-4 rounded-xl border transition-all duration-200 text-left flex items-center justify-between ";

          if (disabled) {
            if (selectedKey === opt.key) {
              cls += opt.is_correct
                ? "bg-green-100 border-green-400 shadow-md"
                : "bg-red-100 border-red-400 shadow-md";
            } else if (opt.is_correct) {
              cls += "bg-green-50 border-green-300";
            } else {
              cls += "opacity-50";
            }
          } else {
            cls += "bg-white hover:bg-blue-50 hover:border-blue-300 hover:shadow-md cursor-pointer";
          }

          return (
            <button
              key={opt.key}
              onClick={() => !disabled && onSelect(opt)}
              className={cls}
              disabled={disabled}
            >
              {/* LEFT SIDE */}
              <span className="flex items-center gap-3">
                <span className="font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">
                  {opt.key}
                </span>
                <span className="text-gray-800">{opt.text}</span>
              </span>

              {/* RIGHT SIDE ICON */}
              {disabled && selectedKey === opt.key && (
                <span className="text-xl">
                  {opt.is_correct ? "✅" : "❌"}
                </span>
              )}

              {disabled && opt.is_correct && selectedKey !== opt.key && (
                <span className="text-green-600 text-sm font-semibold">
                  Correct Answer
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* FEEDBACK
      {disabled && selectedKey && (
        <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-sm text-gray-700">
            {
              question.options.find(o => o.key === selectedKey)?.feedback
            }
          </p>
        </div>
      )} */}

    </div>
  );
}