import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Sign from "./pages/Sign";
import CategoryPage from "./pages/CategoryPage";
import Information from "./pages/information";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/information" element={<Information />} />
      </Routes>
    </Router>
  );
}

export default App;
