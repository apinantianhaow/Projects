import React from "react";

function Navbar() {
  return (
    // <header className="background">
    //   <input type="text" placeholder="Type to search" className="textSearch" />
    //   <div className="sign and regis">
    //     <button className="Sign in">Sign in</button>
    //     <button className="Register">Register</button>
    //   </div>
    // </header>
    <navbar>
      <div>
        <input
          type="text"
          placeholder="Type to search"
          className="textSearch"
        />
        <div className="sign and regis">
          <button className="Sign in">Sign in</button>
          <button className="Register">Register</button>
        </div>
      </div>
    </navbar>
  );
}

export default Navbar;
