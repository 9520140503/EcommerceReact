import React, { useEffect, useState } from "react";
import appwriteProductService from "../Appwrite/config";
import appwriteCartService from "../Appwrite/cart"

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const created = await appwriteProductService.createProducts();
        console.log("Created products:", created);
      } catch (error) {
        console.log("Failed to add products:", error.message);
      }
    })();
  }, []);

  // 👉 fetch products once
  useEffect(() => {
    appwriteProductService
      .getProducts()
      .then((res) => setProducts(res.documents))
      .catch((error) => console.log("Error:", error.message));
  }, []);

  const addToCart = async(product) => {
    try {
    await appwriteCartService.addToCart(product)
    console.log("Product added successfully to cart")
    } catch (error) {
      console.log("Failed to add cart")
    }
  }

  if (products.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold text-pink-400">
          No product is available right now
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-white mb-10">
        Products / Accessories
      </h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-8 md:px-14 pb-10">
        {products.map((product) => (
          <div
            key={product.$id}
            className="flex flex-col border-2 border-purple-300 rounded-lg shadow-md hover:shadow-purple-400 transition"
          >
            {/* image */}
            <img
              src={product.featuredImage}
              alt={product.product_name}
              className="h-48 w-full object-cover rounded-t-lg"
            />

            {/* content */}
            <div className="flex flex-col flex-1 p-4">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">
                {product.product_name}
              </h3>

              <p className="text-sm text-gray-300 flex-1">{product.description}</p>

              {/* price + button */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-blue-300 text-lg font-bold">
                  ₹{product.price}
                </span>
                <button onClick={() => addToCart(product)} className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
