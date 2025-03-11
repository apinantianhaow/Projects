import React from "react";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import bgImage from "../assets/images/image1.png";

function Register() {
  return (
    <div>
      <Navbar2 />
      <Background2 />
      <div
        className="w-full min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-132 h-133">
          <div className="mb-4">
            <label className="block text-[#1E1E1E] text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#1E1E1E] text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="agree" className="mr-2" />
            <label htmlFor="agree" className="font-bold text-sm text-[#1E1E1E]">
              Remember me
            </label>
          </div>

          <button
            style={{
              backgroundColor: "#2C2C2C",
            }}
            className="w-full text-white py-2 rounded-lg hover:bg-[#2C2C2C] transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
