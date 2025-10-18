import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import About from './pages/About';
import Navbar from './components/Navbar';
import Appointment from './pages/Appointment';
import Footer from './components/Footer';


function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:spaciality" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myappointments" element={<MyAppointments />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment/:docId" element={<Appointment/>} />
      </Routes>
      <Footer/>
    </div>
  );}

export default App
