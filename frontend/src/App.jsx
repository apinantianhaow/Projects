import React from "react";
import Navbar from "./components/Navbar";
import Category from "./components/Category";

function App() {
  return (
    <div className="font-sans">
      <Navbar />

      <section className="text-left">
        <div className="bg-black w-full h-[3.8rem]"></div>
        <div className="p-5">
          <h1 className="text-2xl font-bold">
            TRADE WHAT YOU HAVE, <br /> GET WHAT YOU WANT
          </h1>
          <p className="text-lg leading-6">
            SMART <br /> BARTER <br /> EXCHANGE
          </p>
        </div>
      </section>

      <Category/>

      <section className="text-center mt-12">
        <h2 className="text-xl font-bold">
          Welcome to <br /> SMART BARTER EXCHANGE
        </h2>
        <p className="text-lg mt-2">
          Trade and shop local with people in your city. Find things you love
          like <br /> clothing, furniture, art and more.
        </p>
      </section>

      <section className="text-center mt-12">
        <h2 className="text-xl font-bold">CONTACT US</h2>
        <div className="mt-4">
          <p>
            <strong>Email</strong> <br /> eieieiei@lovegene.com
          </p>
          <p>
            <strong>Phone</strong> <br /> +66 846131 451
          </p>
          <p>
            <strong>Address</strong> <br /> Thrifted Ltd, 3 Cliffside Trade{" "}
            <br /> Park, Motherwell Way, Grays,
            <br /> RM20 3XD
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
