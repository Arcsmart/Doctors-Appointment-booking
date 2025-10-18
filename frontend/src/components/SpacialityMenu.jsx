import React from 'react'
import { Link } from 'react-router-dom'
import {specialityData} from '../assets/data'
const SpacialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="spaciality"
    >
      <h1 className="text-3xl font-medium">Find by Spaciality</h1>

      <p className="sm:w1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors ,schedule
        your appointment
      </p>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-[-10px] transition-all duration-500"
            key={index}
            to={`/doctors/${item.spaciality}`}
          >
            <img
              className="w-16 sm:w-24 mb-2  h-20 rounded-full object-cover "
              src={item.imge}
              alt=""
            />

            <p>{item.spaciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpacialityMenu