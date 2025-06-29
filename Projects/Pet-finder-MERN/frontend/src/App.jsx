// import "../assets/css/style.css";
// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Home from "./pages/Home";
// import LoginPage from "./components/LoginPage";
// import Details from './pages/Details'
// import AdoptedPetContext from "../context/AdoptedPetContext";
// import {AuthProvider} from ".././context/AuthContext"
// import SignUp from "./components/SignUp"
// const queryClient = new QueryClient();
// const App = () => {
//   const adoptedPet = useState(null);
//   return (
//     <div className="p-0 m-0" style={{
//       background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)"
//     }}>
//       <React.StrictMode>
//         <BrowserRouter>
//           <QueryClientProvider client={queryClient}>
//             <AdoptedPetContext.Provider value={adoptedPet}>
//               <AuthProvider>
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/details/:id" element={<Details />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/signup" element={<SignUp />} />
//               </Routes>
//               </AuthProvider>
//             </AdoptedPetContext.Provider>
//           </QueryClientProvider>
//         </BrowserRouter>
//       </React.StrictMode>
//     </div>
//   );
// };

// export default App;

import "../assets/css/style.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LoginPage from "./components/LoginPage";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminPets from "./pages/Admin/AdminPets";
import AdminPetsAdd from "./pages/Admin/AdminAddPet";
import Details from "./pages/Details";
import Enhanced_Details from "./pages/Enhanced_Details";
// import Checkout from "./pages/Checkout"
import AdoptedPetContext from "./context/AdoptedPetContext";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./components/SignUp";
import New_Home from "./pages/New_Home";
// import Home from "./pages/Home";

const queryClient = new QueryClient();

// Enhanced theme matching your design
const petAdoptionTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4a6fa5",
      light: "#7a9bd1",
      dark: "#2d4373",
    },
    secondary: {
      main: "#ff9a76",
      light: "#ffcba4",
      dark: "#c7694a",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3436",
      secondary: "#636e72",
    },
  },
  typography: {
    fontFamily: ['"Poppins"', '"Montserrat"', "sans-serif"].join(","),
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 20px",
        },
      },
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div
      className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <React.StrictMode>
        <ThemeProvider theme={petAdoptionTheme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            autoHideDuration={1000}
          >
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <AdoptedPetContext.Provider value={adoptedPet}>
                  <AuthProvider>
                    <Routes>
                      <Route path="/" element={<New_Home />} />
                      {/* <Route path="/" element={<Home />} /> */}
                      {/* <Route path="/details/:id" element={<Details />} /> */}
                      <Route
                        path="/details/:id"
                        element={<Enhanced_Details />}
                      />
                      {/* <Route path="/checkout" element={<Checkout />} /> */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignUp />} />

                      {/* Admin Routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                      />
                      <Route path="/admin/pets" element={<AdminPets />} />
                      <Route
                        path="/admin/pets/add"
                        element={<AdminPetsAdd />}
                      />
                      <Route path="*" element={<LoginPage />} />
                    </Routes>
                  </AuthProvider>
                </AdoptedPetContext.Provider>
              </QueryClientProvider>
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </React.StrictMode>
    </div>
  );
};

export default App;
