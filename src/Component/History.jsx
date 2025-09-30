import React, { useEffect, useState } from 'react'
import './Style/History.css'
import { useNavigate } from 'react-router-dom'
const History = () => {
  const [history, sethstory]=useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem("examHistory")) || [];
    sethstory(stored.reverse())
  },[])
  if(history.length === 0) return <h2>📭 No Exam History Found!</h2>
  return (
    <div className='his-box'>
        <div className='hh'>
<h1>📚 Exam History</h1>
      {history.map((exam, index) => (
        <div key={index} className="question-card">
          <p><strong>Date:</strong> {exam.date}</p>
          <p><strong>Score:</strong> {exam.score} / {exam.total} ({exam.percentage}%)</p>
          <p><strong>Result:</strong> <span style={{ color: exam.isPass ? "green" : "red" }}>
            {exam.isPass ? "Passed ✅" : "Failed ❌"}
          </span></p>
        </div>
      ))}

      <button className="submit-btn" onClick={() => navigate("/")}>
        🔙 Back to Exam
      </button>
        </div>
    </div>
  )
}

export default History
