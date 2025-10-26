import React from 'react'
import about_image from '../assets/kid.png'
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-12 text-sm justify-center">
        <img
          className="w-full md:max-w-[360px]"
          src={about_image}
          alt="about_image"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <b className="text-gray-600 font-semibold text-lg ">OUR OFFICE</b>
          <p className="text-gray-500">
            Wachemo ,Hossan <br /> Ethiopia
          </p>
          <p className="text-gray-500">
            Tel: +2519785643 <br />
            Email: wecaredev@gmail.com
          </p>

          <p className="font-semibold text-lg text-gray-600">
            Careers at WeCare
          </p>
          <p className=" text-gray-600">
            Learn more about our teams and job opening
          </p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  );
}

export default Contact