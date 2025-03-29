import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext.jsx";
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
import Forgetpassword from "./pages/Forgetpassword.jsx";
import Resetpassword from "./pages/Resetpassword.jsx";
import RouteWrapper from "./pages/RouteWrapper.jsx";
import ScrollToTop from "./components/ScrollToTop";
import PostprofileuserId from "./components/PostprofileuserId";
import EditItem from "./components/EditItem.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile2/:userId" element={<Profile2 />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/uploadpage" element={<UploadPage />} />
          <Route path="/items/:category/:titleSlug" element={<Information />} />
          <Route path="/registerUsername" element={<RegisterUsername />} />
          <Route path="/registerPhoto" element={<RegisterPhoto />} />
          <Route path="/forget-password" element={<Forgetpassword />} />
          <Route path="/reset-password" element={<Resetpassword />} />
          <Route path="/chat/:currentUserId/:chattingWithId" element={<RouteWrapper />} />
          <Route path="/postprofile/:userId/:category?" element={<PostprofileuserId />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default App;