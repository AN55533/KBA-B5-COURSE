import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import HealthLogo from "../assets/images/HealthLogo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-400 px-6 py-4">
      <div className="flex items-center space-x-3">
        <Link to="/">
          <img
            src={HealthLogo}
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
        </Link>
        <h1 className="text-white text-2xl font-bold">XYZ-HOSPITAL</h1>
      </div>

     
    
    </nav>
  );
}

export default Navbar
