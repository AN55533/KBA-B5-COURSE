import React from "react";
import Doc1 from "../assets/images/hms10.jpg";
import Doc2 from "../assets/images/hms11.jpg";
import Doc3 from "../assets/images/hmss2.jpg";

function Doctors() {
  const doctors = [
    { name: "ALINA", specialty: "Neurologist", img: Doc1 },
    { name: "ALEXANDER", specialty: "Neurologist", img: Doc2 },
    { name: "KAVYA", specialty: "Neurologist", img: Doc3 },
  ];

  return (
    <div className="w-full min-h-screen p-10 bg-gray-300 flex flex-col items-center">
      <h2 className="text-blue-900 text-3xl font-bold text-center">
        Our Doctors
      </h2>
      <p className="text-gray-700 text-center mt-2 max-w-3xl">
        We are proud to have a dedicated team of highly qualified and
        experienced doctors who are committed to delivering the highest
        standards of medical care.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-10 mt-10">
        {doctors.map((doc, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-80"
          >
            <img
              src={doc.img}
              alt={doc.name}
              className="w-80 h-[400px] object-cover"
            />
            <div className="bg-gray-700 text-center py-3 hover:bg-gray-500 transition">
              <p className="text-white font-bold">{doc.name}</p>
              <p className="text-gray-200 text-sm">{doc.specialty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg mt-10 hover:bg-blue-500 transition">
        View Doctors
      </button>
    </div>
  );
}

export default Doctors;
