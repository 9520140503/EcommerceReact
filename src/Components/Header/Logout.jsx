import React, { useState } from 'react'
import {logout} from "../../Store/authSlice"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)

  const handleLogout = async() => {
    setLoading(true)
    try {
      await authService.logout()
      dispatch(logout())
      toast.success("Logout Successfully")
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.log("Logout: ",error.message)
    } finally{
      setLoading(false)
    }
  }

  return (
      <button onClick={handleLogout}>
        <ToastContainer  position="top-center" autoClose={1500} theme="dark"/>
        {loading ? "Logging Out✨":"Logout"}
      </button>
  )
}

export default Logout