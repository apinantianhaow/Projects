import React from "react";

function Background() {
  return (
    <div className="text-left">
      <div className="bg-black w-full h-[87px] mt-1.5"></div>
      <div className="mt-[50px] ml-[63px]">
        <h1 className="text-[80px] font-kaisei">
          TRADE WHAT YOU HAVE, <br /> GET WHAT YOU WANT
        </h1>
      </div>
      <div className="flex flex-1/3 items-center mx-[63px]">
        <div className="flex w-1/3">
          <p className="text-[70px] font-kaisei">
            SMART <br /> BARTER <br /> EXCHANGE
          </p>
        </div>
        <div className="flex w-2/3 gap-10">
          <img
            src="/src/assets/images/image1.png"
            className="w-2/3 h-auto rounded-md mt-[40px]"
          />
          <img
            src="/src/assets/images/image 2.png"
            className="w-1/3 h-auto rounded-md object-cover mt-[40px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Background;
