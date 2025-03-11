import React from "react";

function Navbar2() {
  return (
    <div className="bg-white w-full h-20 flex justify-between items-center px-4 overflow-hidden">
      <div className="flex items-center w-full flex-nowrap">
        <div className="flex-shrink-0">
          <img
            src="/src/assets/icons/Search Normal.png"
            className="w-[22px] h-[22px] mt-[4px] ml-[40px]"
          />
        </div>

        <input
          type="text"
          placeholder="type to search"
          className="w-[30vw] sm:w-[40vw] md:w-[200px] lg:w-[250px] px-6 py-1 border-none rounded-md ml-[10px]
                     focus:outline-none flex-grow min-w-[150px]"
        />

        <div className="flex flex-shrink-0 ml-auto pr-4">
          <img
            src="/src/assets/icons/Heart.png"
            className="w-[23px] h-[23px] mt-[4px] ml-[20px] md:ml-[50px] lg:mr-[55px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
