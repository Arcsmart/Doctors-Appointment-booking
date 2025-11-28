import React, { useContext } from 'react'
import { AdminContex } from '../context/AdminContex'
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { DoctorContex } from '../context/DoctorContex';
 
const Sidebar = () => {

     const {aToken} =useContext(AdminContex)   
     const {dToken}  =useContext(DoctorContex)
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <HomeIcon className="h-6 w-6 text-blue-600 hover:text-blue-800" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/all-appointment"}
          >
            <CalendarIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/add-doctor"}
          >
            <PlusIcon className="h-6 w-6 text-green-600 hover:text-green-800" />
            <p className="hidden md:block"> Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/doctor-list"}
          >
            <UsersIcon className="h-6 w-6 text-purple-600 hover:text-purple-800" />
            <p className="hidden md:block">Doctor List</p>
          </NavLink>
        </ul>
      )}
      {/* Doctor sidebar */}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <HomeIcon className="h-6 w-6 text-blue-600 hover:text-blue-800" />
            <p className="hidden md:block"> Doctor Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/doctor-appointment"}
          >
            <CalendarIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <UsersIcon className="h-6 w-6 text-purple-600 hover:text-purple-800" />
            <p className="hidden md:block">Doctor Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
}

export default Sidebar