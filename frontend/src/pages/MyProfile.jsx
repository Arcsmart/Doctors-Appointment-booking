import React, { useState } from "react";
// Make sure to adjust the path to your image
import abbi from "../assets/abbi.JPG";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Tesfaye Alemayehu",
    image: abbi,
    email: "tesfaye@gmail.com",
    phone: "+25195435858",
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    gender: "Male",
    dob: "2004-01-16",
  });

  const [isEdit, setIsEdit] = useState(false); // Set to false initially to show display mode first

  // A reusable style for input fields
  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500";

  // A reusable style for data display fields
  const textStyle = "text-gray-800";

  return (
    // Main container to center the profile card on the page
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8 space-y-6">
        {/* --- Profile Header --- */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={userData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200"
          />
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-3xl font-bold text-center bg-gray-50 border border-gray-300 rounded-md p-2"
            />
          ) : (
            <p className="text-3xl font-bold text-gray-800">{userData.name}</p>
          )}
        </div>

        <hr className="border-t border-gray-200" />

        {/* --- Contact Information Section --- */}
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase text-gray-500 tracking-wider">
            Contact Information
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="font-semibold text-gray-600">Email:</p>
              {/* Email is not editable in this example */}
              <p className={textStyle}>{userData.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={inputStyle}
                />
              ) : (
                <p className={textStyle}>{userData.phone}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-600">Address:</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={userData.address.line1}
                    type="text"
                    className={inputStyle}
                    placeholder="Address Line 1"
                  />
                  <input
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={userData.address.line2}
                    type="text"
                    className={inputStyle}
                    placeholder="City, Country"
                  />
                </div>
              ) : (
                <p className={textStyle}>
                  {userData.address.line1}, <br /> {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* --- Basic Information Section --- */}
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase text-gray-500 tracking-wider">
            Basic Information
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="font-semibold text-gray-600">Gender:</p>
              {isEdit ? (
                <select
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                  className={inputStyle}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className={textStyle}>{userData.gender}</p>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-600">Birthday:</p>
              {isEdit ? (
                <input
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob}
                  type="date"
                  className={inputStyle}
                />
              ) : (
                <p className={textStyle}>{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex justify-end pt-4">
          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
              className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
