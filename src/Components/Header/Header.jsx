import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logout from "./Logout"

function Header() {
    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
    {name:  'Home', slug: '/',status:true},
    {name: 'Products', slug: '/products',status:authStatus},
    {name: 'Cart', slug: '/cart',status:authStatus},
    {name: 'Contact Us', slug: '/contact',status:!authStatus},
    {name: 'Login', slug: '/login',status:!authStatus},
    {name: 'Sign Up', slug: '/signup',status:!authStatus},
  ]

  
  return (
    <div>
        <nav className='flex items-center justify-between w-full py-5 px-2 sm:px-6 md:px-20 bg-blue-950 fixed z-50 left-0 shadow-lg shadow-purple-300'>
          <Link to='/'>
          <h2 className='text-xl sm:text-3xl md:4xl text-white font-medium '>Loome</h2>
          </Link>
          <ul className=' flex items-center sm:text-lg md:text-xl gap-2 sm:gap-4 md:gap-16 text-blue-300'>
            {navItems.map((item) => (
              item.status ?
              <li 
              key={item.slug}
              className='hover:bg-purple-800 transition duration-500 p-1 rounded'>
                <Link to={item.slug}>
                  {item.name}
                </Link>
              </li> : null
            ))}
            {authStatus && 
            <li className='hover:bg-purple-800 transition duration-500 p-1 rounded'>
              <Logout/>
            </li>
            }
           
          </ul>
        </nav>
    </div>
  )
}

export default Header