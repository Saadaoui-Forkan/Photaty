import { Routes, Route } from "react-router-dom";
import Login from "./pages/connection/Login";
import Register from "./pages/connection/Register";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/home/Home";
import ImageDetails from "./pages/image-details/ImageDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="image" element={<ImageDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
