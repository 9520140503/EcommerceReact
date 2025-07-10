import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    label, type="text", className, ...props
},ref) {
  const id = useId()
  return (
    <div>
        {label && <label
         htmlFor={id}
         className='text-xl text-blue-300'>
            {label}
        </label>}
        <input 
        type={type}
        className={`${className}`} 
        {...props}
        id={id}
        ref={ref}/>
    </div>
  )
})

export default Input