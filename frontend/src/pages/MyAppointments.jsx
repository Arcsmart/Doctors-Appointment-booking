import React, { useContext } from "react"; // Changed useState to useContext
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  // Correctly consume the context using the useContext hook
  const { doctors } = useContext(AppContext);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl text-center font-bold text-gray-800 mb-8">
          My Appointments
        </h1>
        <div className="space-y-6">
          {/* Check if doctors exists and is an array before mapping */}
          {doctors &&
            doctors.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="sm:w-1/3">
                  <img
                    className="w-full h-48 sm:h-full object-cover"
                    src={item.image}
                    alt={`Dr. ${item.name}`}
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-md text-indigo-600 font-semibold">
                      {item.speciality}
                    </p>
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="font-semibold">Address:</p>
                      <p>{item.address.line1}</p>
                      <p>{item.address.line2}</p>
                    </div>
                    <p className="mt-4 text-sm bg-gray-100 p-3 rounded-lg">
                      <span className="font-bold text-gray-800">
                        Date & Time:
                      </span>
                      <span className="ml-2 text-gray-700">
                        25, July, 2024 | 8:30 AM
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button className="w-full px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-75 transition-colors duration-300">
                      Pay Online
                    </button>
                    <button className="w-full px-3 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors duration-300">
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
