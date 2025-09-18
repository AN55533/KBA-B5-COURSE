import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import adminImg from "../assets/images/admin.png";

const AddDoctor = () => {
  const [doctorName, setDoctorName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/addDoctor", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          DoctorName: doctorName,
          Age: Number(age),
          Department: department,
          PhoneNumber: phoneNumber,
          Email: email,
          Password: password,
          Gender: gender,
        }),
      });

      if (!res.ok) {
        throw new Error("Error adding doctor");
      }

      alert("Doctor added successfully!");

      // Reset form
      setDoctorName("");
      setAge("");
      setDepartment("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setGender("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="bg-blue-200 w-3/4 p-10 rounded shadow-md ml-10 mt-10">
          <h2 className="text-center text-lg font-semibold mb-6">Add Doctor</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
          
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Doctor Name:
                </label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full p-2 bg-gray-200 rounded-md"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone Number:
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 bg-gray-200 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-gray-200 rounded-md"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-gray-200 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Gender & Age */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Gender:
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 bg-gray-200 rounded-md"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Age:
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 bg-gray-200 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Department:
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2 bg-gray-200 rounded-md"
                required
              />
            </div>

            {/* Buttons */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                type="submit"
                className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900"
              >
                Save
              </button>
              <button
                type="reset"
                className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
