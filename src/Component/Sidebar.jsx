import React from 'react'
import './Style/Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './Auth';
const Sidebar = () => {
  
  const { logout } = useAuth();
  const navigate = useNavigate()
  const handleout = () => {
    logout();
    // navigate('/home')

  }
  return (
    <div className='sidebar'>
      <h1>Aptitude Test</h1>
      <Link className='side-link' to="/streem"><i class="fa fa-home" aria-hidden="true"></i>Home</Link>
      <div className='st'>
      <Link className='side-link' to="/profile">  <i className="fa fa-user" aria-hidden="true"></i>Profile</Link></div>
      <Link className='side-link' to="/dashboard"><i class="fa fa-tachometer" aria-hidden="true"></i>Dashboard</Link>
      <Link className='side-link' to="/testpage"><i className="fa fa-file-text" aria-hidden="true"></i>Test</Link>
      <Link className='side-link' to="/history"><i className="fa fa-history" aria-hidden="true"></i>History</Link>
      <Link className='side-link' to="/result"><i className="fa fa-certificate" aria-hidden="true"></i>Result</Link>
 <button className='logout-btn' onClick={handleout}><div className='icon'><i className="fa fa-sign-out" aria-hidden="true"></i></div><div className='name'>LogOut</div></button>
    </div>
  )
}

export default Sidebar


