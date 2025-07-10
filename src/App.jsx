import React, { useState,useEffect } from 'react'
import authService from "./Appwrite/auth"
import { useDispatch } from 'react-redux'
import {login,logout} from "./Store/authSlice"
import {Header,Footer, Loading } from './Components'
import { Outlet } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return ( !loading ? 
        <div>
          <Header/>
          <main className='min-h-screen w-full bg-gradient-to-b from-blue-900 via-blue-950 to-black py-24'>
            <Outlet/>
          </main>
          <Footer/>
        </div>
        :
        <div>
           <Header/>
            <main className='min-h-screen w-full bg-gradient-to-b from-blue-900 via-blue-950 to-black flex justify-center items-center mx-auto'>
            <Loading/>
          </main>
          <Footer/>
        </div>
          
  )
}

export default App