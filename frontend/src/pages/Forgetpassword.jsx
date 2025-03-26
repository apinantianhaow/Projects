import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import bgImage from "../assets/images/image1.png";

function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.exists) {
        // have email → go to reset'page with email in URL
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setMessage("Not Found this email in system");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred in the system.");
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
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-[8px] shadow-md w-130 h-80"
        >
          <h2 className="text-4xl text-[#1E1E1E] font-semibold font-newsreader mb-4">
            Forget Password
          </h2>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-[8px] mb-4 mt-1 text-lg h-11.5 "
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#2C2C2C] text-white py-2 mt-3 rounded-[8px]"
          >
            Next
          </button>
          {message && <p className="mt-4 text-red-600 text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Forgetpassword;
