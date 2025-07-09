import React from 'react'

function Header() {
    const navItems = [
    {name:  'Home', path: '/'},
    {name: '{Products}', path: '/products'},
    {name: 'Checkout', path: '/checkout'},
    {name: 'Contact Us', path: '/contact'},
    {name: 'Login', path: '/login'},
    {name: 'Sign Up', path: '/signup'},
    {name: 'Logout', path: '/logout'},
  ]
  return (
    <div>Header</div>
  )
}

export default Header