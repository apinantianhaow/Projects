import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./topbar";
import { useSearch } from "../contexts/SearchContext"; // นำเข้า useSearch

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { searchTerm, setSearchTerm } = useSearch(); // ดึง searchTerm และ setSearchTerm จาก SearchContext

  const handleChange = (e) => {
    setSearchTerm(e.target.value); // ส่งค่าค้นหาขึ้นไปยัง Context
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, []);

  if (isLoggedIn) {
    return <Topbar setIsLoggedIn={setIsLoggedIn} />; // ส่ง setIsLoggedIn ไปที่ Topbar
  }

  return (
    <div className="bg-white w-full h-20 flex justify-between items-center px-4 overflow-hidden flex-nowrap">
      <div className="flex items-center min-w-0">
        <img
          src="/src/assets/icons/Search Normal.png"
          className="w-[22px] h-[22px] mt-[4px] ml-[40px]"
        />

        <input
          type="text"
          placeholder="type to search"
          className="w-[100px] sm:w-[150px] md:w-100 px-6 py-1 border-none rounded-md ml-[10px] 
                     focus:outline-none flex-shrink min-w-0"
          value={searchTerm} // ใช้ searchTerm จาก context
          onChange={handleChange} // ส่งค่าไปที่ setSearchTerm
        />
      </div>

      <div className="flex gap-3 flex-shrink-0">
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
      </div>
    </div>
  );
}

export default Navbar;
