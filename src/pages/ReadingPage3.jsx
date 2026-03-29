/**
 * ReadingPage3.jsx — Subtopic 3: Powers with Negative Exponents
 *
 * HOW TO USE THIS FILE:
 * 1. Replace the <h1> title with your subtopic 3 name.
 * 2. Fill in the reading content sections below (definitions, examples, rules, etc.)
 * 3. You can add images, tables, or any JSX content inside the sections.
 * 4. Do NOT change the prop name "subtopicIndex" passed to the button — the
 *    navigation logic depends on it.
 * 5. Do NOT remove the "Start Assessment" button or change its onClick.
 */

import Img3 from "../assets/subtopic3_img.jpg";

export default function ReadingPage3({ onStartAssessment }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        {/* ── TITLE ───────────────── */}
        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          Subtopic 3: Laws of Exponents
        </h1>

        {/* ── CONCEPT ───────────────── */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Concept Explanation
          </h2>

          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              The <b>same rules</b> you used for positive exponents also work for
              <b> negative integers</b>!
            </p>

            {/* IMAGE */}
            <div className="flex justify-center mt-4">
              <img
                src={Img3}
                alt="Exponent laws illustration"
                className="w-full max-w-lg rounded-2xl shadow-md border border-gray-200 hover:scale-105 transition"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl space-y-2">
              <p className="font-semibold">Key Laws:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <b>Product Law:</b> a^m × a^n = a^(m+n)
                </li>
                <li>
                  <b>Quotient Law:</b> a^m ÷ a^n = a^(m−n)
                </li>
                <li>
                  <b>Power of a Power:</b> (a^m)^n = a^(mn)
                </li>
                <li>
                  <b>Zero Power:</b> a^0 = 1 (a ≠ 0)
                </li>
              </ul>
            </div>

            <p className="text-blue-700 font-semibold">
              👉 Trick: Multiply → add powers | Divide → subtract powers
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
                Example 1: Simplify (−4)^5 × (−4)^−10
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Add the exponents → 5 + (−10) = −5 <br />
                Result: (−4)^−5 = 1/(−4)^5
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm">
              <p className="font-semibold text-blue-900">
                Example 2: Simplify 2^5 ÷ 2^−6
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Subtract exponents → 5 − (−6) = 11 <br />
                Result: 2^11
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
            <li>Adding exponents in division instead of subtracting</li>
            <li>Forgetting that minus minus becomes plus</li>
            <li>Thinking a^0 = 0 (it is actually 1)</li>
          </ul>
        </section>

        {/* ── VIDEO ───────────────── */}
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-purple-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 text-purple-700">
            Prefer Video Learning? 🎥
          </h2>

          <p className="text-gray-700 mb-4">
            Watch this quick video to understand exponent laws better:
          </p>

          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0Y4Er1gM2Ew"
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-green-100 hover:shadow-xl transition">
  <h2 className="text-xl font-semibold mb-4 text-green-800">
    Concepts Included (Revision)
  </h2>

  <div className="space-y-4">

    <div>
      <p className="font-semibold">Concept 1: Product law (same base → add powers)</p>
      <p className="text-sm text-gray-700">
        When multiplying powers with the same base, we add the exponents.
        <br />
        Example: 2^3 × 2^2 = 2^(3+2) = 2^5 = 32
      </p>
    </div>

    <div>
      <p className="font-semibold">Concept 2: Quotient law (same base → subtract powers)</p>
      <p className="text-sm text-gray-700">
        When dividing powers with the same base, we subtract the exponents.
        <br />
        Example: 5^4 ÷ 5^2 = 5^(4−2) = 5^2 = 25
      </p>
    </div>

    <div>
      <p className="font-semibold">Concept 3: Power of a power (multiply exponents)</p>
      <p className="text-sm text-gray-700">
        When a power is raised to another power, we multiply the exponents.
        <br />
        Example: (3^2)^3 = 3^(2×3) = 3^6 = 729
      </p>
    </div>

    <div>
      <p className="font-semibold">Concept 4: Zero exponent rule</p>
      <p className="text-sm text-gray-700">
        Any non-zero number raised to the power 0 is equal to 1.
        <br />
        Example: 7^0 = 1
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