"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Avatar,
  styled,
  alpha,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  CloudUpload,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  padding: "8px 20px",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

function AdminPets() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [animalFilter, setAnimalFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    // Filter pets based on search term, animal, and status
    let filtered = pets;

    if (searchTerm) {
      filtered = filtered.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (animalFilter !== "all") {
      filtered = filtered.filter((pet) => pet.animal === animalFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((pet) => pet.status === statusFilter);
    }

    setFilteredPets(filtered);
  }, [searchTerm, animalFilter, statusFilter, pets]);

  const fetchPets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4001/api/admin/pets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPets(data.pets);
      } else {
        throw new Error("Failed to fetch pets");
      }
    } catch (error) {
      enqueueSnackbar("Failed to load pets", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (pet) => {
    setSelectedPet(pet);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4001/api/admin/pets/${selectedPet.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setPets(pets.filter((pet) => pet.id !== selectedPet.id));
        enqueueSnackbar("Pet deleted successfully", { variant: "success" });
      } else {
        throw new Error("Failed to delete pet");
      }
    } catch (error) {
      enqueueSnackbar("Failed to delete pet", { variant: "error" });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedPet(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "adopted":
        return "info";
      default:
        return "default";
    }
  };

  const getAnimalEmoji = (animal) => {
    switch (animal) {
      case "dog":
        return "🐕";
      case "cat":
        return "🐱";
      case "bird":
        return "🐦";
      case "rabbit":
        return "🐰";
      case "reptile":
        return "🦎";
      default:
        return "🐾";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Typography>Loading pets...</Typography>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Manage Pets
        </Typography>
        <ActionButton
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/admin/pets/add")}
          sx={{
            background: "linear-gradient(135deg, #4a6fa5, #ff9a76)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(135deg, #2d4373, #c7694a)",
            },
          }}
        >
          Add New Pet
        </ActionButton>
      </Box>

      {/* Search and Filters */}
      <StyledPaper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search pets by name, animal, breed, or location..."
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
              label="Animal Type"
              value={animalFilter}
              onChange={(e) => setAnimalFilter(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
            >
              <MenuItem value="all">All Animals</MenuItem>
              <MenuItem value="dog">Dogs</MenuItem>
              <MenuItem value="cat">Cats</MenuItem>
              <MenuItem value="bird">Birds</MenuItem>
              <MenuItem value="rabbit">Rabbits</MenuItem>
              <MenuItem value="reptile">Reptiles</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="adopted">Adopted</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <ActionButton
              variant="outlined"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Export
            </ActionButton>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Pets Table */}
      <StyledPaper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pet</TableCell>
                <TableCell>Animal</TableCell>
                <TableCell>Breed</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPets.map((pet) => (
                <TableRow key={pet.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={
                          pet.images?.[0] ||
                          "/placeholder.svg?height=50&width=50"
                        }
                        alt={pet.name}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography fontWeight="bold">{pet.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <span>{getAnimalEmoji(pet.animal)}</span>
                      <Typography sx={{ textTransform: "capitalize" }}>
                        {pet.animal}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>
                    {pet.city}, {pet.state}
                  </TableCell>
                  <TableCell>${pet.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={pet.status}
                      color={getStatusColor(pet.status)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>
                  <TableCell>{pet.views || 0}</TableCell>
                  <TableCell>
                    {new Date(pet.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/details/${pet.id}`)}
                      title="View Details"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => navigate(`/admin/pets/edit/${pet.id}`)}
                      title="Edit Pet"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(pet)}
                      title="Delete Pet"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredPets.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary">
              No pets found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm || animalFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search criteria"
                : "Start by adding your first pet"}
            </Typography>
          </Box>
        )}
      </StyledPaper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{selectedPet?.name}</strong>
            ? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}

export default AdminPets;
