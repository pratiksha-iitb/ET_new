const KEY = "its_progress";

export function loadProgress(studentId) {
  const data = JSON.parse(localStorage.getItem(KEY) || "{}");

  if (!data[studentId]) {
    data[studentId] = {
      subtopics: {
        1: { score: 0, completed: false },
        2: { score: 0, completed: false },
        3: { score: 0, completed: false },
        4: { score: 0, completed: false },
        5: { score: 0, completed: false },
      },
      overallScore: 0,
    };
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  return data[studentId];
}

export function saveProgress(studentId, progress) {
  const data = JSON.parse(localStorage.getItem(KEY) || "{}");
  data[studentId] = progress;
  localStorage.setItem(KEY, JSON.stringify(data));
}