import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/connection/Login";
import Register from "./pages/connection/Register";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/home/Home";
import ImageDetailsPage from "./pages/image-details/ImageDetailsPage";
import Profile from './pages/profile/Profile'
import ShareImage from "./pages/share-image/ShareImage";
import MyPhotos from "./pages/my-photos/MyPhotos";
import EditImage from "./pages/edit-image/EditImage";
import Footer from "./components/footer/Footer";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={user ? <Profile />: <Navigate to="/login"/>} />
        <Route path="/share-image" element={user ? <ShareImage /> : <Navigate to="/login"/>} />
        <Route path="/my-photos" element={user ? <MyPhotos /> : <Navigate to="/login"/>} />
        <Route path="/edit-photo/:photo" element={user ? <EditImage /> : <Navigate to="/login"/>} />
        <Route path="/:imgId" element={<ImageDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
