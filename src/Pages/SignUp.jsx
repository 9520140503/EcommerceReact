import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../Components'; // Your custom input component
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../Appwrite/auth';
import {login} from "../Store/authSlice"


function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = async(data) => {
    setLoading(true)
    try {
      console.log(data)
      const userData = await authService.signup(data)
      if(userData){
        dispatch(login(userData))
        navigate('/')
      }
    }catch (error) {
      console.log("SignUp: ",error.message)
    }
    finally{() => setLoading(false)}
  };

  return (
    <div className="min-h-screen w-full py-10 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-center gap-12">
      
      {/* Left branding panel - only visible on lg and up */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/3 border-2 rounded-lg border-purple-400 p-8 h-[610px]">
        <h1 className="text-4xl font-bold text-white mb-4">Loome</h1>
        <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-transparent bg-clip-text">
          Shop Smart, Live Better
        </h2>
        <p className="mt-3 text-gray-300 text-center max-w-sm">
          Discover the latest deals on gadgets, fashion, home essentials & more.
        </p>
      </div>

      {/* Signup form */}
      <div className="w-full max-w-lg border-2 border-purple-400 rounded-lg p-6 lg:h-[610px]">
        <h2 className="text-center text-white text-2xl sm:text-3xl font-semibold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">

          <Input
            label="Name"
            type="text"
             placeholder="Your name"
            className="w-full rounded-lg p-2 bg-gray-700 text-white outline-none focus:ring-2 ring-blue-600"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg p-2 bg-gray-700 text-white outline-none focus:ring-2 ring-blue-600"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <Input
            label="Password"
            type="password"
             placeholder="Your Password"
            className="w-full rounded-lg p-2 bg-gray-700 text-white outline-none focus:ring-2 ring-blue-600"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition text-white font-medium px-6 py-2 rounded-md mt-4 mx-auto w-1/2"
          >
            {loading ? "Creating...": "Sign Up"}
          </button>

          <p className='text-center text-white'>Already have an account? <span><Link className='text-blue-300' to='/login'>Login</Link></span></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
