import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./Exam.css";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { questions, answers } = state || {};

  if (!questions) return <h2>No data available 😢</h2>;

  let correctCount = 0;

  const resultData = questions.map((q, i) => {
    const isCorrect = q.correctAnswer === answers[i];
    if (isCorrect) correctCount++;
    return {
      question: q.question,
      selected: q.options[answers[i]] || "Not Answered",
      correct: q.options[q.correctAnswer],
      isCorrect,
    };
  });

  const total = questions.length;
  const percentage = ((correctCount / total) * 100).toFixed(2);
  const isPass = percentage >= 60;

  return (
    <div className="result-container">
      <h1>📊 Result</h1>
      <h2>
        Score: {correctCount} / {total} ({percentage}%)
      </h2>
      <h2 className={isPass ? "pass" : "fail"}>
        {isPass ? "🏆 Passed!" : "❌ Failed"}
      </h2>

      {/* ✅ Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* ✅ Correct / Wrong List */}
      <div className="result-list">
        {resultData.map((r, i) => (
          <div
            key={i}
            className={`result-item ${r.isCorrect ? "correct" : "wrong"}`}
          >
            <p>
              <strong>Q{i + 1}:</strong> {r.question}
            </p>
            <p>✅ Correct: {r.correct}</p>
            <p>
              📌 Your Answer:{" "}
              <span style={{ color: r.isCorrect ? "green" : "red" }}>
                {r.selected}
              </span>
            </p>
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={() => navigate("/")}>
        🔁 Retake Test
      </button>
    </div>
  );
};

export default Result;

