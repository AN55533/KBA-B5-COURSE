import React from "react";
import {Link,NavLink} from 'react-router-dom'
import hmsImage from "../assets/images/hms.jpg";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-[700px] p-5 text-[20px]"
      style={{ backgroundImage: `url(${hmsImage})` }}
    >
      <p className="mt-20 p-5 font-extrabold text-[40px] text-blue-900 font-sans ml-20">
        WE ALWAYS PUT THE
        <p className="text-blue-400 font-serif"> PATIENTS FIRST </p>
      </p>

      <div className="ml-25 space-x-4">
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-green-500">
          View All Services
        </button>
        <NavLink to="/login" >
        <button className="bg-blue-600 text-white p-2 rounded text-[20px] hover:bg-green-500">
          Login
          </button>
        </NavLink>
       
        
      </div>
    </div>
  );
};

export default Hero;
