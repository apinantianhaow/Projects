import React from "react";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Category from "../components/Category";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Background />
      <Category />
      <Footer />
    </div>
  );
}

export default Home;