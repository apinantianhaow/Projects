import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Firstpages from "./pages/Firstpages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstpages />} />
      </Routes>
    </Router>
  );
}

export default App;
