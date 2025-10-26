import React from 'react'
import about_image from '../assets/about_image.png'
const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={about_image}
          alt="about_image"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            We believe finding and booking a doctor's appointment should be
            simple. Our mission is to eliminate the long waits and complexities
            of scheduling medical care by connecting you directly with a network
            of trusted healthcare professionals, putting you in control of your
            health.
          </p>
          <p>
            Our easy-to-use platform allows you to find the right doctor for
            your needs. You can browse provider profiles, compare patient
            reviews, and see real-time availability. Book a convenient
            appointment in just a few clicks on our secure and confidential
            system.
          </p>
          <b className="text-gray-800">Our vision</b>
          <p>
            We envision a future where quality healthcare is accessible to
            everyone. We strive to be the most trusted and convenient bridge
            between patients and providers, acting as your dedicated partner on
            your journey to wellness.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p className="text-gray-700 font-semibold">
          WHY <span className='text-center'></span>CHOOSE US
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience</b>
          <p>
            Access to a network of trusted healthcare professionals in your area
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health
          </p>
        </div>
      </div>
    </div>
  );
}

export default About