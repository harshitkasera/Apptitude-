import React from 'react'
import { Link } from 'react-router-dom'

const Streem = () => {
  return (
    <div>

        <h1>Select your Streams</h1>
    <div className='boxc'>
     <div className="easy">
         <Link className='boxc-l' to="/testpage"><i class="fa fa-leaf" aria-hidden="true"></i>MERN Stack</Link>
     </div>
      <div className="medium">
         <Link className='boxc-l2' to="/python"><i class="fa fa-spinner" aria-hidden="true"></i>Python</Link>
      </div>
      <div className="hard">
         <Link className='boxc-l3' to="/datasc"><i class="fa fa-bolt" aria-hidden="true"></i>Data Science</Link>
      </div>
    </div>
    </div>
  )
}

export default Streem
