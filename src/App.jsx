import React from 'react'
import Home from './Component/Home'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './Component/Sidebar'
import { useAuth } from './Component/Auth'
import Navbar from './Component/Navbar'
import Profile from './Component/Profile'
import Dashboard from './Component/Dashboard'
import History from './Component/History'
import Result from './Component/Result'
import Login from './Component/Login'
import { Navigate } from 'react-router-dom'
import TestPage from './Component/TestPage'
import Exam from './Component/Exam'
const App = () => {
  const {isloggedIn, loading}  = useAuth();
  if(loading){
     return <div style={{textAlign:"center", marginTop:"50px"}}>Loading...</div>;
  }
  return (
    <div>
      {isloggedIn ? <Sidebar/>:<Navbar/>}
 
      <Routes>


    <Route
    path="/home"
    element={isloggedIn ? <Navigate to="/profile" /> : <Home />}/>

  <Route
    path="/profile"
    element={isloggedIn ? <Profile /> : <Navigate to="/home" />}/>

 
  <Route path="*" element={<Navigate to={isloggedIn ? "/profile" : "/home"} />} />
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/profile' element={<Profile/>}></Route>
  <Route path='/dashboard' element={<Dashboard/>}></Route>
  <Route path='/testpage' element={<TestPage/>}></Route>
  <Route path='/history' element={<History/>}></Route>
  <Route path='/result' element={<Result/>}></Route>
  <Route path='/exam' element={<Exam/>}></Route>
      </Routes> 

    
    </div>
  )
}

export default App
