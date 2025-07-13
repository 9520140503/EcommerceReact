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
            className="flex flex-col border-2 border-purple-300 rounded-lg shadow-md shadow-purple-400 transition"
          >
            {/* image */}
            <img
              src="data:image/jpeg;base64,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"
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
                <button onClick={() => addToCart(product)} className="bg-green-500 hover:bg-green-600 text-white text-sm px-1 py-1 rounded-lg">
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
