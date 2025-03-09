import React from "react";
import './App.css';

function App() {
  return (
    <div className="main">
      <header className="background">
        <input
          type="text"
          placeholder="Type to search"
          className="textSearch"
        />
        <div className="sign and regis">
          <button className="Sign in">Sign in</button>
          <button className="Register">Register</button>
        </div>
      </header>

      <section className="text-header">
        <h1 className="second-text">
          TRADE WHAT YOU HAVE, <br /> GET WHAT YOU WANT
        </h1>
        <p className="third-text">
          SMART <br /> BARTER <br /> EXCHANGE
        </p>
      </section>

      <section className="text-center">
        <h2 className="category">CATEGORY</h2>
        <div className="category2">
          {[
            "ELECTRONICS","CLOTHING","BOOKS","HOME","PLANTS","ART & HANDMADE","COLLECTIBLES","SPORTS","KIDS","BEAUTY","GROCERY",]
            .map((category) => (
            <div key={category} className="">
              {category}
            </div>
          ))}
        </div>
      </section>

      <section className="">
        <h2 className="text-footer">Welcome to <br /> SMART BARTER EXCHANGE</h2>
        <p className="text-footer2">
          Trade and shop local with people in your city. Find things you love like <br /> clothing, furniture, art and more.
        </p>
      </section>

      <section className="email">
        <h2 className="contact">CONTACT US</h2>
        <div className="">
          <p><strong>Email</strong> <br /> eieieiei@lovegene.com</p>
          <p><strong>Phone</strong> <br /> +66 846131 451</p>
          <p>
            <strong>Address</strong> <br /> Thrifted Ltd, 3 Cliffside Trade <br /> Park, Motherwell Way, Grays,<br /> RM20 3XD
          </p>
        </div>
      </section>
    </div>
  );
}



export default App;