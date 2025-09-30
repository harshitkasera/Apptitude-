import React from "react"
import { Link } from "react-router-dom"
const Navbar = () => {
    
  
  return (
    <div>
       <nav className='header'>
        <Link to="/home">
          <img className='logo' src='./Images/logo.png' height="65vh" /></Link>
<Link to="/login">
         
          <button type="button" className="btn-primary" >
            Login<i className="fa fa-sign-in" aria-hidden="true"></i>
          </button>
</Link>

         
        </nav>
    </div>
  )
}

export default Navbar
