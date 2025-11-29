import React, { useState } from "react";
import logo from "../assets/wecare.png";
import upload_area from "../assets/upload_area.svg";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); 
  const {token,setToken,userData} = useContext(AppContext)
  const logout = ()=>{ 
    setToken(false)
    localStorage.removeItem('token')
  }
  

  return (
    <div className="flex items-center justify-between text-sm py-2 mb-5 border-b border-b-gray-400 sticky top-0 z-30 backdrop-blur-lg ">
      {/* <img className="w-7 h-5" src={logo} alt="" /> */}
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="
text-3xl md:text-4xl lg:text-5xl font-black italic
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

      {/* Desktop Navigation Links */}
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
        <NavLink to="https://wecareadmin-eight.vercel.app">
          <li className="py-2 rounded-full text-sm border-gray-500">
            Admin pannel
          </li>
          {/* <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" /> */}
        </NavLink>
      </ul>

      {/* Profile/Login and Menu Icon Section */}
      <div
        className={`flex items-center g-4 ${showMenu ? "hidden md:flex" : ""}`}
      >
        {/* Profile/Login Section */}
        <div>
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-8 rounded-full"
                src={userData.image || upload_area}
                alt=""
              />
              {/* <img className="w-4.5" src={""} alt="" /> */}
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
                    onClick={logout}
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

        {/* Mobile Menu Icon (Only visible when menu is CLOSED on mobile) */}
        <img
          onClick={() => setShowMenu(true)}
          className={`w-6 md:hidden ${showMenu ? "hidden" : "block"}`}
          src={menu}
          alt=""
        />
      </div>

      {/* ----Mobile Menu */}
      <div
        className={` ${
          showMenu ? "fixed w-full h-full" : "h-0 w-0"
        } md:hidden right-0 top-0 bottom-0 z-40 sticky top-0 z-30  overflow-hidden bg-white transition-all`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={close}
            alt="Close menu"
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <NavLink
            className="px-4 py-2 rounded inline-block"
            onClick={() => setShowMenu(false)}
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className="px-4 py-2 rounded inline-block"
            onClick={() => setShowMenu(false)}
            to={"/doctors"}
          >
            Doctors
          </NavLink>
          <NavLink
            className="px-4 py-2 rounded inline-block"
            onClick={() => setShowMenu(false)}
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            className="px-4 py-2 rounded inline-block"
            onClick={() => setShowMenu(false)}
            to={"/contact"}
          >
            Contact
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
