 import React from "react";
 import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
 import Navbar from "./components/Navbar";
 import UploadPage from "./pages/UploadPage";

 const Home = () => <h1>Home Page</h1>;

 function App(){
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path ="/" element={<Home />} />
                <Route path="/upload" element={<UploadPage />} />
            </Routes>
        </Router>
    );

 };
export default App;