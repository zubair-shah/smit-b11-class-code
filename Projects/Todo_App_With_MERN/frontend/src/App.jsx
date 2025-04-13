// import "../assets/css/style.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <div>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
};

export default App;
