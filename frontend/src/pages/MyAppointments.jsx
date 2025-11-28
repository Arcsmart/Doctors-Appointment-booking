import React, { useContext, useEffect, useState } from "react"; // Changed useState to useContext
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);const [paymentLoadingId, setPaymentLoadingId] = useState(null);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.sucess) {
        setAppointments(data.appointments.reverse());
        // console.log(data.appointments)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.sucess) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentChapa = async (appointmentId) => {
    try {

      setPaymentLoadingId(appointmentId);

      const { data } = await axios.post(
        backendUrl + "/api/user/payment-chapa",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        localStorage.setItem("pending_tx_ref", data.tx_ref);
        // console.log("Redirecting to:", data.checkout_url);
        window.location.replace(data.checkout_url);
      } else {
        toast.error(data.message);
        setPaymentLoadingId(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const verifyChapaPayment = async (tx_ref) => {
    try {
      
      // toast.info("Verifying payment...");

      const { data } = await axios.post(
        backendUrl + "/api/user/verify-chapa",
        { tx_ref },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(
          `Thank you ${data.name}, payment of ${data.amount} ETB received!`
        );
        getUserAppointments();
      } else {
        toast.error(data.message || "Payment verification failed.");
      }

      localStorage.removeItem("pending_tx_ref");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      localStorage.removeItem("pending_tx_ref");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();

      const pendingTx = localStorage.getItem("pending_tx_ref");
      if (pendingTx) {
        verifyChapaPayment(pendingTx);
      }
    }
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl text-center font-bold text-gray-800 mb-8">
          My Appointments
        </h1>
        <div className="space-y-6">
          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 text-lg font-medium">
                No appointments yet
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Book an appointment with a doctor to see it here.
              </p>
            </div>
          ) : (
            appointments.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="sm:w-1/3">
                  <img
                    className="w-full h-48 sm:h-full object-cover"
                    src={item.docData.image}
                    alt={`Dr. ${item.docData.name}`}
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {item.docData.name}
                    </p>
                    <p className="text-md text-indigo-600 font-semibold">
                      {item.docData.speciality}
                    </p>
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="font-semibold">Address:</p>
                      <p>{item.docData.address.line1}</p>
                      <p>{item.docData.address.line2}</p>
                    </div>
                    <p className="mt-4 text-sm bg-gray-100 p-3 rounded-lg">
                      <span className="font-bold text-gray-800">
                        Date & Time:
                      </span>
                      <span className="ml-2 text-gray-700">
                        {slotDateFormat(item.slotDate)} | {item.slotTime}
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    {!item.cancelled && item.payment && !item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                        Paid
                      </button>
                    )}
                    {!item.cancelled && !item.payment && !item.iscompleted && (
                      <button
                        onClick={() => appointmentChapa(item._id)}
                        //  Disable button if ANY payment is loading
                        disabled={paymentLoadingId === item._id}
                        className={`w-full px-3 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-75 transition-colors duration-300 flex justify-center items-center gap-2 
                        ${
                          paymentLoadingId === item._id
                            ? "bg-blue-400 cursor-not-allowed text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {/* Spinner or Text */}
                        {paymentLoadingId === item._id ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Pay with chapa"
                        )}
                      </button>
                    )}

                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="w-full px-3 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors duration-300"
                      >
                        Cancel Appointment
                      </button>
                    )}
                    {item.cancelled && !item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border border-red-500 text-red-500">
                        Appointment Cancelled
                      </button>
                    )}

                    {item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border border-green-500 text-green-500">
                        Appointment Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
