import React from 'react'
import logo from '../assets/wecare.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate =useNavigate()
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* --left side-- */}
        <div>
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="
          text-1xl md:text-2xl lg:text-3xl font-black   italic                       
          cursor-pointer
          tracking-tighter               
          bg-gradient-to-r
          from-pink-500
          via-purple-500
          to-blue-500
          text-transparent
          bg-clip-text
          transition
          duration-300
          ease-in-out
          hover:scale-[1.02]
          hover:opacity-95
          "
          >
            WeCare
          </h1>
         
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            WeCare is dedicated to simplifying your health journey. We connect
            you with verified, trusted doctors and specialists, ensuring you get
            the reliable care you deserve, when you need it most.
          </p>
        </div>
        {/* --center-- */}
        <div>
          <p className="text-xl font-medium mb-5">Quick Link</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home </li>
            <li> About us</li>
            <li>Contact us </li>
            <li>Privacy police</li>
          </ul>
        </div>
        {/* -right side --- */}
        <div>
          <p className="text-xl font-medium mb-5">Contact Us</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+25196785942</li>
            <li>wecaresupport@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* copy right text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ Wecare - All Right Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer