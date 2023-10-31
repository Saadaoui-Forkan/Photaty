import { Routes, Route } from "react-router-dom";
import Login from "./pages/connection/Login";
import Register from "./pages/connection/Register";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/home/Home";
import ImageDetails from "./pages/image-details/ImageDetails";
import Profile from './pages/profile/Profile'
import ShareImage from "./pages/share-image/ShareImage";
import MyPhotos from "./pages/my-photos/MyPhotos";
import EditImage from "./pages/edit-image/EditImage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/share-image" element={<ShareImage />} />
        <Route path="/my-photos" element={<MyPhotos />} />
        <Route path="/edit-photo" element={<EditImage />} />
        <Route path="/:imgId" element={<ImageDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
