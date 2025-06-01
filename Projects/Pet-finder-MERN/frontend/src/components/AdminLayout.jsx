"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  styled,
  alpha,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Pets,
  ShoppingCart,
  People,
  Analytics,
  Settings,
  Logout,
  Notifications,
  Add,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 280;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: "0 4px 20px rgba(74, 111, 165, 0.15)",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    background: `linear-gradient(180deg, ${alpha(
      theme.palette.background.paper,
      0.98
    )} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
    backdropFilter: "blur(20px)",
    border: "none",
    boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledListItem = styled(ListItemButton)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius * 2,
  transition: "all 0.3s ease",
  ...(active && {
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0.15
    )} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
    color: theme.palette.primary.main,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  }),
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0.1
    )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
    transform: "translateX(4px)",
  },
}));

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
  { text: "Manage Pets", icon: <Pets />, path: "/admin/pets" },
  { text: "Add Pet", icon: <Add />, path: "/admin/pets/add" },
  { text: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
  // { text: "Users", icon: <People />, path: "/admin/users" },
  // { text: "Analytics", icon: <Analytics />, path: "/admin/analytics" },
  // { text: "Settings", icon: <Settings />, path: "/admin/settings" },
];

function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    handleMenuClose();
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Pet Paradise
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Admin Panel
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <StyledListItem
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <StyledAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
            <Avatar
              alt={auth?.user?.name}
              sx={{
                bgcolor: "secondary.main",
                border: "2px solid white",
              }}
            >
              {auth?.user?.name?.charAt(0)}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Typography>{auth?.user?.name}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {drawer}
        </StyledDrawer>

        <StyledDrawer
          variant="permanent"
          sx={{ display: { xs: "none", md: "block" } }}
          open
        >
          {drawer}
        </StyledDrawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
