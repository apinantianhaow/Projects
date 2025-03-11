import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#767676",
        color: "#E3E3E3",
      }}
      className="py-10 px-8 mt-[200px]"
    >
      <div className="container mx-auto flex flex-wrap justify-between items-start mt-[45px]">
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-[25px] font-bold mb-2">
            Welcome to <br /> SMART BARTER EXCHANGE
          </h2>
          <p className="text-lg mt-4">
            Trade and shop local with people in your city. Find things you love
            like <br /> clothing, furniture, art and more.
          </p>
        </div>

        <div className="w-full md:w-1/3 text-left self-start">
          <h2 className="text-[25px] font-bold mb-2">CONTACT US</h2>
          <div className="text-lg mt-4 flex flex-col gap-1 leading-tight">
            <p>
              <span className="font-normal">Email</span> <br />{" "}
              eieieiei@lovegene.com
            </p>
            <p className="mt-2">
              <span className="font-normal">Phone</span> <br /> +66 846131 451
            </p>
            <p className="mt-2">
              <span className="font-normal">Address</span> <br /> Thrifted
              Ltd, 3 Cliffside Trade Park, <br /> Motherwell Way, Grays, RM20
              3XD
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
