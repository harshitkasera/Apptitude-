
import React, { useState } from 'react'
import { useAuth } from './Auth'
import './Style/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { login } = useAuth();
  const navigate = useNavigate()

  const loginuser = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://apptitude-backend-a32l.onrender.com/api/user/loginuser', {
      email, password
    })
    console.log(response)
    console.log(response.status)
    console.log(email)
    console.log(password)

    const token = response.data.token
    // localStorage.setItem('token', token)
    localStorage.setItem("userId", response.data.user._id);


    console.log(token)
    login(response.data.token);

    if (response.status == 200) {
      navigate('/profile')
    }
  }
  return (
    <div className='zen'>


      <div className='first'>
        <form onSubmit={loginuser}>
       
            <div className="box">
              <span className='spa'>
              <h1 className="log">Log</h1><h1 id='in'>in</h1></span>
            </div>
            <div className="modal-body">
              <input className='inp' placeholder='Enter the Email' type='email' value={email} onChange={(e) => setemail(e.target.value)}></input><br></br>
              <input className='inp' placeholder='Enter the Password' type='password' value={password} onChange={(e) => setpassword(e.target.value)}></input><br></br>
              <span>
                Don’t have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Signup</a>
              </span>

            </div>
            <br></br>
            <div className="modal-footer">
              <button type='submit'>Login</button>
            </div>
         
        </form>
      </div>
        <div className='second'>
          <img className='l-img' src='./Images/bird.webp'/>
        </div>
    </div>

  )
}

export default Login
