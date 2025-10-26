import React, { useContext } from 'react'
import { AdminContex } from '../context/AdminContex'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
   const {aToken,setToken} =useContext
   (AdminContex)
    const navigate = useNavigate()
   const logout=()=>{
          navigate;('/')
      aToken && setToken('')
      aToken && localStorage.removeItem('aToken')   
   }
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        {/* <img className='w-36 sm:w-40 cursor-pointer' src="#" alt="logo" /> */}
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
        <p className="border px-2.5 py-0.5 rounded-full border-gray-600">
          {" "}
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-blue-600 text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar