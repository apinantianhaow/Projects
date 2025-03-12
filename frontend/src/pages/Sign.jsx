import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import bgImage from "../assets/images/image1.png";

function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (data === "Success") {
        navigate("/");
      } else {
        alert(data);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Navbar2 />
      <Background2 />
      <div
        className="w-full min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] max-w-lg">
          <div className="mb-4">
            <label className="block text-[#1E1E1E] text-sm font-bold mb-2">
              Email :
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#1E1E1E] text-sm font-bold mb-2">
              Password :
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            className="w-full bg-[#2C2C2C] text-white py-2 rounded-lg hover:bg-[#2C2C2C] transition duration-300 mt-6"
            onClick={handleSignIn}
          >
            Sign In
          </button>

          <div className="mt-4 text-left">
            <a href="#" className="text-sm text-[#1E1E1E] underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;
