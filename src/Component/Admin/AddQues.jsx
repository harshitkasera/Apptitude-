import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "../Style/Addq.css";

const AddQues = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  // 🔹 Questions fetch karne ka function
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("https://apptitude-backend-a32l.onrender.com/api/question");
      setQuestions(res.data);
    } catch (err) {
      console.log("Error fetching questions", err);
    }
  };

  // 🔹 Page load hone par questions fetch karo
  useEffect(() => {
    fetchQuestions();
  }, []);

  // 🔹 Question add karne ka function
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1100/api/question", newQuestion);
      alert("✅ Question added successfully!");
      setNewQuestion({ text: "", options: ["", "", "", ""], correctAnswer: 0 });
      fetchQuestions(); // refresh list
    } catch (err) {
      console.log("Error adding question", err);
    }
  };

  // 🔹 Question delete karne ka function
  const handleDeleteQuestion = async (id) => {
    const confirmDelete = window.confirm("❗ Are you sure you want to delete this question?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:1100/api/question/${id}`);
      alert("🗑️ Question deleted successfully!");
      fetchQuestions(); // refresh after delete
    } catch (err) {
      console.log("Error deleting question", err);
    }
  };

  return (
    <div className="addques-container">
      <h2>📝 Add New Question</h2>
      <form className="addques-form" onSubmit={handleAddQuestion}>
        <input
          type="text"
          placeholder="Enter Question"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
          required
        />

        {newQuestion.options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => {
              const updated = [...newQuestion.options];
              updated[idx] = e.target.value;
              setNewQuestion({ ...newQuestion, options: updated });
            }}
            required
          />
        ))}

        <input
          type="number"
          placeholder="Correct Answer Index (0–3)"
          value={newQuestion.correctAnswer}
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              correctAnswer: parseInt(e.target.value),
            })
          }
          min="0"
          max="3"
          required
        />

        <button type="submit">Add Question</button>
      </form>

      <hr style={{ margin: "25px 0" }} />

      <h3 style={{ textAlign: "center" }}>📋 All Questions</h3>

      {questions.length === 0 ? (
        <p className="no-questions">📭 No Questions Found!</p>
      ) : (
        <ul className="question-list">
          {questions.map((q, index) => (
            <li key={q._id || index} className="question-item">
              <div>
                <strong>Q{index + 1}:</strong> {q.text}
                <br />
                <small>✅ Correct Option: {q.options[q.correctAnswer]}</small>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteQuestion(q._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddQues;
