import React from "react";

function Navbar2() {
  return (
    <div className="bg-white w-full h-20 flex justify-between items-center px-4">
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
    </div>
  );
}

export default Navbar2;
