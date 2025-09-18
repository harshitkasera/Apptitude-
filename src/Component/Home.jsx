import React from 'react'
import "./Style/Home.css"
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from './Auth'
import {useNavigate} from 'react-router-dom'
const Home = () => {
  //signup
  const[form, setform]=useState({
    name: '',
    email: '',
    password: ''
  })
  const handlechange = (e)=>{
    setform({...form,[e.target.name]: e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:1100/api/user/saveUser',form)
      console.log(res);
      alert('user Created successfuly ')
    }
    catch(error){
      console.log(error);
      alert('existing registered error')
    }
  }

  //login
   
  const [email, setemail]= useState('')
  const [password, setpassword]=useState('')
 const {login} = useAuth();
 const navigate = useNavigate()

  const loginuser = async(e)=>{
    e.preventDefault();
    const response = await axios.post('http://localhost:1100/api/user/loginuser',{
      email, password
    })
    console.log(response)
    console.log(response.status)
    console.log(email)
    console.log(password)

    const token = response.data.token
    localStorage.setItem('token', token)
    login(token)
    console.log(token)

    if(response.status==200){
      navigate('/sidebar')
    }
  }

  return (
    <div>
      <div className='outer'>
        <nav className='header'>
          <img className='logo' src='./Images/logo.png' height="65vh" />


          <button type="button" className="btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Login
          </button>


          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <form onSubmit={loginuser}>
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <input className='inp' placeholder='Enter the Email' type='email' value={email} onChange={(e)=> setemail(e.target.value)}></input><br></br>
                  <input className='inp' placeholder='Enter the Password' type='password' value={password} onChange={(e)=> setpassword(e.target.value)}></input><br></br>
                 <span>
  Don’t have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Signup</a>
</span>

                </div>
                <div className="modal-footer">
                  <button type='submit' className="btn">Login</button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </nav>

        <div className='content'>
          <h1>Why Choose Us?</h1>
          <p>Our Aptitude Platform is designed to help students from 2nd year to Final year prepare for placements, competitive exams, and skill tests. With categorized questions from Easy, Medium, and Tough levels, you can track your progress and improve step by step.</p>
        </div>

        <div className='feature'>
          <p>
            "Features That Help You Succeed"
            <br></br>


            ✅ Topic-wise Aptitude & Reasoning Questions<br></br>
            ✅ Easy, Medium & Tough Level Practice<br></br>
            ✅ Mock Tests with Real-Time Evaluation<br></br>
            ✅ Track Your Progress with Detailed Reports<br></br>
            ✅ User-Friendly Interface for Seamless Learning</p>
        </div>
        <div className='motiv'>

          <p>Don’t just practice—master the art of problem-solving!</p>
        </div>


        <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal">
          <button type="button" className="btn">
            Register Now
          </button>
        </a>


        <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div  className="modal-content">
              <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h1 className="modal-title fs-5">Sign Up</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <br />
               
                Full name:  <input className='inp' type="text" name='name' placeholder="enter the name"  onChange={handlechange} /><br /><br />
                <br />
                Email:  <input className='inp' type="email" name='email' placeholder="enter the email"  onChange={handlechange}/><br /><br />
                <br />
                {/* Username: <input className='inp' type="text" placeholder="enter the username" onChange={handlechange} /><br /><br />
                <br /> */}
                Password: <input className='inp' name='password' type="password" placeholder="enter the password" onChange={handlechange} /><br /><br />
                <br />
                {/* Repeat Password <input className='inp' type="password" placeholder="repeat password"  onChange={handlechange} /><br /><br />
                <div className="checkbox">
                  <input type="checkbox" /> I agree to the Terms & Privacy
                </div> */}
              </div>
              <div className="modal-footer">
                <button type='submit' className="btn btn-primary">Sign Up</button>
                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
