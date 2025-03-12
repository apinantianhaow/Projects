import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div
      className="bg-white w-full h-20 flex justify-between items-center px-4 
                    overflow-hidden flex-nowrap"
    >
      <div className="flex items-center min-w-0">
        <div className="flex-shrink-0">
          <img
            src="/src/assets/icons/Search Normal.png"
            className="w-[22px] h-[22px] mt-[4px] ml-[40px]"
          />
        </div>

        <input
          type="text"
          placeholder="type to search"
          className="w-[100px] sm:w-[150px] md:w-100 px-6 py-1 border-none rounded-md ml-[10px] 
                     focus:outline-none flex-shrink min-w-0"
        />

        <div className="flex-shrink-0">
          <img
            src="/src/assets/icons/Heart.png"
            className="w-[23px] h-[23px] mt-[4px] ml-[915px]"
          />
        </div>
      </div>

      <div className="flex gap-3 flex-shrink-0">
        {isLoggedIn ? (
          // ✅ Show user icon when logged in
          <div className="flex items-center">
            <img
              src="/src/assets/icons/user.png" // User icon
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={() => navigate("/profile")} // Navigate to profile page
            />
            <button
              onClick={() => {
                localStorage.removeItem("user"); // Remove user data
                setIsLoggedIn(false); // Change status to logged out
                navigate("/sign"); // Navigate back to Sign In page
              }}
              className="ml-3 bg-red-500 text-white px-4 py-1 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          // ✅ Show Sign In and Register buttons if not logged in
          <>
            <button
              onClick={() => navigate("/sign")}
              style={{
                backgroundColor: "#E3E3E3",
                borderColor: "#767676",
                color: "#1E1E1E",
              }}
              className="w-40 h-[30px] font-bold text-[14px] text-center rounded-[8px] 
                        mr-[8px] border-[1px] flex items-center justify-center 
                        overflow-hidden text-ellipsis truncate whitespace-nowrap leading-none flex-shrink-0"
            >
              Sign in
            </button>

            <button
              onClick={() => navigate("/register")}
              style={{
                backgroundColor: "#2C2C2C",
                borderColor: "#2C2C2C",
                color: "#F5F5F5",
              }}
              className="w-40 h-[30px] font-bold text-[14px] text-center rounded-[8px] 
                        mr-[20px] border-[1px] flex items-center justify-center 
                        overflow-hidden text-ellipsis truncate whitespace-nowrap leading-none flex-shrink-0"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
