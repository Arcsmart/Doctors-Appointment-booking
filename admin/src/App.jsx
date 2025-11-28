import { useContext, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Login from './pages/Login'
import { AdminContex } from './context/AdminContex';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AllAppointment from './pages/Admin/AllAppointment';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContex } from './context/DoctorContex';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';

function App() {
  const {aToken}=useContext(AdminContex)
  const {dToken}=useContext(DoctorContex)

  return aToken || dToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          {/* Admin route */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          {/* Doctor route */}
          <Route path="/doctor-appointment" element={<DoctorAppointment />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App
