import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Sign from "./pages/Sign";

import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign" element={<Sign />} />
       
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
