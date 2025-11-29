import React from "react";
import { useState } from "react";
import { AdminContex } from "../../context/AdminContex";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContex } from "../../context/AppContex";
import cancel from '../../assets/image/cancel.png'

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointment, cancelAppointment } =
    useContext(AdminContex);
  const { calculateAge, slotDateFormat } = useContext(AppContex);

  useEffect(() => {
    if (aToken) {
      getAllAppointment();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b ">
          <p>No</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">
              {item.userData && item.userData.dob
                ? calculateAge(item.userData.dob)
                : "N/A"}
            </p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData.image}
                alt=""
              />{" "}
              <p>{item.docData.name}</p>
            </div>
            <p>{item.amount} ETB</p>
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium">cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="cursor-pointer w-6 rounded-full bg-gray-200 "
                src={cancel}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
