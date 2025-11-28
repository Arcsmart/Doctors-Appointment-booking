import { useState } from "react";
import { createContext } from "react";
export const DoctorContex = createContext()
import axios from 'axios'
import {toast} from 'react-toastify'


const DoctorcontexProvider = (props)=>{
  const backendUrl = import.meta.env.VITE_BACKEND;
  const [dToken,setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken'):'')
  const [appointments,setAppointments]=useState([])
  const[dashData,setDashData]=useState(false)
  const [profileData,setProfile]=useState(false)

  const getAppointments = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})
      if(data.success){
        setAppointments(data.appointments.reverse());
        
        // console.log(data.appointments)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const logout = () => {
    setDToken(""); 
    localStorage.removeItem("dToken"); 
    
  };
 
  const completeAppointment=async (appointmentId)=>{
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        {appointmentId},
        { headers: { dToken } }
      );
      console.log(data)
      if(data.success){
        toast.success(data.message)
        getAppointments()
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        {appointmentId},
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData=async()=>{
    try {
      const {data}=await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{dToken}})
      if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
 const getProfile =async()=>{
  try {
    const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
      headers: { dToken },
    });
    if(data.success){
      setProfile(data.profileData);
      console.log(data.profileData);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
 }
  const value = {
    dToken,
    setDToken,
    backendUrl,
    logout,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    profileData,
    setProfile,
    getProfile,
  }; 
  
  
  return (
     <DoctorContex.Provider value={value}>
      {props.children}
     </DoctorContex.Provider>     
  )
}

export default DoctorcontexProvider
