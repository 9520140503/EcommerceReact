import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo Section */}
        <div className="flex flex-col">
          <h2 className="text-xl mb-4 font-bold">Loome</h2>
          <p className="text-sm">Empowering innovation with every step.</p>
        </div>

        {/* Social Media Handles */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-300">
              <FaFacebookF size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-300">
              <FaTwitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-300">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Terms and Links */}

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="text-sm hover:text-blue-300">Privacy Policy</Link>
          <Link to="/" className="text-sm hover:text-blue-300">Terms of Service</Link>
          <Link to="/" className="text-sm hover:text-blue-300">Contact Us</Link>
        </div>
      </div>

      <div className="text-center text-sm text-gray-300 mt-8">
        © 2025 Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
