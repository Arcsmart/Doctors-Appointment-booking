import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
const SPECIALITIES = [
  "General Physician",
  "Gastroenterologist",
  "Pediatrician",
  "Dermatologist",
  "Neurologist",
  "Orthopedic Surgeon",
];

const Doctors = () => {
  const { spaciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (spaciality) {
      setFilterDoc(doctors.filter((doc) => doc.spaciality === spaciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, spaciality]);

  // Handler for the dropdown's onChange event
  const handleSpecialityChange = (event) => {
    const selectedSpeciality = event.target.value;

    if (selectedSpeciality === "") {
      // If "All Specialities" is chosen, navigate to the base route
      navigate("/doctors");
    } else {
      // Otherwise, navigate to the specific speciality route
      navigate(`/doctors/${selectedSpeciality}`);
    }
  };

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className=" flex flex-col gap-4 text-sm text-gray-600">
          
          {/* --- REPLACEMENT: Dropdown Menu --- */}
          <div className="w-full sm:w-auto">
            <select
              value={spaciality || ""} // Set the selected value from the URL param
              onChange={handleSpecialityChange} // Call the handler on change
              className="w-full sm:w-[240px] pl-3 py-2 border border-gray-300 rounded text-sm text-gray-600 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Specialities</option>
              {SPECIALITIES.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          {/* --- End of Replacement --- */}

          {/* <p
            onClick={() =>
              spaciality === "General pysician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py1.5 pt-1.6 border border-gray-300 rounded transition-all cursor-pointer ${
              spaciality === "General pysician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              spaciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py1.5 pt-1.6 border border-gray-300 rounded transition-all cursor-pointer ${
              spaciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
          <p
            onClick={() =>
              spaciality === "Pediatrician"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatrician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py1.5 pt-1.6 border border-gray-300 rounded transition-all cursor-pointer ${
              spaciality === "Pediatrician" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatrician
          </p>
          <p
            onClick={() =>
              spaciality === " Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py1.5 pt-1.6 border border-gray-300 rounded transition-all cursor-pointer ${
              spaciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              spaciality === " Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py1.5 pt-1.6 border border-gray-300 rounded transition-all cursor-pointer ${
              spaciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              spaciality === "Orthopedic Surgeon"
                ? navigate("/doctors")
                : navigate("/doctors/Orthopedic Surgeon")
            }
            className={`w-[94vw] sm:w-auto pl-3 py1.5 pt-1.6 border border-gray-300 rounded transition-all cursor-pointer ${
              spaciality === "Orthopedic Surgeon"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Orthopedic Surgeon
          </p> */}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.spaciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
