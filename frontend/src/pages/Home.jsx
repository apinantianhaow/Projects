import React from "react";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Postprofile from "../components/Postprofile";

function Home() {
  return (
    <div>
      <Navbar />
      <Background />
      <Category />
      <Postprofile />
      <Footer />
    </div>
  );
}

export default Home;
