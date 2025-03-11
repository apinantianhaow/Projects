import React from "react";

function Navbar() {
  return (
    <navbar className="bg-white w-full h-20 flex justify-between items-center px-4">
      <div className="flex">
        <div>
          <img
            src="/src/assets/icons/Search Normal.png"
            className="w-[22px] h-[22px] mt-[4px] ml-[40px]"
          />
        </div>
        <input
          type="text"
          placeholder="type to search"
          className="w-100 px-6 py-1 border-none rounded-md ml-[10px]
                     focus:outline-none"
        />
        <div className="flex">
          <img
            src="/src/assets/icons/Heart.png"
            className="w-[23px] h-[23px] mt-[4px] ml-[915px]"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          style={{
            backgroundColor: "#E3E3E3",
            borderColor: "#767676",
            color: "#1E1E1E",
          }}
          className="w-40 h-[30px] font-bold text-[14px] text-center rounded-[8px] mr-[8px] 
               border-[1px] flex items-center justify-center overflow-hidden 
               text-ellipsis truncate whitespace-nowrap leading-none"
        >
          Sign in
        </button>

        <button
          style={{
            backgroundColor: "#2C2C2C",
            borderColor: "#2C2C2C",
            color: "#F5F5F5",
          }}
          className="w-40 h-[30px] font-bold text-[14px] text-center rounded-[8px] mr-[20px] 
               border-[1px] flex items-center justify-center overflow-hidden 
               text-ellipsis truncate whitespace-nowrap leading-none"
        >
          Register
        </button>
      </div>
    </navbar>
  );
}

export default Navbar;