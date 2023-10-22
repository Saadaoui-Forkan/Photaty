import { Routes, Route } from "react-router-dom";
import Login from "./pages/connection/Login";
import Register from "./pages/connection/Register";


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  );
}

export default App;
