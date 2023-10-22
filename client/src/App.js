import { Routes, Route } from "react-router-dom";
import Login from "./pages/connection/Login";
import Register from "./pages/connection/Register";
import NotFound from "./pages/not-found/NotFound";


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
