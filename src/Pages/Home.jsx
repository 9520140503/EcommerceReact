import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className=" text-white px-6 sm:px-10 md:px-20 py-28 space-y-24">

      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to <span className="text-purple-400">MyStore</span></h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-300">
          Discover the best products at unbeatable prices. From fashion to electronics, we bring the world to your doorstep.
        </p>
        <Link to="/products">
          <button className="mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold text-white transition">
            Shop Now
          </button>
        </Link>
      </section>

     
      {/* Categories Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {[
          {
            title: 'Electronics',
            description: 'Latest gadgets, laptops, smartphones, and more.',
          },
          {
            title: 'Fashion',
            description: 'Trendy clothing and accessories for all seasons.',
          },
          {
            title: 'Home & Kitchen',
            description: 'Furniture, appliances, and decor to elevate your space.',
          },
          {
            title: 'Beauty & Health',
            description: 'Top-rated skincare, makeup, and wellness products.',
          },
          {
            title: 'Books',
            description: 'From bestsellers to hidden gems across genres.',
          },
          {
            title: 'Toys & Games',
            description:
              'Fun for all ages, including educational and interactive toys.',
          },
        ].map((cat, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-transparent hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 bg-white/5"
          >
            <h3 className="text-xl font-bold text-purple-300 mb-2">{cat.title}</h3>
            <p className="text-gray-300">{cat.description}</p>
          </div>
        ))}
      </section>


      
    {/* Why Choose Us Section */}
      <section className="text-center space-y-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-400">
          Why Shop With Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {[
            {
              icon: '✅',
              title: 'Authentic Products',
              description: '100% genuine items from trusted and top-rated brands.',
            },
            {
              icon: '🚚',
              title: 'Fast & Free Delivery',
              description: 'Enjoy speedy delivery without extra charges across India.',
            },
            {
              icon: '💰',
              title: 'Best Price Guarantee',
              description: 'Get the most value for your money with amazing deals.',
            },
            {
              icon: '🔒',
              title: 'Secure Payments',
              description: 'Safe and encrypted transactions with multiple payment options.',
            },
            {
              icon: '📞',
              title: '24/7 Support',
              description: 'Our team is here to help you anytime via chat or phone.',
            },
            {
              icon: '🎁',
              title: 'Exclusive Offers',
              description: 'Access special discounts and members-only sales.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 hover:bg-white/10 p-6 rounded-xl border border-purple-700/30 shadow-md hover:shadow-purple-500/30 transition duration-300"
            >
              <div className="text-3xl mb-3 bg-purple-700/20 rounded-full w-12 h-12 flex items-center justify-center text-purple-300 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to experience convenience?</h2>
        <p className="text-gray-300 text-lg">Sign up today and enjoy exclusive deals and offers on your favorite products.</p>
        <div className="flex justify-center gap-4 mt-6">
          <Link to="/signup">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition font-semibold">
              Get Started
            </button>
          </Link>
          <Link to="/products">
            <button className="border border-purple-500 hover:bg-purple-500 px-6 py-2 rounded-full transition font-semibold">
              Browse Products
            </button>
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
