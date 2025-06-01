"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  styled,
  alpha,
} from "@mui/material";
import { AdminPanelSettings, Lock, Email } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import axios from "../../utils/axiosIntercepter";

const AdminContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const AdminPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 3,
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  maxWidth: 400,
  width: "100%",
}));

const AdminButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
  padding: "12px 24px",
  fontWeight: 600,
  borderRadius: "50px",
  boxShadow: "0 4px 15px rgba(74, 111, 165, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(74, 111, 165, 0.4)",
  },
  "&:disabled": {
    background: theme.palette.grey[300],
    transform: "none",
    boxShadow: "none",
  },
}));

function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/admin-login", credentials);

      if (response.data && response.data.user.role === "admin") {
        login(response.data);
        enqueueSnackbar("Welcome to Admin Panel!", { variant: "success" });
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. Admin privileges required.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContainer>
      <Container maxWidth="sm">
        <AdminPaper elevation={0}>
          <Box textAlign="center" mb={3}>
            <AdminPanelSettings
              sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h4" fontWeight="bold" color="primary">
              Admin Panel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pet Paradise Management System
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Admin Email"
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { borderRadius: "50px" },
              }}
              InputProps={{
                startAdornment: <Email color="action" sx={{ mr: 1 }} />,
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": { borderRadius: "50px" },
              }}
              InputProps={{
                startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
              }}
            />

            <AdminButton
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Access Admin Panel"
              )}
            </AdminButton>
          </Box>

          <Box textAlign="center" mt={3}>
            <Button
              onClick={() => navigate("/")}
              sx={{ color: "text.secondary" }}
            >
              Back to Main Site
            </Button>
          </Box>
        </AdminPaper>
      </Container>
    </AdminContainer>
  );
}

export default AdminLogin;
