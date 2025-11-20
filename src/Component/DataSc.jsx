


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
    <p className='test-para'>All Course</p>
  </a>
 <hr />

  <Link to='/category'>
    <p className='test-para'>Machine Learning</p>
  </Link>
 <hr />

  <a href='/category'>
    <p className='test-para'>PowerBI</p>
  </a>
 <hr />

  <a href='/category'>
    <p className='test-para'>Database Management</p>
  </a>
 <hr />

  <a href='/category'>
    <p className='test-para'>Data Visualization</p>
  </a>
  <br />
</div>

    </div>
  )
}

export default TestPage
