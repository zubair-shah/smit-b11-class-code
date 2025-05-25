import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Avatar,
  Grid,
  Container,
  styled,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import useBreedList from "../hooks/useBreedList";
import Results_2 from "./Results_2";
import fetchSearch from "../helper/fetchSearch";
import { apiUrl } from "../config/apiUrl";
import AdoptedPetContext from "../../context/AdoptedPetContext";
import PetsIcon from "@mui/icons-material/Pets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";

// Custom theme
const petAdoptionTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4a6fa5", // Deep blue
    },
    secondary: {
      main: "#ff9a76", // Salmon
    },
    background: {
      default: "#f8f9fa", // Light gray
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3436", // Dark gray
      secondary: "#636e72", // Medium gray
    },
  },
  typography: {
    fontFamily: ['"Poppins"', "sans-serif"].join(","),
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

const ANIMALS = ["Select an Option", "bird", "cat", "dog", "rabbit", "reptile"];

// Styled components
const SearchForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 32px rgba(69, 111, 165, 0.1)",
  background: theme.palette.background.paper,
  marginBottom: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
  padding: "12px 32px",
  fontWeight: 600,
  borderRadius: "50px",
  boxShadow: "0 4px 15px rgba(74, 111, 165, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(74, 111, 165, 0.3)",
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
  padding: theme.spacing(6, 0),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
}));

function SearchParams_2() {
  const [animal, setAnimal] = useState("");
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [breeds, status] = useBreedList(animal);

  const results = useQuery([requestParams, "zubair", "ali"], fetchSearch);
  const pets = results?.data?.pets ?? [];

  const handleAnimalChange = (e) => {
    setAnimal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get("animal") ?? "",
      location: formData.get("location") ?? "",
      breed: formData.get("breed") ?? "",
    };
    setRequestParams(obj);
  };

  return (
    <ThemeProvider theme={petAdoptionTheme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <HeroSection>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 700, color: "primary.contrastText" }}
          >
            Find Your Perfect Pet Companion
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "primary.contrastText", opacity: 0.9 }}
          >
            Thousands of pets are waiting for their forever homes
          </Typography>
          <NaturePeopleIcon
            sx={{ fontSize: 60, color: "primary.contrastText", mt: 2 }}
          />
        </HeroSection>

        <Grid container spacing={4}>
          {/* Adopted Pet Display */}
          {adoptedPet && (
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: petAdoptionTheme.shape.borderRadius * 2,
                  background: `linear-gradient(135deg, ${petAdoptionTheme.palette.secondary.light} 0%, ${petAdoptionTheme.palette.background.paper} 100%)`,
                  textAlign: "center",
                  border: `1px solid ${petAdoptionTheme.palette.divider}`,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Your Adopted Pet
                </Typography>
                <Avatar
                  src={adoptedPet.images[0]}
                  alt={adoptedPet.name}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: "0 auto",
                    border: `3px solid ${petAdoptionTheme.palette.primary.main}`,
                  }}
                />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                  {adoptedPet.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {adoptedPet.breed} • {adoptedPet.animal}
                </Typography>
              </Paper>
            </Grid>
          )}

          {/* Search Form */}
          <Grid item xs={12}>
            <SearchForm elevation={3}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      placeholder="Enter location"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <LocationOnIcon color="action" sx={{ mr: 1 }} />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Animal"
                      name="animal"
                      value={animal}
                      onChange={handleAnimalChange}
                      onBlur={handleAnimalChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <PetsIcon color="action" sx={{ mr: 1 }} />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px",
                        },
                      }}
                    >
                      {ANIMALS.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      fullWidth
                      label={
                        status === "loading" ? "Loading breeds..." : "Breed"
                      }
                      name="breed"
                      disabled={!breeds.length}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px",
                        },
                      }}
                    >
                      {breeds.map((breed, index) => (
                        <MenuItem key={index} value={breed}>
                          {breed}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <GradientButton
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SearchIcon />}
                      disabled={results.isLoading}
                    >
                      {results.isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Find Pets"
                      )}
                    </GradientButton>
                  </Grid>
                </Grid>
              </form>
            </SearchForm>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Available Pets
              </Typography>
              <Results_2 pets={pets} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default SearchParams_2;
