// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Style/Exam.css";

// const Exam = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [theme, setTheme] = useState("light"); // ✅ light / dark
//   const navigate = useNavigate();

//   // Fetch questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const res = await axios.get("https://apptitude-backend-a32l.onrender.com/api/question");
//       setQuestions(res.data);
//     };
//     fetchQuestions();
//   }, []);

//   // Toggle theme
//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme); // remember preference
//   };

//   // Load theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) setTheme(savedTheme);
//   }, []);
// // ✅ Handle Option Select
//   const handleOptionChange = (qIndex, optionIndex) => {
//     setAnswers({ ...answers, [qIndex]: optionIndex });
//   };
//  // ✅ Submit Exam
//   const handleSubmit = () => {
//     const total = questions.length;
//     let correctCount = 0;
//     questions.forEach((q, i) => {
//       if (q.correctAnswer === answers[i]) correctCount++;
//     });
//     const percentage = ((correctCount / total) * 100).toFixed(2);
//     const isPass = percentage >= 60;

//     const examHistory = JSON.parse(localStorage.getItem("examHistory")) || [];
//     examHistory.push({
//       date: new Date().toLocaleString(),
//       score: correctCount,
//       total,
//       percentage,
//       isPass,
//     });
//     localStorage.setItem("examHistory", JSON.stringify(examHistory));

//     navigate("/result", {
//       state: {
//         questions,
//         answers,
//       },
//     });
//   };

//   return (
//     <div className={`exam-container ${theme}`}>
//       <button className="theme-btn" onClick={toggleTheme}>
//         {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//       </button> 
//       <h1>🧠 Aptitude Test</h1>

//       {questions.map((q, qIndex) => (
//         <div className="question-card" key={qIndex}>
//           <h2 className="ques">Q{qIndex + 1}. {q.question}</h2>
//           {q.options.map((opt, optIndex) => (
//             <label key={optIndex} className="option-label">
//               <input
//                 type="radio"
//                 name={`question-${qIndex}`}
//                 value={optIndex}
//                 checked={answers[qIndex] === optIndex}
//                 onChange={() => handleOptionChange(qIndex, optIndex)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       ))}

//       <button className="submit-btn" onClick={handleSubmit}>Submit Exam ✅</button>
//     </div>
//   );
// };

// export default Exam;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style/Exam.css";

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [theme, setTheme] = useState("light");
  const [timeLeft, setTimeLeft] = useState(600); // ✅ 10 minutes = 600 seconds
  const navigate = useNavigate();

  // ✅ Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "https://apptitude-backend-a32l.onrender.com/api/question"
        );
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  // ✅ Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // ✅ Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // ✅ Handle Option Select
  const handleOptionChange = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  // ✅ Submit Exam (manual + auto)
  const handleSubmit = async() =>  {
    const total = questions.length;
    let correctCount = 0;

    questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) correctCount++;
    });

    const percentage = ((correctCount / total) * 100).toFixed(2);
    const isPass = percentage >= 60;

    const examHistory = JSON.parse(localStorage.getItem("examHistory")) || [];
    examHistory.push({
      date: new Date().toLocaleString(),
      score: correctCount,
      total,
      percentage,
      isPass,
    });
    localStorage.setItem("examHistory", JSON.stringify(examHistory));

    navigate("/result", {
      state: {
        questions,
        answers,
      },
    });

    //==================Mail

    // ✅ After calculating result (inside handleSubmit)
const resultData = {
  email: localStorage.getItem("userEmail"), // store earlier when user logs in / registers
  score: correctCount,
  total,
  percentage,
  isPass,
};

try {
  await axios.post("https://apptitude-backend-a32l.onrender.com/api/submit/:id", resultData);
  console.log("Result email sent successfully!");
} catch (err) {
  console.error("Error sending result email:", err);
}

  };

  // ✅ Timer logic (auto-submit when time ends)
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // Auto-submit when time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ Format time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
        <div className="question-card" key={qIndex}>
          <h2 className="ques">
            Q{qIndex + 1}. {q.question}
          </h2>
          {q.options.map((opt, optIndex) => (
            <label key={optIndex} className="option-label">
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={optIndex}
                checked={answers[qIndex] === optIndex}
                onChange={() => handleOptionChange(qIndex, optIndex)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Exam ✅
      </button>
    </div>
  );
};

export default Exam;
