// import "../assets/css/style.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import ResponsiveAppBar from "./components/Navbar";
const App = () => {
  return (
    <div>
      <React.StrictMode>
        <AuthProvider>
          <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </React.StrictMode>
    </div>
  );
};

export default App;
