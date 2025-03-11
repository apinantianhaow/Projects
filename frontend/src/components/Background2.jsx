import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/icons/Caret Circle Left.png";

function Background2() {
  const navigate = useNavigate();

  return (
    <div className="text-left">
      <div className="bg-black w-full h-[87px] mt-1.5 flex justify-between items-center px-6">
        <a href="/" className="text-white text-4xl font-judson ml-[36px]">
          Home
        </a>
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center"
        >
          <img src={backIcon} alt="Back" className="w-[44px] h-[33px] mr-[145px]" />
        </button>
      </div>
    </div>
  );
}

export default Background2;
