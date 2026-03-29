/**
 * ReadingPage1.jsx — Subtopic 1: Powers with Negative Exponents
 *
 * HOW TO USE THIS FILE:
 * 1. Replace the <h1> title with your subtopic 1 name.
 * 2. Fill in the reading content sections below (definitions, examples, rules, etc.)
 * 3. You can add images, tables, or any JSX content inside the sections.
 * 4. Do NOT change the prop name "subtopicIndex" passed to the button — the
 *    navigation logic depends on it.
 * 5. Do NOT remove the "Start Assessment" button or change its onClick.
 */

import Img1 from "../assets/subtopic1_img.jpeg";

export default function ReadingPage1({ onStartAssessment }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        {/* ── TITLE ───────────────── */}
        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          Subtopic 1: Powers with Negative Exponents
        </h1>

        {/* ── INTRODUCTION ───────────────── */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">
            Concept Explanation
          </h2>

          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              Imagine a wizard named <b>Exponentius 🧙‍♂️</b><br />
              He has a magic rule:
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>Positive powers → make numbers grow 📈</li>
              <li>Negative powers → make numbers shrink (divide) 📉</li>
            </ul>

            <p>
              So when you see: <b>2^-3</b><br />
              The wizard says:
              <br />
              <span className="font-semibold text-blue-700">
                "Flip it and divide!"
              </span>
            </p>

            {/* IMAGE */}
            <div className="flex justify-center mt-4">
              <img
                src={Img1}
                alt="Negative exponent illustration"
                className="w-64 rounded-2xl shadow-md border border-gray-200 hover:scale-105 transition"
              />
            </div>
          </div>
        </section>

        {/* ── KEY RULE ───────────────── */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">
            Key Rule
          </h2>

          <p className="text-lg font-mono bg-gray-100 p-4 rounded-xl text-center shadow-inner">
            a^-m = 1 / a^m
          </p>

          <p className="text-gray-700 mt-3">
            The <b>"Flip Trick"</b>: To make an exponent positive, move the base to the other side of the fraction.
          </p>
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
                Example 1: Evaluate 2^-3
              </p>
              <p className="text-sm text-gray-700 mt-2">
                2^-3 = 1 / 2^3 <br />
                2^3 = 2 × 2 × 2 = 8 <br />
                <span className="font-semibold">Final Answer = 1/8</span>
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm">
              <p className="font-semibold text-blue-900">
                Example 2: Find multiplicative inverse of 10^-5
              </p>
              <p className="text-sm text-gray-700 mt-2">
                The inverse of a^-m is a^m <br />
                So, inverse of 10^-5 = 10^5 = 100000
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
            <li>Thinking negative exponent makes number negative</li>
            <li>Forgetting to take reciprocal (flip)</li>
            <li>Multiplying base with exponent (2 × -3) instead of repeated multiplication</li>
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
              src="https://www.youtube.com/embed/wSracfsnFI8"
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        {/* ── ADDITIONAL CONCEPTS ───────────────── */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-green-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Concepts Included (Revision)
          </h2>

          <div className="space-y-4">

            <div>
              <p className="font-semibold">Concept 1: Negative exponent represents reciprocal</p>
              <p className="text-sm text-gray-700">
                A negative exponent means we take the reciprocal (flip the number) and make the exponent positive.
                <br />
                Example: 5^-2 = 1 / 5^2 = 1/25
              </p>
            </div>

            <div>
              <p className="font-semibold">Concept 2: Negative exponents apply to fractions</p>
              <p className="text-sm text-gray-700">
                When a fraction has a negative exponent, we invert the fraction and make the exponent positive.
                <br />
                Example: (1/2)^-3 = (2/1)^3 = 8
              </p>
            </div>

            <div>
              <p className="font-semibold">Concept 3: Moving across fraction changes sign</p>
              <p className="text-sm text-gray-700">
                When a term moves from numerator to denominator (or vice versa), the exponent sign changes.
                <br />
                Example: 3^-2 = 1 / 3^2 = 1/9
              </p>
            </div>

            <div>
              <p className="font-semibold">Concept 4: Negative exponent ≠ negative value</p>
              <p className="text-sm text-gray-700">
                A negative exponent only changes position (reciprocal), not the sign of the number.
                <br />
                Example: 2^-2 = 1/4 (not −4)
              </p>
            </div>

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