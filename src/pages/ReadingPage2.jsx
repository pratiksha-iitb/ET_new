/**
 * ReadingPage2.jsx — Subtopic 2: Powers with Negative Exponents
 *
 * HOW TO USE THIS FILE:
 * 1. Replace the <h1> title with your subtopic 2 name.
 * 2. Fill in the reading content sections below (definitions, examples, rules, etc.)
 * 3. You can add images, tables, or any JSX content inside the sections.
 * 4. Do NOT change the prop name "subtopicIndex" passed to the button — the
 *    navigation logic depends on it.
 * 5. Do NOT remove the "Start Assessment" button or change its onClick.
 */


import Img2 from "../assets/subtopic2_img.jpeg";
export default function ReadingPage2({ onStartAssessment }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        {/* ── TITLE ───────────────── */}
        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          Subtopic 2: Expanded Form using Exponents
        </h1>

        {/* ── CONCEPT ───────────────── */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Concept Explanation
          </h2>

          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              You already know how to expand large numbers like:
              <br />
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                (1 × 10^3) + (4 × 10^2) + (2 × 10^1) + (5 × 10^0)
              </span>
            </p>

            <p>
              We can use <b>negative exponents</b> to expand decimals too!
            </p>

            {/* IMAGE */}
                        <div className="flex justify-center mt-4">
                          <img
                            src={Img2}
                            alt="Negative exponent illustration"
                            className="w-80 rounded-2xl shadow-md border border-gray-200 hover:scale-105 transition"
                          />
                        </div>

            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="font-semibold mb-2">Place Value Chart</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ones → 10^0</li>
                <li>Tenths → 10^-1</li>
                <li>Hundredths → 10^-2</li>
                <li>Thousandths → 10^-3</li>
              </ul>
            </div>

            <p>
              <span className="font-semibold text-blue-700">Trick:</span><br />
              Left side of decimal → positive powers<br />
              Right side → negative powers
            </p>
          </div>
        </section>

        {/* ── EXAMPLES ───────────────── */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Worked Examples
          </h2>

          <div className="space-y-4">

            {/* Example 1 */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm">
              <p className="font-semibold text-blue-900">
                Example 1: Expand 1425.36
              </p>
              <p className="text-sm text-gray-700 mt-2">
                1425.36 = <br />
                (1 × 10^3) + (4 × 10^2) + (2 × 10^1) + (5 × 10^0) + <br />
                (3 × 10^-1) + (6 × 10^-2)
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm">
              <p className="font-semibold text-blue-900">
                Example 2: Find number from expansion
              </p>
              <p className="text-sm text-gray-700 mt-2">
                4 × 10^2 + 3 × 10^0 + 7 × 10^-2 <br /><br />
                Missing places → fill with zero <br />
                400 + 3 + 0.07 = <b>403.07</b>
              </p>
            </div>

          </div>
        </section>

        {/* ── COMMON MISTAKES ───────────────── */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-red-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 text-red-600">
            Common Mistakes to Avoid ❌
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Confusing decimal place positions</li>
            <li>Using wrong exponent for decimal digits</li>
            <li>Forgetting missing place values (zeros)</li>
          </ul>
        </section>
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-purple-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 text-purple-700">
             Prefer Video Learning? 🎥
           </h2>

           <p className="text-gray-700 mb-4">
           Watch this quick video to understand the concept better:
          </p>

          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/LvvA4kUAtSU"
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* ── BUTTON ───────────────── */}
        <button
          onClick={onStartAssessment}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition font-semibold shadow-lg hover:scale-105"
        >
          Start Assessment →
        </button>

      </div>
    </div>
  );
}