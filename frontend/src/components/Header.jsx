import React from 'react'
import { CheckIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import docbanner from "../assets/docbanner.png"
const Header = () => {
  return (
    <header className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 py-12 lg:py-14">
      {/* Left side content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Connect with Expert <br />
          {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Physicians Today.
          </span>
        </h1>

        <ul className="space-y-4 mb-8 text-lg text-gray-600">
          <li className="flex items-center justify-center lg:justify-start gap-4">
            <div className="flex-shrink-0 p-2 bg-blue-100 text-blue-600 rounded-full">
              <CheckIcon className="w-5 h-5" />
            </div>
            <span>Simply browse our extensive list of trusted doctors</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start gap-4">
            <div className="flex-shrink-0 p-2 bg-teal-100 text-teal-600 rounded-full">
              <CheckIcon className="w-5 h-5" />
            </div>
            <span>Read verified patient reviews before you book</span>
          </li>
        </ul>

        <a
          href="#spaciality"
          className="inline-flex items-center justify-center bg-blue-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Book Appointment
          <ArrowRightIcon className="w-5 h-5 px-1" />
        </a>
      </div>

      {/* Right side image */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-md">
          <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-teal-200 rounded-3xl transform -rotate-6 transition-transform duration-500 hover:rotate-0"></div>
          <img
            src={docbanner}
            alt=" doctor"
            className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </header>
  );
}

export default Header