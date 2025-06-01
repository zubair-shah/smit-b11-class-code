import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axiosIntercepter";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper,
  styled,
  alpha,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import { Person, Email, Lock, Pets } from "@mui/icons-material";

// Enhanced theme matching your design
const theme = createTheme({
  palette: {
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
  },
  typography: {
    fontFamily: ['"Poppins"', '"Montserrat"', "sans-serif"].join(","),
  },
  shape: {
    borderRadius: 12,
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: "0 8px 32px rgba(74, 111, 165, 0.15)",
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

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  gap: theme.spacing(1),
}));

const SignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/sign-up", {
        name: fullName,
        email,
        password,
      });

      if (response.data) {
        signup(response.data);
        enqueueSnackbar("Welcome to Pet Paradise!", { variant: "success" });
        navigate("/");
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <StyledPaper elevation={0}>
            <LogoContainer>
              <Pets sx={{ fontSize: 40, color: "primary.main" }} />
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Pet Paradise
              </Typography>
            </LogoContainer>

            <Typography
              component="h1"
              variant="h5"
              align="center"
              fontWeight="bold"
              sx={{ mb: 3, color: "text.primary" }}
            >
              Join Our Community
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoFocus
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />,
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <Email color="action" sx={{ mr: 1 }} />,
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <GradientButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </GradientButton>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </StyledPaper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignUpPage;
