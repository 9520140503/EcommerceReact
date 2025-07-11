import React, { useEffect, useState } from 'react'
import appwriteProductService from '../Appwrite/config'

function Products() {
  const [products,setProduct] = useState([])

  useEffect(() => {
      try {
        const successfull = appwriteProductService.createProducts()
        console.log(successfull)
      } catch (error) {
        console.log("Failed to add produccts",error.message)
      }
  },[])

  useEffect(() => {
     appwriteProductService.getProducts()
     .then((res) => setProduct(res.documents))
     .catch((error) => console.log("Error:",error.message))
  },[])

  // if(products.length === 0){
  //   return <div>
  //     <h2>No Product is available right now</h2>
  //   </div>
  // }

  return (
    <div className='w-full flex flex-col items-center min-h-screen'>
      <h1 className='text-xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-white mb-10'>Products/Accessories</h1>
      <div className=' w-full min-h-screen grid grid-cols-1 sm:grid-cols-2 md :grid-cols-4 lg:grid-cols-5 py-5 px-6 sm:px-8 md:px-14 gap-4 sm:gap-8 md:gap-10'>
          {products.map((product) => (
            <div className='border-2 border-purple-300 py-10 px-5 h-90 rounded-lg shadow-lg shadow-green-400' key={product.$id}>
              <img 
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" 
              alt={product.product_name} 
              width={340}
              className='mb-8'/>
              <h3 className='text-white bg-red-300 my-5 mb-12 text-md sm:text-lg'>{product.product_name}</h3>
              <h4 className='text-red-300 my-5'>{product.description}</h4>
              <p className='text-blue-300 text-lg sm:text-xl mb-2'>₹{product.price}</p>
              <button className='text-white bg-green-400 p-1 my-2 rounded-lg '>
                Add To Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Products