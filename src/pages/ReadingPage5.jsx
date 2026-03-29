/**
 * ReadingPage5.jsx — Subtopic 5: Powers with Negative Exponents
 *
 * HOW TO USE THIS FILE:
 * 1. Replace the <h1> title with your subtopic 5 name.
 * 2. Fill in the reading content sections below (definitions, examples, rules, etc.)
 * 3. You can add images, tables, or any JSX content inside the sections.
 * 4. Do NOT change the prop name "subtopicIndex" passed to the button — the
 *    navigation logic depends on it.
 * 5. Do NOT remove the "Start Assessment" button or change its onClick.
 */


import Img1 from "../assets/subtopic5_img1.jpeg";
import Img2 from "../assets/subtopic5_img2.jpeg";

export default function ReadingPage5({ onStartAssessment }) {
  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          Subtopic 5: Comparing Very Large and Very Small Numbers
        </h1>

        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">
            Concept Explanation
          </h2>

          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              To compare these extreme numbers, we look at their powers of 10 first.
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>• Comparison: If the bases are similar, the number with the larger exponent is greater. (Note: −4 is larger than −5.)</li>
              <li>• Addition/Subtraction: You must convert them to have the exact same exponents before adding or subtracting.</li>
              <li>• Ratios: Divide one by the other to see "how many times" larger it is.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Worked Examples
          </h2>

          <div className="space-y-4">
            <div className="flex justify-center mt-4">
              <img
                src={Img1}
                alt="Negative exponent illustration"
                className="w-80 rounded-2xl shadow-md border border-gray-200 hover:scale-105 transition"
              />
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm">
              <p className="font-semibold text-blue-900">
                1. Compare the Sun’s diameter (1.4 × 10^9 m) to Earth’s (1.2756 × 10^7 m):
              </p>
              <p className="text-sm text-gray-700 mt-2">
                • Divide: (1.4×10^9) / (1.2756×10^7) ≈ (1.4/1.27) × 10^(9−7).<br />
                • 1.1 × 10^2 ≈ 110. So the Sun is about 100 times larger.
              </p>
            </div>

            <div className="flex justify-center mt-4">
              <img
                src={Img2}
                alt="Negative exponent illustration"
                className="w-80 rounded-2xl shadow-md border border-gray-200 hover:scale-105 transition"
              />
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-2xl shadow-sm">
              <p className="font-semibold text-blue-900">
                2. Total mass of Earth (5.97 × 10^24 kg) and Moon (7.35 × 10^22 kg):
              </p>
              <p className="text-sm text-gray-700 mt-2">
                • Convert Earth to 10^22: 597 × 10^22.<br />
                • Add: (597 + 7.35) × 10^22 = 604.35 × 10^22 kg.
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
            <li>Comparing only the numbers in front (like 9.5 vs 1.5) instead of looking at the powers of 10</li>
            <li>Thinking a more negative exponent means a larger number</li>
            <li>Adding or subtracting numbers without first making their exponents equal</li>
            <li>Adding exponents during addition instead of only during multiplication</li>
            <li>Dividing incorrectly when finding ratios (e.g., reversing numerator and denominator)</li>
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
              src="https://www.youtube.com/embed/g79uPGTwyzs"
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



