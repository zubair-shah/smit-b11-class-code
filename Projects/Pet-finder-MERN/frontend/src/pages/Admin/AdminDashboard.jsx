"use client";

import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  styled,
  alpha,
} from "@mui/material";
import {
  Pets,
  ShoppingCart,
  People,
  Visibility,
  Edit,
  AttachMoney,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminLayout from "../../components/AdminLayout";
import { useSnackbar } from "notistack";

const StatsCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(74, 111, 165, 0.15)",
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
  color: "white",
  marginBottom: theme.spacing(2),
}));

// Mock data
const salesData = [
  { name: "Jan", sales: 4000, adoptions: 24 },
  { name: "Feb", sales: 3000, adoptions: 18 },
  { name: "Mar", sales: 5000, adoptions: 32 },
  { name: "Apr", sales: 4500, adoptions: 28 },
  { name: "May", sales: 6000, adoptions: 38 },
  { name: "Jun", sales: 5500, adoptions: 35 },
];

const petTypeData = [
  { name: "Dogs", value: 45, color: "#4a6fa5" },
  { name: "Cats", value: 30, color: "#ff9a76" },
  { name: "Birds", value: 15, color: "#66bb6a" },
  { name: "Others", value: 10, color: "#ffa726" },
];

const recentOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    pet: "Golden Retriever - Max",
    amount: 850,
    status: "completed",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    pet: "Persian Cat - Luna",
    amount: 650,
    status: "pending",
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    pet: "Labrador - Buddy",
    amount: 750,
    status: "processing",
  },
  {
    id: "ORD004",
    customer: "Sarah Wilson",
    pet: "Siamese Cat - Milo",
    amount: 600,
    status: "completed",
  },
  {
    id: "ORD005",
    customer: "Tom Brown",
    pet: "German Shepherd - Rex",
    amount: 900,
    status: "pending",
  },
];

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPets: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Mock API calls - replace with actual endpoints
      setStats({
        totalPets: 156,
        totalOrders: 89,
        totalUsers: 234,
        totalRevenue: 45670,
      });
    } catch (error) {
      enqueueSnackbar("Failed to load dashboard stats", { variant: "error" });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "processing":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <AdminLayout>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent>
              <IconWrapper color="primary">
                <Pets fontSize="large" />
              </IconWrapper>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {stats.totalPets}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Pets
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent>
              <IconWrapper color="secondary">
                <ShoppingCart fontSize="large" />
              </IconWrapper>
              <Typography variant="h4" fontWeight="bold" color="secondary">
                {stats.totalOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Orders
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent>
              <IconWrapper color="info">
                <People fontSize="large" />
              </IconWrapper>
              <Typography variant="h4" fontWeight="bold" color="info">
                {stats.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent>
              <IconWrapper color="success">
                <AttachMoney fontSize="large" />
              </IconWrapper>
              <Typography variant="h4" fontWeight="bold" color="success">
                ${stats.totalRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Revenue
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Sales & Adoptions Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#4a6fa5"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="adoptions"
                    stroke="#ff9a76"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Pet Types Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={petTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {petTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <StatsCard>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recent Orders
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Pet</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell fontWeight="bold">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.pet}</TableCell>
                    <TableCell>${order.amount}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StatsCard>
    </AdminLayout>
  );
}

export default AdminDashboard;
