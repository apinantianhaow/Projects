import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import bgImage from "../assets/images/image1.png";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Your password has been changed successfully.");
        navigate("/sign");
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setMessage("System error. Please try again later.");
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
          onSubmit={handleReset}
          className="bg-white p-6 rounded-[8px] shadow-md w-130 max-w-full"
        >
          <h2 className="text-4xl font-semibold font-newsreader mb-1.5">
            Set your new password
          </h2>
          <p className="text-lg text-[#2C2C2C] font-nunito font-semibold mb-3 mt-1">
            For Email : {email}
          </p>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-[8px] mb-3 mt-1"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-[8px] mb-3 mt-3"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#2C2C2C] text-white py-2 rounded-[8px] mt-5 mb-2"
          >
            submit
          </button>
          {message && <p className="mt-4 text-red-600 text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
