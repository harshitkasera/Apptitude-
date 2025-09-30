// import React from 'react'
// import './Style/Result.css'
// import { useLocation, useNavigate } from 'react-router-dom'

// const Result = () => {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { score, total } = location.state || { score: 0, total: 0 }

//   const percentage = ((score / total) * 100).toFixed(2)

//   return (
//     <div className='res-box'>
//       <div className='rr'>
//         <h1 className='rh1'>🎉 Quiz Finished!</h1>
//         <br />
//         <h2>Your Score: {score}/{total}</h2>
//         <p>Percentage: {percentage}%</p>

//         <p>
//           {percentage >= 80
//             ? "🔥 Excellent work!"
//             : percentage >= 50
//             ? "👍 Good job! Keep practicing."
//             : "📚 Keep learning, you'll get better!"}
//         </p>

//         <button className='r-btn' onClick={() => navigate('/Exam')}>
//           Try Again <i className="fa fa-exchange" aria-hidden="true"></i>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Result













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

