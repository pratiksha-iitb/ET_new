/**
 * AuthPage.jsx
 * Mock auth — persists users to localStorage so accounts survive page reload.
 */

import { useState } from "react";

const STORAGE_KEY = "its_users";

// ── Hardcoded demo accounts (always available) ────────────────────────────
const DEFAULT_USERS = {
  "student_1": { name: "Sujay",  password: "pass123" },
  "student_2": { name: "Pratiksha", password: "pass123" },
  "student_3": { name: "Adrika", password: "pass123" },
};

// ── Read user DB from localStorage, merged with defaults ──────────────────
function loadUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    return { ...DEFAULT_USERS, ...parsed }; // defaults + any signups
  } catch {
    return { ...DEFAULT_USERS };
  }
}

// ── Save a new user to localStorage ──────────────────────────────────────
function saveUser(studentId, name, password) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const existing = stored ? JSON.parse(stored) : {};
    existing[studentId] = { name, password };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    console.error("Could not save user to localStorage");
  }
}

export default function AuthPage({ onAuth }) {
  const [mode, setMode]         = useState("login");
  const [studentId, setStudentId] = useState("");
  const [name, setName]         = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise(r => setTimeout(r, 300));

    const users = loadUsers();
    const user  = users[studentId.trim()];

    if (!user || user.password !== password) {
      setError("Invalid student ID or password.");
      setLoading(false);
      return;
    }

    sessionStorage.setItem("its_student_id",   studentId.trim());
    sessionStorage.setItem("its_student_name", user.name);

    setLoading(false);
    onAuth({ studentId: studentId.trim(), studentName: user.name });
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (!studentId.trim() || !name.trim() || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 300));

    const users = loadUsers();
    if (users[studentId.trim()]) {
      setError("Student ID already exists. Please log in instead.");
      setLoading(false);
      return;
    }

    // Persist to localStorage so it survives page reload
    saveUser(studentId.trim(), name.trim(), password);

    sessionStorage.setItem("its_student_id",   studentId.trim());
    sessionStorage.setItem("its_student_name", name.trim());

    setLoading(false);
    onAuth({ studentId: studentId.trim(), studentName: name.trim() });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center space-y-1">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
            Power Play 🚀
          </h1>
          <p className="text-gray-500 text-sm">Exponents and Powers — Grade 8</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-blue-100 space-y-5">

          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            {["login", "signup"].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2 text-sm font-semibold transition
                  ${mode === m ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                placeholder="e.g. student_4"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400">
            Demo accounts: student_1 / student_2 / student_3 &nbsp;|&nbsp; password: pass123
          </p>
        </div>
      </div>
    </div>
  );
}
