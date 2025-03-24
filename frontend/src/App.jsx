import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Sign from "./pages/Sign";
import CategoryPage from "./pages/CategoryPage";
import Information from "./pages/information.jsx";
import UploadPage from "./pages/UploadPage";
import Profile from "./pages/Profile";
import Profile2 from "./pages/Profile2";
import RegisterUsername from "./pages/RegisterUsername";
import RegisterPhoto from "./pages/RegisterPhoto.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile2" element={<Profile2 />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/uploadpage" element={<UploadPage />} />
        <Route path="/:category/:title" element={<Information />} />
        <Route path="/registerUsername" element={<RegisterUsername />} />
        <Route path="/registerPhoto" element={<RegisterPhoto />} /> 
      </Routes>
    </Router>
  );
}

export default App;
