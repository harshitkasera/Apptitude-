import React from 'react'
import './Style/Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './Auth';
const Sidebar = () => {
  
  const { logout } = useAuth();
  const navigate = useNavigate()
  const handleout = () => {
    logout();
    navigate('/home')

  }
  return (
    <div className='sidebar'>
      <h1>Aptitude Test</h1>
      <Link className='side-link' to="/profile">Profile</Link>
      <Link className='side-link' to="/dashboard">Dashboard</Link>
      <Link className='side-link' to="/testpage">Test</Link>
      <Link className='side-link' to="/history">History</Link>
      <Link className='side-link' to="/result">Result</Link>
 <button className='logout-btn' onClick={handleout}>LogOut</button>
    </div>
  )
}

export default Sidebar


