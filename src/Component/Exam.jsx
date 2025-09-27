import axios from 'axios'
import './Style/Exam.css'
import React, { useEffect, useState } from 'react'

const Exam = () => {
  const [que, setque] = useState([])
  const [answer, setanswer] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0) // ✅ ab hum isse current question track karenge

  const getDAta = async () => {
    const res = await axios.get('http://localhost:1100/api/question/')
    setque(res.data)
  }

  useEffect(() => {
    getDAta() 
  }, [])

  // ✅ radio select hone par answer state me store karenge
  const handleSelect = (questionId, selectedoption) => {
    setanswer(prev => ({
      ...prev,
      [questionId]: selectedoption
    }))
  }

  // ✅ Next button click par question badlega
  const handleNext = () => {
    if (currentIndex < que.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      alert("🎉 Quiz Finished! Ab submit logic likh sakte ho.")
      console.log("User answers:", answer)
    }
  }

  // ✅ current question
  const currentQuestion = que[currentIndex]

  return (
    <div className='exambox'>
      <div className='ee'>
        <div className='hq'>
          <h1 className='eh'>
            Question : {currentIndex + 1}/{que.length}
          </h1>
        </div>

        {/* Agar question load ho gaya hai tabhi show kare */}
        {currentQuestion && (
          <div key={currentQuestion._id || currentIndex}>
            <h3 className='eh3'>{currentQuestion.question}</h3>

            {currentQuestion.options.map((opt, j) => (
              <label key={j} className='option'>
                <input
                  type="radio"
                  name={`question-${currentIndex}`} // ✅ har question ke liye alag group
                  value={opt}
                  checked={answer[currentQuestion._id] === opt}
                  onChange={() => handleSelect(currentQuestion._id, opt)}
                />
                {opt}
              </label>
            ))}

            <button className='e-btn' onClick={handleNext}>
              {currentIndex === que.length - 1 ? "Finish" : "Next"}{" "}
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>

            {/* Debugging ke liye (optional) */}
            {console.log("Question:", currentQuestion.question)}
            {console.log("Options:", currentQuestion.options)}
            {console.log("Correct:", currentQuestion.correctAnswer)}
            {console.log("Selected Answers:", answer)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Exam
