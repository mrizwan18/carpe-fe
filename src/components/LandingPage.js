import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import sep from '../assets/sep.svg';  // Import SVG

function LandingPage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-white"
      style={{
        backgroundImage: `url(${sep})`,  // Use imported SVG as background
        backgroundSize: 'cover',  // Cover the entire screen
        backgroundPosition: 'center',  // Position the image in the center
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 ">
        <div className="flex items-center">
          <NavLink to="/">
            <svg
              className="h-8 w-8 text-primaryOrange-light"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3H21V21H3V3ZM5 5V19H19V5H5ZM7 7H17V17H7V7ZM9 9V15H15V9H9Z"
                fill="currentColor"
              />
            </svg>
          </NavLink>
          <span className="text-2xl text-gray-800 font-bold ml-2">RideCarpe</span>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/login"
            className="text-white transition-colors duration-200 text-lg"
          >
            Log In
          </NavLink>
          <NavLink
            to="/register"
            className="bg-white text-primaryOrange-light py-1 px-3 rounded-full hover:bg-primaryOrange-dark hover:text-white transition-all duration-200 text-lg"
          >
            Sign Up
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center text-gray-700 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          BeFikar, Mukhtasar Safar
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 font-medium">
          Discover seamless carpooling, reduce travel costs, and enjoy a sustainable ride experience.
        </p>
        <div className="space-y-4 sm:space-y-6">
          <NavLink
            to="/register"
            className="inline-block bg-primaryOrange-light text-lg sm:text-xl lg:text-2xl font-semibold py-3 sm:py-4 px-10 sm:px-12 rounded-full hover:bg-primaryOrange-dark transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Join Us Today
          </NavLink>
          <p className="text-base sm:text-lg">
            Already have an account?{' '}
            <NavLink to="/login" className="font-semibold text-primaryOrange-light hover:text-primaryOrange-dark transition-colors duration-300">
              Log In
            </NavLink>
          </p>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="relative z-10 mt-12 lg:mt-20 w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-800 max-w-5xl mx-auto">
          <div className="p-4 sm:p-6 bg-gray-100 rounded-lg transform transition-all duration-700 hover:scale-105 hover:shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primaryOrange-light">Affordable Rides</h2>
            <p className="text-base sm:text-lg">Save money by sharing rides with people heading your way.</p>
          </div>
          <div className="p-4 sm:p-6 bg-gray-100 rounded-lg transform transition-all duration-700 hover:scale-105 hover:shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primaryOrange-light">Eco-Friendly</h2>
            <p className="text-base sm:text-lg">Reduce your carbon footprint and support sustainable travel.</p>
          </div>
          <div className="p-4 sm:p-6 bg-gray-100 rounded-lg transform transition-all duration-700 hover:scale-105 hover:shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primaryOrange-light">Safe & Secure</h2>
            <p className="text-base sm:text-lg">Verified drivers and passengers for a reliable experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
