import React from 'react'

import './Style/Test.css'
const TestPage = () => {
  
  return (
    <div className='test-box'>
      <div className='tt'>
        <div className='test-heading'>   
       <h4 className='test-h4'>Online Test</h4></div>
       <div className='list'>
       <a href='https://www.indiabix.com/computer-science/computer-fundamentals/'><p className='test-para'>Second Year</p></a><br></br><hr></hr>
       <a href='/exam'><p className='test-para'>Third Year</p></a><br></br><hr></hr>
      <a href='#'><p className='test-para'>Final Year</p></a><br></br>
      </div>
      </div>
    </div>
  )
}

export default TestPage
