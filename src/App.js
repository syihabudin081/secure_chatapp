
import "./App.css";
import Login from "./pages/Login";
import "flowbite";
import Register from "./pages/Register";
import Chatpage from "./pages/Chatpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Register />}/>
          <Route path="/chatpage" element={<Chatpage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
