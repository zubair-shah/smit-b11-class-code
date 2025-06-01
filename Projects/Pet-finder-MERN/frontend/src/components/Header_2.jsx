"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  styled,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { keyframes } from "@emotion/react";
import PetsIcon from "@mui/icons-material/Pets";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CartIcon from "./CartIcon";
import CartDrawer from "./CartDrawer";
import LoginDialog from "./LoginDialog";

// Your existing animations and styled components
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.9)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.9)} 50%, 
    ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
  backgroundSize: "300% 300%",
  animation: `${gradientAnimation} 12s ease infinite`,
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  boxShadow: `0 4px 30px ${alpha(theme.palette.primary.dark, 0.2)}`,
  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  "&.scrolled": {
    padding: theme.spacing(0.5, 0),
    backgroundSize: "200% 200%",
    boxShadow: `0 2px 15px ${alpha(theme.palette.primary.dark, 0.1)}`,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, 
    ${theme.palette.common.white}, 
    ${theme.palette.secondary.light})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: 800,
  letterSpacing: ".3rem",
  textDecoration: "none",
  transition: "all 0.3s ease",
  fontFamily: '"Montserrat", sans-serif',
  textShadow: `0 2px 4px ${alpha(theme.palette.primary.dark, 0.3)}`,
  "&:hover": {
    transform: "scale(1.05)",
    textShadow: `0 4px 8px ${alpha(theme.palette.primary.dark, 0.4)}`,
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1.5),
  position: "relative",
  fontWeight: 600,
  letterSpacing: "0.5px",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 6,
    left: 0,
    width: 0,
    height: "3px",
    background: theme.palette.common.white,
    borderRadius: 3,
    transition: "width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  },
  "&:hover::after": {
    width: "100%",
  },
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 8,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "0 4px",
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}));

const pages = ["Home", "Adopt", "Services", "About"];
const settings = ["Profile", "Dashboard", "Favorites", "Messages"];

function Header_2() {
  const { logout, auth } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount] = useState(3);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCartClick = () => {
    if (!auth?.user) {
      setLoginOpen(true);
      return;
    }
    setCartOpen(true);
  };

  const handleLoginRequired = () => {
    setLoginOpen(true);
  };

  return (
    <>
      <StyledAppBar position="fixed" className={scrolled ? "scrolled" : ""}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: scrolled ? 0.5 : 1 }}>
            {/* Desktop Logo with Animation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 2,
                alignItems: "center",
                animation: `${floatAnimation} 6s ease-in-out infinite`,
              }}
            >
              <Avatar
                alt="Company Logo"
                src="/logo.png"
                sx={{
                  mr: 1.5,
                  bgcolor: "secondary.main",
                  width: 44,
                  height: 44,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "rotate(15deg)",
                  },
                }}
              />
              <LogoText
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                PETPARADISE
              </LogoText>
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  p: 1.5,
                  background: alpha("#ffffff", 0.1),
                  backdropFilter: "blur(5px)",
                  borderRadius: "12px",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiPaper-root": {
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    minWidth: 200,
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      "&:hover": {
                        background: alpha("#4a6fa5", 0.1),
                      },
                    }}
                  >
                    <Typography textAlign="center" sx={{ fontWeight: 500 }}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PetsIcon
                sx={{
                  mr: 1,
                  fontSize: 32,
                  color: "common.white",
                }}
              />
              <LogoText
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: "flex", md: "none" },
                  fontSize: "1.4rem",
                  letterSpacing: ".15rem",
                }}
              >
                PETS
              </LogoText>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                ml: 8,
              }}
            >
              {pages.map((page) => (
                <NavButton
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  {page}
                </NavButton>
              ))}
            </Box>

            {/* User Menu with Cart and Notifications */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Cart Icon */}
              <CartIcon onClick={handleCartClick} />

              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton
                  sx={{
                    color: "common.white",
                    p: 1.25,
                    background: alpha("#ffffff", 0.1),
                    backdropFilter: "blur(5px)",
                    borderRadius: "12px",
                    "&:hover": {
                      background: alpha("#ffffff", 0.2),
                    },
                  }}
                >
                  <StyledBadge
                    badgeContent={notificationCount}
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </StyledBadge>
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              {auth?.user ? (
                <Tooltip title="Account settings">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: "pointer",
                    }}
                    onClick={handleOpenUserMenu}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "common.white",
                        display: { xs: "none", sm: "block" },
                        fontWeight: 600,
                        letterSpacing: "0.3px",
                        textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    >
                      {auth.user.name || "Welcome"}
                    </Typography>
                    <Avatar
                      alt={auth.user.name}
                      src={auth.user.avatar || "/default-avatar.jpg"}
                      sx={{
                        width: 42,
                        height: 42,
                        border: "2px solid white",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                    />
                  </Box>
                </Tooltip>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => setLoginOpen(true)}
                  sx={{
                    color: "white",
                    borderColor: "white",
                    borderRadius: "50px",
                    px: 3,
                    "&:hover": {
                      borderColor: "white",
                      background: alpha("#ffffff", 0.1),
                    },
                  }}
                >
                  Login
                </Button>
              )}

              {/* User Menu Dropdown */}
              <Menu
                sx={{ mt: "50px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    background: "rgba(255, 255, 255, 0.97)",
                    backdropFilter: "blur(20px)",
                    minWidth: 200,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    "& .MuiMenuItem-root": {
                      padding: "12px 20px",
                      "&:hover": {
                        background: alpha("#4a6fa5", 0.08),
                      },
                    },
                  },
                }}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{ fontWeight: 500 }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                  <Typography
                    textAlign="center"
                    sx={{
                      fontWeight: 500,
                      color: "error.main",
                    }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onLoginRequired={handleLoginRequired}
      />

      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default Header_2;
