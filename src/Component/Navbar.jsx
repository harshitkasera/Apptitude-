import React from "react"
import { Link } from "react-router-dom"
const Navbar = () => {
    
  
  return (
    <div>
       <nav className='header'>
        <a href="/home">
          <img className='logo' src='./Images/logo.png' height="65vh" /></a>
<Link to="/login">
         
          <button type="button" className="btn-primary" >
            Login
          </button>
</Link>

         
        </nav>
    </div>
  )
}

export default Navbar
