import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import bgImage from "../assets/images/image1.png";


function RegisterUsername() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  

  return (
    <div>
      <Navbar2 />
      <Background2 />
      <div
        className="w-full min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-132 h-133">
            <div className="flex flex-col">
                <h className="font-bold text-[40px]">
                    Setup your account
                </h>
                <h className="text-[25px] mb-5 ">
                    introduce yourself
                </h>
            </div>
          <div >
            <label className="block text-[#1E1E1E] text-sm font-bold mb-2">
              Your name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-10 mt-6">
            <label className="block text-[#1E1E1E] text-sm font-bold mb-2">
              Creat username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button
            style={{
              backgroundColor: "#2C2C2C",
            }}
            className="w-full text-white py-2 rounded-lg hover:bg-[#2C2C2C] transition duration-300"
            onClick={() => navigate("/registerPhoto", {state: {name: name, username: username}})}
          >
            Next
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default RegisterUsername;
