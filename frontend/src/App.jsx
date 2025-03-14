import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Sign from "./pages/Sign";


import Profile from "./pages/Profile";
import Profile2 from "./pages/Profile2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign" element={<Sign />} />

       
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile2" element={<Profile2 />} />
      </Routes>
    </Router>
  );
}

export default App;
