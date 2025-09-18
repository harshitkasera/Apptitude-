import React from 'react'
import Home from './Component/Home'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './Component/Sidebar'
import { useAuth } from './Component/Auth'
const App = () => {
  const {isloggedIn, loading}  = useAuth();
  if(loading){
     return <div style={{textAlign:"center", marginTop:"50px"}}>Loading...</div>;
  }
  return (
    <div>
      
 
      <Routes>
        {isloggedIn ? (
          <Route path='*' element={<Sidebar/>}></Route>
        ): (<Route path='*' element={<Home/>}></Route>
        )}
      </Routes>

    
    </div>
  )
}

export default App
