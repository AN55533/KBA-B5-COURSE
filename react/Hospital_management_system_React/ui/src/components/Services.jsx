import React from "react";
import ServiceImg from "../assets/images/service-img.jpg";
import Icon from "../assets/images/Screenshot1.png";

function Services() {
  const services = [
    "24/7 Emergency Services Round-the-clock emergency care and ambulance support to handle any urgent medical situation.",
    "Specialist Doctors Experienced doctors across multiple specializations to provide expert care.",
    "Modern Diagnostic Lab State-of-the-art lab facilities for quick and accurate medical testing.",
    "Pharmacy Well-stocked pharmacy with round-the-clock availability of medicines.",
    "Online Appointment Booking Seamless and quick online appointment scheduling for patient convenience.",
    "In-Patient & Out-Patient Care Comprehensive care for both admitted and visiting patients.",
  ];

  return (
    <div className="w-full bg-white py-12">
      <h1 className="text-center text-blue-900 text-3xl font-bold">
        Our Services
      </h1>
      <p className="text-center text-gray-600 mt-2 max-w-3xl mx-auto px-4">
        We are committed to delivering high-quality, patient-centric healthcare
        supported by modern technology and expert medical professionals.
      </p>
      <div className="flex justify-center items-start mt-10 px-10 gap-10">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-1/3">
          {services.slice(0, 3).map((text, i) => (
            <div
              key={i}
              className="flex items-start bg-white border border-gray-200 p-4 rounded-lg shadow hover:bg-blue-900 hover:text-white transition"
            >
              <img src={Icon} alt="icon" className="w-10 h-10 mr-4" />
              <p>
                <span className="text-blue-500 font-bold block">
                  {text.split(" ")[0]} {text.split(" ")[1]}
                </span>
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="w-1/3 flex justify-center">
          <img
            src={ServiceImg}
            alt="Service"
            className="w-[300px] rounded-xl border-4 border-blue-900 shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-6 w-1/3">
          {services.slice(3, 6).map((text, i) => (
            <div
              key={i}
              className="flex items-start bg-white border border-gray-200 p-4 rounded-lg shadow hover:bg-blue-900 hover:text-white transition"
            >
              <img src={Icon} alt="icon" className="w-10 h-10 mr-4" />
              <p>
                <span className="text-blue-500 font-bold block">
                  {text.split(" ")[0]} {text.split(" ")[1]}
                </span>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
