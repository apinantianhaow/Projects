import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import bgImage from "../assets/images/image1.png";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.includes("@") || !password) {
      setMessage("Error please try again");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
  
      if (data.message === "User registered successfully!") {
        localStorage.setItem("userId", data.userId); 
        setTimeout(() => navigate("/registerUsername"), 1000);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
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
        <div className="bg-white p-8 rounded-lg shadow-lg w-132 h-133">
          <div className="mb-4">
            <label className="block text-[#1E1E1E] text-sm font-bold mb-2">
              Email
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
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleRegister}
          >
            Register
          </button>
          {message && (
            <p
              className={`mt-4 text-center ${
                message === "Error please try again"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
