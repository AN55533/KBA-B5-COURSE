import React from "react";
import Hos1 from "../assets/images/hms6.jpg";
import Hos2 from "../assets/images/hms7.png";
import Hos3 from "../assets/images/hmss.png";
import Hos4 from "../assets/images/hmss1.jpg";

function AboutUs() {
  return (
    <div className="w-[1530px] h-[600px] p-10 bg-blue-200 flex">
      <div className="flex w-1/2 bg-white relative flex-wrap">
        <img src={Hos1} alt="hms6" className="w-80 h-50 mt-10 ml-10 p-2" />
        <img src={Hos2} alt="hms7" className="ml-4 mt-1 w-80 h-50 p-2" />
        <img
          src={Hos3}
          alt="hmss"
          className="absolute left-10 top-56 w-80 h-50 p-2"
        />
        <img
          src={Hos4}
          alt="hmss1"
          className="absolute left-[350px] top-56 w-80 h-50 p-2"
        />
      </div>

      {/* Right - Content */}
      <div className="w-1/2 bg-sky-400">
        <h2 className="text-white text-[30px] p-10 font-bold -mt-4">
          About Us
        </h2>
        <p className="ml-10 text-[20px] text-gray-700">
          Our Hospital is a complete digital solution designed to streamline
          every aspect of hospital operations — from patient registration and
          appointment scheduling to medical records, billing, and staff
          management. With an emphasis on accuracy, efficiency, and ease of use,
          our system empowers hospitals and clinics to deliver faster, more
          organized, and patient-centered care.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
