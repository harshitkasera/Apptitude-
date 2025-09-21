import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
const Authcontext = createContext()

export const Authprovider = ({children})=>{
    const [isloggedIn, setIsloggedIn]=useState(false)
    const [loading, setLoading]= useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        setIsloggedIn(!!token)
        setLoading(false)
    },[])

    //login function

    const login = (token)=>{
        setIsloggedIn(true)
        localStorage.setItem('token', token)
        navigate('/profile')
    }

    //logout function
    const logout = ()=>{
        setIsloggedIn(false)
        localStorage.removeItem('token')
        navigate('/home')
    }
    return(
        <Authcontext.Provider value={{isloggedIn, login, logout, loading}}>
            {children}
        </Authcontext.Provider>
    )
}
export const useAuth = ()=> useContext(Authcontext)