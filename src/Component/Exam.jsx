// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './Style/Exam.css'
// import { useNavigate } from "react-router-dom";

// const Exam = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [answer, setAnswer] = useState({}); // user ke selected answers
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [newQuestion, setNewQuestion] = useState({
//     text: "",
//     options: ["", "", "", ""],
//     correctAnswer: 0,
//   });

//   // ✅ Questions fetch karo jab component load ho
//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const res = await axios.get("http://localhost:1100/api/question");
//       setQuestions(res.data);
//     } catch (err) {
//       console.log("Error fetching questions:", err);
//     }
//   };

//   // ✅ Jab user option select kare
//   const handleSelect = (questionId, selectedIndex) => {
//     setAnswer((prev) => ({
//       ...prev,
//       [questionId]: selectedIndex,
//     }));
//   };

//   // ✅ Next button click par next question ya result page
//   const handleNext = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       const finalScore = calculateResult();
//       navigate("/result", {
//         state: { score: finalScore, total: questions.length },
//       });
//     }
//   };

//   // ✅ Previous Question
//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // ✅ Score calculate karo
//   const calculateResult = () => {
//     let score = 0;
//     questions.forEach((q) => {
//       const selectedIndex = answer[q._id];
//       const selectedValue = q.options[selectedIndex];
//       const correctValue = q.options[q.correctAnswer];
//       if (selectedValue === correctValue) {
//         score++;
//       }
//          console.log("✅ Q:", q.question)
//     console.log("Selected:", selectedValue)
//     console.log("Correct:", correctValue)
//     });
//     return score;
//   };

//   // ✅ New Question Add karo
//   const handleAddQuestion = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:1100/api/question", newQuestion);
//       alert("✅ Question Added!");
//       setNewQuestion({ text: "", options: ["", "", "", ""], correctAnswer: 0 });
//       fetchQuestions(); // refresh questions
//     } catch (err) {
//       console.log("Error adding question:", err);
//     }
//   };

//   if (questions.length === 0) {
//     return <h2 style={{ textAlign: "center" }}>📭 No Questions Found!</h2>;
//   }

//   const currentQ = questions[currentIndex];

//   return (
//     <div className="exambox">
//       <div className="ee">
//       <h2 className="eh">
//         Question {currentIndex + 1} / {questions.length}
//       </h2>
//       <h3 className="eh3">{currentQ.text || currentQ.question}</h3>

//       {/* ✅ Options */}
//       {currentQ.options.map((option, index) => (
//         <div key={index} className="option">
//           <label>
//             <input
//               type="radio"
//               name={`question-${currentIndex}`}
//               checked={answer[currentQ._id] === index}
//               onChange={() => handleSelect(currentQ._id, index)}
//             />
//             {option}
//           </label>
//         </div>
//       ))}

//       {/* ✅ Buttons */}
//       <span>
//       <button  className="e-btnn" 
//         onClick={handlePrev}
//         disabled={currentIndex === 0}
//         style={{ marginRight: "10px" }}
//       >
//         <i className="fa fa-arrow-left" aria-hidden="true"></i> Previous
//       </button>
//       <button className="e-btn" onClick={handleNext}>
//         {currentIndex === questions.length - 1 ? "Finish" : "Next"}<i class="fa fa-arrow-right" aria-hidden="true"></i>
//       </button>
// </span>
//       <hr style={{ margin: "30px 0" }} />

//       {/* ✅ Add New Question Section */}
//       <h2>Add New Question</h2>
//       <form onSubmit={handleAddQuestion}>
//         <input
//           type="text"
//           placeholder="Question text"
//           value={newQuestion.text}
//           onChange={(e) =>
//             setNewQuestion({ ...newQuestion, text: e.target.value })
//           }
//           required
//           style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//         />

//         {newQuestion.options.map((opt, idx) => (
//           <input
//             key={idx}
//             type="text"
//             placeholder={`Option ${idx + 1}`}
//             value={opt}
//             onChange={(e) => {
//               const updated = [...newQuestion.options];
//               updated[idx] = e.target.value;
//               setNewQuestion({ ...newQuestion, options: updated });
//             }}
//             required
//             style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//           />
//         ))}

//         <input
//           type="number"
//           placeholder="Correct Answer Index (0-3)"
//           value={newQuestion.correctAnswer}
//           onChange={(e) =>
//             setNewQuestion({
//               ...newQuestion,
//               correctAnswer: parseInt(e.target.value),
//             })
//           }
//           min="0"
//           max="3"
//           required
//           style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//         />

//         <button type="submit">Add Question</button>
    
//       </form>
//     </div></div>
//   );
// };

// export default Exam;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import "./Exam.css";

// const Exam = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const navigate = useNavigate();

//   // ✅ Fetch Questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const res = await axios.get("http://localhost:1100/api/question");
//       setQuestions(res.data);
//     };
//     fetchQuestions();
//   }, []);

//   // ✅ Handle Option Select
//   const handleOptionChange = (qIndex, optionIndex) => {
//     setAnswers({ ...answers, [qIndex]: optionIndex });
//   };

//   // ✅ Submit Exam
//   const handleSubmit = () => {
//     const total = questions.length
//     let correctCount = 0;

//     questions.forEach((q,i)=>{
//       if(q.correctAnswer === answers[i]) correctCount++
//     })
//     const percentage = ((correctCount /total)*100).toFixed(2)
//     const isPass = percentage >=60;

//     const examHistory = JSON.parse(localStorage.getItem("examHistory")) || [];
//     examHistory.push({
//       date: new Date().toLocaleString(),
//       score: correctCount,
//       total,
//       percentage,
//       isPass,
//     })
//     localStorage.setItem("examHistory", JSON.stringify(examHistory))
//     //Navigate to Result
//     navigate(
//       "/result", {
//       state: {
//         questions,
//         answers,
//       },
//     });
//   };

//   return (
//     <div className="exam-container">
//       <h1>🧠 Aptitude Test</h1>
//       {questions.map((q, qIndex) => (
//         <div className="question-card" key={qIndex}>
//           <h2>
//             Q{qIndex + 1}. {q.question}
//           </h2>
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

//       <button className="submit-btn" onClick={handleSubmit}>
//         Submit Exam ✅
//       </button>
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
  const [theme, setTheme] = useState("light"); // ✅ light / dark
  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get("http://localhost:1100/api/question");
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // remember preference
  };

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const handleOptionChange = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const handleSubmit = () => {
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
  };

  return (
    <div className={`exam-container ${theme}`}>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <h1>🧠 Aptitude Test</h1>

      {questions.map((q, qIndex) => (
        <div className="question-card" key={qIndex}>
          <h2>Q{qIndex + 1}. {q.question}</h2>
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

      <button className="submit-btn" onClick={handleSubmit}>Submit Exam ✅</button>
    </div>
  );
};

export default Exam;
