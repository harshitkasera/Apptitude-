import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <div>

        <h1>Test Mode</h1>
    <div className='boxc'>
     <div className="easy">
         <Link className='boxc-l' to="/Exam"><i class="fa fa-leaf" aria-hidden="true"></i>Easy</Link>
     </div>
      <div className="medium">
         <Link className='boxc-l2' to="/Exam"><i class="fa fa-spinner" aria-hidden="true"></i>Medium</Link>
      </div>
      <div className="hard">
         <Link className='boxc-l3' to="/Exam"><i class="fa fa-bolt" aria-hidden="true"></i>Hard</Link>
      </div>
    </div>
    </div>
  )
}

export default Category
