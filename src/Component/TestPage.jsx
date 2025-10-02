


import React from 'react'
import './Style/Test.css'
import { Link } from 'react-router-dom'

const TestPage = () => {
  return (
    <div className='test-box'>
      <div className='t'>
        <img className='tt' src='./Images/test-bg.jpg'></img>
      </div>
<div className='list'>
  <a href='https://www.indiabix.com/computer-science/computer-fundamentals/'>
    <p className='test-para'>Second Year</p>
  </a>
 <hr />

  <Link to='/exam'>
    <p className='test-para'>Third Year</p>
  </Link>


  {/* <a href='#'>
    <p className='test-para'>Final Year</p>
  </a> */}
  <br />
</div>

    </div>
  )
}

export default TestPage
