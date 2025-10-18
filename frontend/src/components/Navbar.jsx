import React, { useState } from 'react'
import logo from "../assets/wecare.png"
import abbi from '../assets/abbi.JPG'
import drop from '../assets/keydown.png'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate =useNavigate();
  const [showMenu,setShowMenu]=useState(false);
  const [token,setToken]= useState(true);
  return (
    <div className="flex items-center justify-between text-sm py-2 mb-5 border- border-b-gray-400  sticky top-0 z-100 backdrop-blur-lg sticky top-0 z-50">
      {/* <img
        className=" cursor-pointer"
        src={logo}
        alt="logo"
        height={10}
        width={130}
      /> */}
      <h1
        className="
          text-4xl md:text-5xl lg:text-6xl   
          font-black  
           italic                       
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
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center g-4 ">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={abbi} alt="" />
            <img className="w-4.5" src={drop} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/myprofile")}
                  className="hover:text-black cursor-pointer"
                >
                  Profile
                </p>
                <p
                  onClick={() => navigate("/myappointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-light md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar