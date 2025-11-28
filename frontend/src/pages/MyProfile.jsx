import React, { useState } from "react";

import upload_area_image from "../assets/upload_area.svg";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false); 
const [image,setImage] = useState(false)

  const updateUserProfileData = async ()=>{
     try {
      const formData = new FormData()
      formData.append('name',userData.name)
      formData.append("phone", userData.phone);
      formData.append("address",JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})
      if(data.sucess) {
       toast.success(data.message)
       await loadUserProfileData() 
       setIsEdit(false)
       setImage(false)
      }else{
        toast.error(data.message)
      }   

     } catch (error) {
      console.error(error)
      toast.error(error.message);
     }
  }

  // A reusable style for input fields
  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500";

  
  const textStyle = "text-gray-800";

  return (
    userData && (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8 space-y-6">
          {/* --- Profile Header --- */}
          <div className="flex flex-col items-center space-y-4">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=""
                  />
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={image ? "" : upload_area_image}
                    alt=""
                  />
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200"
              />
            )}

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
              <p className="text-3xl font-bold text-gray-800">
                {userData.name}
              </p>
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
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
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
                    {userData.address?.line1}, <br /> {userData.address?.line2}
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
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
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
                onClick={() => setIsEdit(updateUserProfileData)}
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
    )
  );
};

export default MyProfile;
