import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContex = createContext();

const AdmincontexProvider = (props) => {
  const [aToken, setToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND;
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.sucess) {
        setDoctors(data.doctors);
        // console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvilablity = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-avilablity",
        { docId },
        { headers: { aToken } }
      );
      if (data.sucess) {
        toast.success(data.message);

        setDoctors((currentDoctors) =>
          currentDoctors.map((doctor) =>
            doctor._id === docId
              ? { ...doctor, available: !doctor.available }
              : doctor
          )
        );
        //   getAllDoctors();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        // console.log(data.appointments)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const logout = () => {
    setToken("");
    localStorage.removeItem("aToken");

    
  };
  const value = {
    logout,
    aToken,
    setToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvilablity,
    appointments,
    setAppointments,
    getAllAppointment,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContex.Provider value={value}>{props.children}</AdminContex.Provider>
  );
};

export default AdmincontexProvider;
