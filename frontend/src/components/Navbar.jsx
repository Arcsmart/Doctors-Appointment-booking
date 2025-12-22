import React, { useState, useContext } from "react";
import logo from "../assets/wecare.png";
import upload_area from "../assets/upload_area.svg";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
<<<<<<< HEAD

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 1. Helper Function: Ensures menu closes when any link/button is clicked
  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
=======
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
>>>>>>> f67d1ab8aeae10386929706678f2cea036f16c86
  };

  return (
    // 2. Fixed Sticky Header: Added bg-white/80 so backdrop-blur works
    <div className="sticky top-0 z-50 flex items-center justify-between text-sm py-2 mb-5 border-b border-b-gray-400 bg-white/80 backdrop-blur-lg">
      <h1
        onClick={() => handleNavigate("/")}
        className="text-3xl md:text-4xl font-black italic cursor-pointer tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text ml-4 md:ml-10"
      >
        WeCare
      </h1>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">Doctors</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
        </NavLink>
        <a
          href="https://wecareadmin-eight.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          <li className="py-1">Admin Panel</li>
        </a>
      </ul>

      {/* Profile/Login and Mobile Menu Icon */}
      <div className="flex items-center gap-4 mr-4 md:mr-10">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData.image || upload_area}
              alt=""
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                <p
                  onClick={() => handleNavigate("/myprofile")}
                  className="hover:text-black cursor-pointer"
                >
                  Profile
                </p>
                <p
                  onClick={() => handleNavigate("/myappointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // DESKTOP "Create Account" Button
          <button
            onClick={() => handleNavigate("/login")}
            className="hidden md:block bg-blue-500 text-white px-8 py-3 rounded-full font-light"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={menu}
          alt="Open Menu"
        />
      </div>

      {/* ---- Mobile Menu Overlay ---- */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-all duration-300 ${
          showMenu
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        } md:hidden`}
      >
        {/* Mobile Header: Logo Left, X Right */}
        <div className="flex items-center justify-between px-5 py-6 border-b">
          <h2 className="text-2xl font-black italic bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            WeCare
          </h2>
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={close}
            alt="Close menu"
          />
        </div>

        {/* Mobile Menu Links */}
        <ul className="flex flex-col items-end gap-4 mt-5 px-8 text-lg font-medium">
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/"
            className="px-4 py-2"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/doctors"
            className="px-4 py-2"
          >
            Doctors
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/about"
            className="px-4 py-2"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/contact"
            className="px-4 py-2"
          >
            Contact
          </NavLink>
          <a href="https://wecareadmin-eight.vercel.app" className="px-4 py-2">
            Admin Panel
          </a>

          {/* MOBILE "Create Account" Button (Only shows if NOT logged in) */}
          {!token && (
            <button
              onClick={() => handleNavigate("/login")}
              className="mt-4 bg-blue-500 text-white px-10 py-3 rounded-full w-full text-center"
            >
              Create Account
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
