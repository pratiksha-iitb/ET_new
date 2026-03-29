export default function FeedbackBox({ feedback, isCorrect }) {
  if (!feedback) return null;

  const cls = isCorrect
    ? "bg-green-50 border border-green-300 text-green-800"
    : "bg-red-50 border border-red-300 text-red-800";

  return (
    <div className={`mt-4 p-4 rounded-xl ${cls}`}>
      <p className="font-medium">
        {isCorrect ? "✅ " : "❌ "}
        {feedback}
      </p>
    </div>
  );
}