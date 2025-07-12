import React, { useEffect, useState } from "react";
import appwriteCartService from "../Appwrite/cart";

function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items once on mount
  useEffect(() => {
    (async () => {
      try {
        const cart = await appwriteCartService.getCartItemsByUserId();
        if (cart) {
          const parsedItems = JSON.parse(cart.items);
          setItems(parsedItems);
          setTotal(cart.total || 0);
        }
      } catch (error) {
        console.log("Failed to fetch cart:", error.message);
      }
    })();
  }, []);

  const remove = async (slug) => {
    try {
       await appwriteCartService.removeCartItem(slug)
      const updatedItems = await appwriteCartService.getCartItemsByUserId()
      if(updatedItems){
        const cartitems = JSON.parse(updatedItems.items)
        setItems(cartitems)
        setTotal(updatedItems.total || 0)
      }else{
         setItems([]);
        setTotal(0);
      }
    } catch (error) {
        console.log("Failed to remove item:", error.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold text-pink-400">
          No product is available in cart right now.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen text-white">
      <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-white mb-8">
        Items in Cart 🛒
      </h1>

      <p className="mb-6 text-lg text-blue-300 font-medium">Total: ₹{total}</p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 pb-10">
        {items.map((product, index) => (
          <div
            key={index}
            className="flex flex-col border-2 border-purple-300 rounded-lg shadow-md hover:shadow-purple-500 transition bg-[#1e293b]"
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
                  ₹{product.price} × {product.quantity}
                </span>
                <button
                  onClick={() => remove(product.slug)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
