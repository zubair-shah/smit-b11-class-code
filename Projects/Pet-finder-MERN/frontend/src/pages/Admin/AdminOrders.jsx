"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  styled,
  alpha,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Search,
  GetApp,
  CheckCircle,
  Cancel,
  Schedule,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import AdminLayout from "../../components/AdminLayout";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 32px rgba(74, 111, 165, 0.1)",
}));

const StatusCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(74, 111, 165, 0.15)",
  },
}));

// Mock orders data
const mockOrders = [
  {
    id: "ORD001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
    },
    pet: {
      name: "Max",
      breed: "Golden Retriever",
      image: "/placeholder.svg?height=50&width=50",
    },
    amount: 850,
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2024-01-15T10:30:00Z",
    shippingAddress: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
    },
  },
  {
    id: "ORD002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
    },
    pet: {
      name: "Luna",
      breed: "Persian Cat",
      image: "/placeholder.svg?height=50&width=50",
    },
    amount: 650,
    status: "pending",
    paymentStatus: "paid",
    createdAt: "2024-01-14T15:45:00Z",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
    },
  },
  {
    id: "ORD003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
    },
    pet: {
      name: "Buddy",
      breed: "Labrador",
      image: "/placeholder.svg?height=50&width=50",
    },
    amount: 750,
    status: "processing",
    paymentStatus: "paid",
    createdAt: "2024-01-13T09:15:00Z",
    shippingAddress: {
      street: "789 Pine St",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
    },
  },
];

function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Filter orders based on search and status
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.pet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // API call to update order status
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4001/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        enqueueSnackbar("Order status updated successfully", {
          variant: "success",
        });
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      enqueueSnackbar("Failed to update order status", { variant: "error" });
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
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle />;
      case "pending":
        return <Schedule />;
      case "processing":
        return <Schedule />;
      case "cancelled":
        return <Cancel />;
      default:
        return <Schedule />;
    }
  };

  const orderStats = {
    total: orders.length,
    completed: orders.filter((o) => o.status === "completed").length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
  };

  return (
    <AdminLayout>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Order Management
      </Typography>

      {/* Order Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {orderStats.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Orders
              </Typography>
            </CardContent>
          </StatusCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatusCard>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {orderStats.completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </StatusCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatusCard>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {orderStats.pending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </StatusCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatusCard>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {orderStats.processing}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Processing
              </Typography>
            </CardContent>
          </StatusCard>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <StyledPaper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search orders by ID, customer, or pet name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              startIcon={<GetApp />}
              fullWidth
              sx={{
                borderRadius: "50px",
                height: "56px",
              }}
            >
              Export Orders
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Orders Table */}
      <StyledPaper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Pet</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography fontWeight="bold">{order.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography fontWeight="bold">
                        {order.customer.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.customer.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <img
                        src={order.pet.image || "/placeholder.svg"}
                        alt={order.pet.name}
                        style={{ width: 40, height: 40, borderRadius: 8 }}
                      />
                      <Box>
                        <Typography fontWeight="bold">
                          {order.pet.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.pet.breed}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">${order.amount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedOrder(order);
                        setOrderDetailOpen(true);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => handleStatusChange(order.id, "processing")}
                      disabled={order.status === "completed"}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredOrders.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary">
              No orders found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search criteria"
                : "No orders yet"}
            </Typography>
          </Box>
        )}
      </StyledPaper>

      {/* Order Detail Dialog */}
      <Dialog
        open={orderDetailOpen}
        onClose={() => setOrderDetailOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Order Details - {selectedOrder?.id}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Customer Information
                </Typography>
                <Typography variant="body2">
                  Name: {selectedOrder.customer.name}
                </Typography>
                <Typography variant="body2">
                  Email: {selectedOrder.customer.email}
                </Typography>
                <Typography variant="body2">
                  Phone: {selectedOrder.customer.phone}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: 2 }}
                >
                  Shipping Address
                </Typography>
                <Typography variant="body2">
                  {selectedOrder.shippingAddress.street}
                </Typography>
                <Typography variant="body2">
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.state}{" "}
                  {selectedOrder.shippingAddress.zipCode}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Pet Information
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <img
                    src={selectedOrder.pet.image || "/placeholder.svg"}
                    alt={selectedOrder.pet.name}
                    style={{ width: 60, height: 60, borderRadius: 8 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">
                      {selectedOrder.pet.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedOrder.pet.breed}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Order Summary
                </Typography>
                <Typography variant="body2">
                  Amount: ${selectedOrder.amount}
                </Typography>
                <Typography variant="body2">
                  Status:{" "}
                  <Chip
                    label={selectedOrder.status}
                    color={getStatusColor(selectedOrder.status)}
                    size="small"
                  />
                </Typography>
                <Typography variant="body2">
                  Payment: {selectedOrder.paymentStatus}
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Update Order Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant={
                        selectedOrder.status === "pending"
                          ? "contained"
                          : "outlined"
                      }
                      color="warning"
                      onClick={() =>
                        handleStatusChange(selectedOrder.id, "pending")
                      }
                    >
                      Pending
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant={
                        selectedOrder.status === "processing"
                          ? "contained"
                          : "outlined"
                      }
                      color="info"
                      onClick={() =>
                        handleStatusChange(selectedOrder.id, "processing")
                      }
                    >
                      Processing
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant={
                        selectedOrder.status === "completed"
                          ? "contained"
                          : "outlined"
                      }
                      color="success"
                      onClick={() =>
                        handleStatusChange(selectedOrder.id, "completed")
                      }
                    >
                      Completed
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant={
                        selectedOrder.status === "cancelled"
                          ? "contained"
                          : "outlined"
                      }
                      color="error"
                      onClick={() =>
                        handleStatusChange(selectedOrder.id, "cancelled")
                      }
                    >
                      Cancelled
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDetailOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}

export default AdminOrders;
