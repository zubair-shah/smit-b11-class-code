"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
  styled,
  alpha,
  Link,
} from "@mui/material";
import { Person, Email, Lock } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosIntercepter";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 3,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.background.paper,
      0.95
    )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
    backdropFilter: "blur(20px)",
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    minWidth: 400,
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
  padding: "12px 24px",
  fontWeight: 600,
  borderRadius: "50px",
  boxShadow: "0 4px 15px rgba(74, 111, 165, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(74, 111, 165, 0.3)",
  },
  "&:disabled": {
    background: theme.palette.grey[300],
    transform: "none",
    boxShadow: "none",
  },
}));

function LoginDialog({ open, onClose }) {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/auth/login", {
        email: loginForm.email,
        password: loginForm.password,
      });

      if (response.data) {
        login(response.data);
        onClose();
        enqueueSnackbar("Welcome back!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Login failed. Please try again.",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/auth/sign-up", {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
      });

      if (response.data) {
        signup(response.data);
        onClose();
        enqueueSnackbar("Welcome to Pet Paradise!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFullPageLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleFullPageSignup = () => {
    onClose();
    navigate("/signup");
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome to Pet Paradise
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {tab === 0 ? (
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Email color="action" sx={{ mr: 1 }} />,
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, password: e.target.value }))
              }
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
              }}
            />

            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Link
                component="button"
                type="button"
                onClick={handleFullPageLogin}
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Prefer full page login?
              </Link>
            </Box>

            <GradientButton
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </GradientButton>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={registerForm.name}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Person color="action" sx={{ mr: 1 }} />,
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Email color="action" sx={{ mr: 1 }} />,
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
              }}
            />

            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Link
                component="button"
                type="button"
                onClick={handleFullPageSignup}
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Prefer full page registration?
              </Link>
            </Box>

            <GradientButton
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </GradientButton>
          </Box>
        )}
      </DialogContent>
    </StyledDialog>
  );
}

export default LoginDialog;
