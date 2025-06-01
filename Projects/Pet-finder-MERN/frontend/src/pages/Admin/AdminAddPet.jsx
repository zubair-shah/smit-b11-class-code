"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardMedia,
  IconButton,
  styled,
  alpha,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, CloudUpload, Delete, Add } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import AdminLayout from "../../components/AdminLayout";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 32px rgba(74, 111, 165, 0.1)",
}));

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.dark,
    background: alpha(theme.palette.primary.main, 0.05),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  padding: "12px 32px",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
  borderRadius: "50px",
  padding: "12px 32px",
  fontWeight: 600,
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

// US States for dropdown
const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

function AdminAddPet() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const [petData, setPetData] = useState({
    name: "",
    animal: "",
    breed: "",
    city: "",
    state: "",
    description: "",
    price: "",
    age: "",
    gender: "",
    size: "",
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: "",
  });

  const handleInputChange = (field) => (event) => {
    setPetData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add pet data
      Object.keys(petData).forEach((key) => {
        formData.append(key, petData[key]);
      });

      // Add images
      images.forEach((image, index) => {
        formData.append(`images`, image.file);
      });

      // API call to create pet
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4001/api/admin/pets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        enqueueSnackbar("Pet added successfully!", { variant: "success" });
        navigate("/admin/pets");
      } else {
        throw new Error("Failed to add pet");
      }
    } catch (error) {
      enqueueSnackbar("Failed to add pet. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate("/admin/pets")} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          Add New Pet
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Basic Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pet Name"
                    value={petData.name}
                    onChange={handleInputChange("name")}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Animal Type</InputLabel>
                    <Select
                      value={petData.animal}
                      onChange={handleInputChange("animal")}
                      label="Animal Type"
                    >
                      <MenuItem value="dog">Dog</MenuItem>
                      <MenuItem value="cat">Cat</MenuItem>
                      <MenuItem value="bird">Bird</MenuItem>
                      <MenuItem value="rabbit">Rabbit</MenuItem>
                      <MenuItem value="reptile">Reptile</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Breed"
                    value={petData.breed}
                    onChange={handleInputChange("breed")}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={petData.city}
                    onChange={handleInputChange("city")}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <Select
                      value={petData.state}
                      onChange={handleInputChange("state")}
                      label="State"
                    >
                      {US_STATES.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price ($)"
                    type="number"
                    value={petData.price}
                    onChange={handleInputChange("price")}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    value={petData.description}
                    onChange={handleInputChange("description")}
                    placeholder="Tell us about this pet's personality, habits, and what makes them special..."
                    required
                  />
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Additional Details */}
          <Grid item xs={12} md={4}>
            <StyledPaper sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Additional Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Age</InputLabel>
                    <Select
                      value={petData.age}
                      onChange={handleInputChange("age")}
                      label="Age"
                    >
                      <MenuItem value="baby">Baby</MenuItem>
                      <MenuItem value="young">Young</MenuItem>
                      <MenuItem value="adult">Adult</MenuItem>
                      <MenuItem value="senior">Senior</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={petData.gender}
                      onChange={handleInputChange("gender")}
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Size</InputLabel>
                    <Select
                      value={petData.size}
                      onChange={handleInputChange("size")}
                      label="Size"
                    >
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="large">Large</MenuItem>
                      <MenuItem value="extra-large">Extra Large</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Energy Level</InputLabel>
                    <Select
                      value={petData.energyLevel}
                      onChange={handleInputChange("energyLevel")}
                      label="Energy Level"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="moderate">Moderate</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="very-high">Very High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Vaccinated</InputLabel>
                    <Select
                      value={petData.vaccinated}
                      onChange={handleInputChange("vaccinated")}
                      label="Vaccinated"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Spayed/Neutered</InputLabel>
                    <Select
                      value={petData.spayedNeutered}
                      onChange={handleInputChange("spayedNeutered")}
                      label="Spayed/Neutered"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>House Trained</InputLabel>
                    <Select
                      value={petData.houseTrained}
                      onChange={handleInputChange("houseTrained")}
                      label="House Trained"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Good with Kids</InputLabel>
                    <Select
                      value={petData.goodWithKids}
                      onChange={handleInputChange("goodWithKids")}
                      label="Good with Kids"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Good with Pets</InputLabel>
                    <Select
                      value={petData.goodWithPets}
                      onChange={handleInputChange("goodWithPets")}
                      label="Good with Pets"
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Pet Images
              </Typography>

              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />

              <label htmlFor="image-upload">
                <UploadBox>
                  <CloudUpload
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                  />
                  <Typography variant="h6" color="primary" gutterBottom>
                    Upload Pet Images
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click to select multiple images or drag and drop
                  </Typography>
                </UploadBox>
              </label>

              {images.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {images.map((image) => (
                    <Grid item xs={6} sm={4} md={3} key={image.id}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="120"
                          image={image.preview}
                          alt="Pet preview"
                        />
                        <Box p={1} textAlign="center">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeImage(image.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </StyledPaper>
          </Grid>

          {/* Submit Buttons */}
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <ActionButton
                variant="outlined"
                onClick={() => navigate("/admin/pets")}
              >
                Cancel
              </ActionButton>

              <SaveButton
                type="submit"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Add />}
              >
                {loading ? "Adding Pet..." : "Add Pet"}
              </SaveButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
}

export default AdminAddPet;
