import React from 'react'
import "./Style/Home.css"
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()

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
      const res = await axios.post('https://apptitude-backend-a32l.onrender.com/api/user/saveUser',form)
      console.log(res);
      alert('user Created successfuly ')
      
        if (response.status === 200) {
      navigate("/login ");
    }
    }
    catch(error){
      console.log(error);
      alert('existing registered error')
    }
  }

  //login
   
  

  return (
    <div>
      <div className='outer'>
       

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
             
                Email:  <input className='inp' type="email" name='email' placeholder="enter the email"  onChange={handlechange}/><br /><br />
             
            
                Password: <input className='inp' name='password' type="password" placeholder="enter the password" onChange={handlechange} /><br /><br />
              
               
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
