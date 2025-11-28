import React, { useContext, useEffect } from "react";
import { DoctorContex } from "../../context/DoctorContex";
import earning from "../../assets/image/earning_icon.svg";
import appointment_icon from "../../assets/image/appointments_icon.svg";
import appointment_icons from "../../assets/image/appointment_icon.svg";
import patient_icon from "../../assets/image/patients_icon.svg";
import { AppContex } from "../../context/AppContex";
import cancel from "../../assets/image/cancel.png";
import complete from '../../assets/image/complete.png'

const DoctorDashboard = () => {
  const {
    dToken,
    getDashData,
    dashData,
    setDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContex);
  const { slotDateFormat } = useContext(AppContex);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14  " src={earning} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.earnings} ETB
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14 " src={appointment_icon} alt="" />

            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14 " src={patient_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patents}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={appointment_icons} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {" "}
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-6 cursor-pointer  rounded-full bg-gray-200 "
                      src={cancel}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-6 cursor-pointer  rounded-full bg-gray-200 "
                      src={complete}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
