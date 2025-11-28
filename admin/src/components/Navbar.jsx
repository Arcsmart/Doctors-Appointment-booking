import React, { useContext } from "react";
import { AdminContex } from "../context/AdminContex";
import { useNavigate } from "react-router-dom";
import { DoctorContex } from "../context/DoctorContex";

const Navbar = () => {
  const { aToken, logout: adminLogout } = useContext(AdminContex);
  const { dToken, logout: doctorLogout } = useContext(DoctorContex);
  const navigate = useNavigate();
  aToken && localStorage.removeItem("aToken");

  const handleLogout = () => {
    if (aToken) {
      adminLogout();
    } else if (dToken) {
      doctorLogout();
    }
  };
  const currentRole = aToken ? "Admin" : dToken ? "Doctor" : "Guest";
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <h1
          onClick={() => {
            navigate("/login");
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
        <p className="border px-2.5 py-0.5 rounded-full border-gray-600">
          {currentRole}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
