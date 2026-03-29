/**
 * ReadingPage4.jsx — Subtopic 4: Powers with Negative Exponents
 *
 * HOW TO USE THIS FILE:
 * 1. Replace the <h1> title with your subtopic 4 name.
 * 2. Fill in the reading content sections below (definitions, examples, rules, etc.)
 * 3. You can add images, tables, or any JSX content inside the sections.
 * 4. Do NOT change the prop name "subtopicIndex" passed to the button — the
 *    navigation logic depends on it.
 * 5. Do NOT remove the "Start Assessment" button or change its onClick.
 */

import Img1 from "../assets/subtopic4_img1.jpeg";

export default function ReadingPage4({ onStartAssessment }) {
  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          Subtopic 4: Expressing Small Numbers in Standard Form
        </h1>

        {/* IMAGE */}
        <div className="flex justify-center mt-4">
          <img
            src={Img1}
            alt="Negative exponent illustration"
            className="w-full rounded-2xl shadow-md border border-gray-200 hover:scale-105 transition"
          />
        </div>
        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">
            Concept Explanation
          </h2>

          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              Science deals with tiny things, like the diameter of a Red Blood Cell (0.000007 m). Writing all those zeros is tiring! We use Standard Form (k × 10^−n) to make it easier.
            </p>

            <p>
              How to convert:
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>1. Move the decimal right until there is exactly one non-zero digit to its left.</li>
              <li>2. Count the "jumps"—this count becomes your negative exponent.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Worked Examples
          </h2>

          <div className="space-y-4">

            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm">
              <p className="font-semibold text-blue-900">
                1. Express 0.000007 m in standard form:
              </p>
              <p className="text-sm text-gray-700 mt-2">
                • Move the decimal 6 places to the right to get 7.0.<br />
                • Result: 7 × 10^−6 m.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm">
              <p className="font-semibold text-blue-900">
                2. Express 0.0016 cm in standard form:
              </p>
              <p className="text-sm text-gray-700 mt-2">
                • Move the decimal 3 places right to get 1.6.<br />
                • Result: 1.6 × 10^−3 cm.
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
            <li>Using a positive exponent for small numbers instead of a negative exponent</li>
            <li>Not moving the decimal far enough to leave exactly one non-zero digit on the left</li>
            <li>Writing numbers like 35 × 10^-6 instead of proper standard form</li>
            <li>Miscalculating the number of decimal "jumps"</li>
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
              src="https://www.youtube.com/embed/yp3u3jzj0Ag"
             
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </section>

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