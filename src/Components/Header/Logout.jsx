import React, { useState } from 'react'
import {logout} from "../../Store/authSlice"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth'
import { set } from 'react-hook-form'

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)

  const handleLogout = async() => {
    setLoading(true)
    try {
      await authService.logout()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log("Logout: ",error.message)
    } finally{
      setLoading(false)
    }
  }

  return (
      <button onClick={handleLogout}>
        {loading ? "Logging Out✨":"Logout"}
      </button>
  )
}

export default Logout