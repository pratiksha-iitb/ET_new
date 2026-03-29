export default function HintBox({ hint, onUse, used }) {
  return (
    <div className="mt-4">
      <button
        onClick={() => {
  onUse();
}}
        className="bg-yellow-400 px-4 py-2 rounded-xl"
      >
        Show Hint
      </button>

      {used && (
        <p className="mt-2 bg-yellow-100 p-3 rounded-xl">{hint}</p>
      )}
    </div>
  );
}