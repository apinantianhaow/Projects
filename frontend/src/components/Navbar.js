import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ display: "flex", padding: "10px", background: "#333", color: "white"}}>
            <h2 style={{ margin: "0 20px" }}>My Shop</h2>
            <ul style={{ listStyle: "none", display: "flex", gap: "20px"}}>
                <li><Link to="/" style={{color: "white", textDecoration: "none" }}>Home</Link></li>
                <li><Link to="/upload" style={{color: "white", textDecoration: "none" }}>Upload</Link></li>
            </ul> 
        </nav>
    );
};
export default Navbar;