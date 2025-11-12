
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style/Exam.css";

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});      // { 0: 2, 1: 0, ... } -> stores option index (Number)
  const [theme, setTheme] = useState("light");
  const [timeLeft, setTimeLeft] = useState(600);   // optional timer
  const navigate = useNavigate();
   
  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("https://apptitude-backend-a32l.onrender.com/api/question");
        setQuestions(res.data); // ensure each question has: _id, question, options[], correctAnswer (Number)
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
     const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    fetchQuestions();
  }, []);

  // theme load
 

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // select option
  const handleOptionChange = (qIndex, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  // check whether all questions answered
  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  // Finish Exam -> compute score, save history, send summary mail, navigate
  const handleFinishExam = async () => {
    if (!allAnswered) {
      return alert("Please answer all questions before submitting.");
    }

    const total = questions.length;
    let correctCount = 0;

    questions.forEach((q, i) => {
      // compare numeric indices; ensure types consistent
      if (Number(q.correctAnswer) === Number(answers[i])) correctCount++;
    });

    const percentage = ((correctCount / total) * 100).toFixed(2);
    const isPass = Number(percentage) >= 60;

    // save local exam history
    const examHistory = JSON.parse(localStorage.getItem("examHistory")) || [];
    examHistory.push({
      date: new Date().toLocaleString(),
      score: correctCount,
      total,
      percentage,
      isPass,
    });
    localStorage.setItem("examHistory", JSON.stringify(examHistory));

    // prepare payload for backend
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const payload = {
      email: localStorage.getItem("userEmail"),
      name: user.name || "",
      score: correctCount,
      total,
      percentage,
      isPass,
    };

    try {
      // send final summary email
      const res = await axios.post("https://apptitude-backend-a32l.onrender.com/api/user/send-result", payload)
      console.log("Summary mail response:", res.data);
      alert("Exam submitted. Result email sent!");
    } catch (err) { 
      console.error("Error sending summary email:", err);
      alert("Exam submitted, but error sending email. Check console.");
    }

    // navigate to result screen and pass data
    navigate("/result", { state: { questions, answers } });
  };




  // optional timer auto-submit 
  useEffect(() => {
    if (timeLeft <= 0) {
      if (allAnswered) handleFinishExam();
      return;
    }
    const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, allAnswered]); // eslint-disable-line

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  };

  return (
    <div className={`exam-container ${theme}`}>
      <div className="exam-header">
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <div className={`timer ${timeLeft <= 60 ? "danger" : ""}`}>
          ⏰ Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <h1>🧠 Aptitude Test</h1>

      {questions.map((q, qIndex) => (
        <div className="question-card" key={q._id || qIndex}>
          <h2>Q{qIndex + 1}. {q.question}</h2>
          {q.options.map((opt, optIndex) => (
            <label key={optIndex} className="option-label">
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={optIndex}
                checked={Number(answers[qIndex]) === optIndex}
                onChange={() => handleOptionChange(qIndex, optIndex)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        className="submit-btn final"
        onClick={handleFinishExam}
        disabled={!allAnswered}
      >
        Finish Exam & Send Result
      </button>
    </div>
  );
};

export default Exam;
