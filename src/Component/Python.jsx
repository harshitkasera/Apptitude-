


import React from 'react'
import './Style/Test.css'
import { Link } from 'react-router-dom'

const Python = () => {
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
    <p className='test-para'>HTML/CSS</p>
  </Link>
 <hr />

  <a href='/category'>
    <p className='test-para'>Python</p>
  </a>
 <hr />

  <a href='/category'>
    <p className='test-para'>Django</p>
  </a>
 <hr />

  <a href='/category'>
    <p className='test-para'>Numpy</p>
  </a>
  <br />
</div>

    </div>
  )
}

export default Python
