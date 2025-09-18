import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import adminImg from "../assets/images/admin.png";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="flex">
        <div className="w-[250px] min-h-screen bg-blue-900 border p-5 text-white">
          <div className="p-1 text-center">
            <img
              src={adminImg}
              alt="admin"
              className="p-3 w-[150px] h-[150px] mx-auto"
            />
            <p className="text-red-300">Robert Womack</p>
            <p className="text-red-300">Admin Id: 560124</p>
          </div>

          <div className="mt-5 flex flex-col space-y-2">
            <button className="bg-blue-100 text-blue-500 p-2 text-[18px] rounded-lg hover:bg-blue-500 hover:text-white">
              Dashboard
            </button>
            <button className="bg-white text-blue-500 p-2 text-[18px] rounded-lg hover:bg-blue-500 hover:text-white">
              Appointment
            </button>
            <button className="bg-white text-blue-500 p-2 text-[18px] rounded-lg hover:bg-blue-500 hover:text-white">
              Patients
            </button>

            <button className="bg-white text-blue-500 p-2 text-[18px] rounded-lg hover:bg-blue-500 hover:text-white">
              <Link to="/adddoctor" className="font-semibold">
                Doctors
              </Link>
            </button>

            <button className="bg-white text-blue-500 p-2 text-[18px] rounded-lg hover:bg-blue-500 hover:text-white">
              Profile
            </button>
            <button className="bg-white text-blue-500 p-2 text-[18px] rounded-lg hover:bg-blue-500 hover:text-white">
              Logout
            </button>
          </div>
        </div>

   
        
        <div className="flex-1 p-10">
          <div className="flex space-x-6">
            <div className="w-[250px] h-[150px] border border-gray-200 rounded-lg bg-yellow-600 p-4">
              <h1 className="text-xl font-bold text-white mb-2 bg-blue-800 p-2 rounded">
                Total Patients
              </h1>
              <p className="text-2xl text-white">30</p>
            </div>

            <div className="w-[250px] h-[150px] border border-gray-200 rounded-lg bg-green-500 p-4">
              <h1 className="text-xl font-bold text-white mb-2 bg-blue-800 p-2 rounded">
                Total Doctors
              </h1>
              <p className="text-2xl text-white">20</p>
            </div>

            <div className="w-[250px] h-[150px] border border-gray-200 rounded-lg bg-red-500 p-4">
              <h1 className="text-xl font-bold text-white mb-2 bg-blue-800 p-2 rounded">
                Appointments Today
              </h1>
              <p className="text-2xl text-white">100</p>
            </div>
          </div>

          {/* Reports Table */}
          <div className="p-5 bg-white rounded-lg border mt-10 shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Reports</h2>

            <div className="flex space-x-3 mb-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Appointments
              </button>
              {/* Example extra buttons */}
              {/* <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">Medical Records</button> */}
            </div>

            <div className="rounded-lg border overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Doctor</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 text-blue-600 font-medium">AP3456</td>
                    <td className="p-4">Dr. Patricia Cassidy</td>
                    <td className="p-4">Psychology</td>
                    <td className="p-4">21 Mar 2024, 11:40 AM</td>
                    <td className="p-4">
                      <span className="text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-[13px] font-semibold">
                        Consulted
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="p-4 text-blue-600 font-medium">AP1234</td>
                    <td className="p-4">Dr. Robert Womack</td>
                    <td className="p-4">Neurology</td>
                    <td className="p-4">28 Mar 2024, 10:30 AM</td>
                    <td className="p-4">
                      <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-[13px] font-semibold">
                        Upcoming
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="p-4 text-blue-600 font-medium">AP5678</td>
                    <td className="p-4">Dr. Robert Womack</td>
                    <td className="p-4">Neurology</td>
                    <td className="p-4">10 Apr 2024, 10:30 AM</td>
                    <td className="p-4">
                      <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-[13px] font-semibold">
                        Upcoming
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
