"use client";

import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  styled,
  alpha,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  Pets,
  CalendarToday,
  Male,
  Female,
  ShoppingCart,
  ArrowBack,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import AdoptedPetContext from "../context/AdoptedPetContext";
import Header_2 from "../components/Header_2";
import Footer from "../components/Footer";
import CartButton from "../components/CartButton";
import LoginDialog from "../components/LoginDialog";

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
  padding: theme.spacing(8, 0, 4),
  marginTop: theme.spacing(8), // Account for fixed header
}));

const PetImage = styled(CardMedia)(({ theme }) => ({
  height: 500,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const ThumbnailImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: 80,
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transition: "all 0.3s ease",
  border: "2px solid transparent",
  "&:hover": {
    border: `2px solid ${theme.palette.primary.main}`,
    transform: "scale(1.05)",
  },
  "&.active": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: "0 8px 32px rgba(74, 111, 165, 0.1)",
}));

const AdoptButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
  color: "white",
  padding: "16px 32px",
  fontSize: "1.1rem",
  fontWeight: 700,
  borderRadius: "50px",
  boxShadow: "0 6px 20px rgba(255, 154, 118, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 25px rgba(255, 154, 118, 0.4)",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  padding: "12px 24px",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: "50px",
  padding: "8px 20px",
  fontWeight: 600,
  color: theme.palette.primary.main,
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.1),
  },
}));

// Mock function to fetch pet details
const fetchPetDetails = async ({ queryKey }) => {
  const [, petId] = queryKey;
  try {
    const response = await fetch(
      `https://pets-v2.dev-apis.com/pets?id=${petId}`
    );
    if (!response.ok) {
      throw new Error("Pet not found");
    }
    const data = await response.json();
    console.log("Fetched pet data:", data);
    return data.pets[0];
  } catch (error) {
    // Fallback mock data if API fails
    return {
      id: petId,
      name: "Buddy",
      species: "Dog",
      breeds: { primary: "Golden Retriever" },
      age: "Adult",
      gender: "Male",
      size: "Large",
      description:
        "Buddy is a friendly and energetic dog who loves to play fetch and go on long walks. He's great with kids and other pets, making him the perfect addition to any family.",
      photos: [
        {
          large: "/placeholder.svg?height=500&width=600",
          medium: "/placeholder.svg?height=300&width=400",
        },
        {
          large: "/placeholder.svg?height=500&width=600",
          medium: "/placeholder.svg?height=300&width=400",
        },
        {
          large: "/placeholder.svg?height=500&width=600",
          medium: "/placeholder.svg?height=300&width=400",
        },
      ],
      contact: {
        address: { city: "San Francisco, CA" },
      },
    };
  }
};

function Enhanced_Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  const [favorite, setFavorite] = useState(false);
  const [adoptDialogOpen, setAdoptDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [adopting, setAdopting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const {
    data: pet,
    isLoading,
    error,
  } = useQuery(["pet", id], fetchPetDetails);

  const petPrice = Math.floor(Math.random() * 1000) + 200; // Mock price

  const handleFavorite = () => {
    if (!auth?.user) {
      setLoginDialogOpen(true);
      return;
    }
    setFavorite(!favorite);
    enqueueSnackbar(
      favorite ? "Removed from favorites" : "Added to favorites",
      {
        variant: favorite ? "info" : "success",
      }
    );
  };

  const handleAdopt = () => {
    if (!auth?.user) {
      setLoginDialogOpen(true);
      return;
    }
    setAdoptDialogOpen(true);
  };

  const confirmAdopt = async () => {
    setAdopting(true);

    try {
      // Add to cart first
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          petId: pet.id,
          petName: pet.name,
          petPrice: petPrice,
          petImage:
            pet.photos?.[0]?.large ||
            pet.photos?.[0]?.medium ||
            "/placeholder.svg?height=300&width=400",
          quantity: 1,
        }),
      });

      if (response.ok) {
        // Set as adopted pet in context
        setAdoptedPet(pet);

        enqueueSnackbar(
          `🎉 ${pet.name} has been added to your cart! Complete the adoption process in checkout.`,
          {
            variant: "success",
            autoHideDuration: 6000,
          }
        );

        setAdoptDialogOpen(false);

        // Navigate to checkout
        setTimeout(() => {
          navigate("/checkout");
        }, 1500);
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      enqueueSnackbar("Failed to start adoption process. Please try again.", {
        variant: "error",
      });
    } finally {
      setAdopting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meet ${pet?.name}`,
        text: `Check out this adorable ${pet?.species} looking for a home!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
    }
  };

  const handleLoginRequired = () => {
    setLoginDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !pet) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" color="error" gutterBottom>
          Pet Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The pet you're looking for doesn't exist or has been removed.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ borderRadius: "50px" }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const images = pet.images || [
    {
      large: "/placeholder.svg?height=500&width=600",
      medium: "/placeholder.svg?height=300&width=400",
    },
  ];
  console.log("images", images);
  return (
    <>
      <Header_2 />

      <HeroSection>
        <Container maxWidth="lg">
          <BackButton startIcon={<ArrowBack />} onClick={() => navigate("/")}>
            Back to Pets
          </BackButton>

          <Grid container spacing={4}>
            {/* Pet Images */}
            <Grid item xs={12} md={6}>
              <PetImage
                image={
                  images[selectedImageIndex] ||
                  "/placeholder.svg?height=500&width=600"
                }
                title={pet.name}
                onClick={() => {}}
              />

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    {images.slice(0, 4).map((photo, index) => {
                      console.log("photo", photo);
                      return (
                        <Grid item xs={3} key={index}>
                          <ThumbnailImage
                            src={photo || "/placeholder.svg?height=80&width=80"}
                            alt={`${pet.name} ${index + 1}`}
                            className={
                              selectedImageIndex === index ? "active" : ""
                            }
                            onClick={() => setSelectedImageIndex(index)}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              )}
            </Grid>

            {/* Pet Information */}
            <Grid item xs={12} md={6}>
              <InfoCard elevation={0}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={2}
                >
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    {pet.name}
                  </Typography>
                  <Chip
                    label={`$${petPrice}`}
                    color="secondary"
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      padding: "8px 16px",
                      height: "auto",
                    }}
                  />
                </Box>

                <Box display="flex" gap={1} mb={3} flexWrap="wrap">
                  <Chip
                    icon={<Pets />}
                    label={pet.species}
                    color="primary"
                    variant="outlined"
                  />
                  {pet.breeds?.primary && (
                    <Chip
                      label={pet.breeds.primary}
                      color="secondary"
                      variant="outlined"
                    />
                  )}
                  <Chip
                    icon={pet.gender === "Male" ? <Male /> : <Female />}
                    label={pet.gender}
                    variant="outlined"
                  />
                  <Chip
                    icon={<CalendarToday />}
                    label={pet.age}
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body1" color="text.secondary" paragraph>
                  {pet.description ||
                    "This adorable pet is looking for a loving forever home. They would make a wonderful addition to any family!"}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Pet Details */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Size
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {pet.size || "Medium"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                      {pet.contact?.address?.city || "Available"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Good with
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      Kids & Pets
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Energy Level
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      High
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Action Buttons */}
                <Box display="flex" gap={2} mb={3}>
                  <ActionButton
                    variant="outlined"
                    startIcon={favorite ? <Favorite /> : <FavoriteBorder />}
                    onClick={handleFavorite}
                    color={favorite ? "error" : "primary"}
                  >
                    {favorite ? "Favorited" : "Favorite"}
                  </ActionButton>

                  <ActionButton
                    variant="outlined"
                    startIcon={<Share />}
                    onClick={handleShare}
                  >
                    Share
                  </ActionButton>
                </Box>

                {/* Cart and Adopt Buttons */}
                <Box display="flex" flexDirection="column" gap={2}>
                  <CartButton
                    petId={pet.id}
                    petName={pet.name}
                    petPrice={petPrice}
                    petImage={
                      images[0]?.large ||
                      images[0]?.medium ||
                      "/placeholder.svg?height=300&width=400"
                    }
                    onLoginRequired={handleLoginRequired}
                  />

                  <AdoptButton
                    fullWidth
                    size="large"
                    onClick={handleAdopt}
                    startIcon={<Pets />}
                  >
                    Adopt {pet.name}
                  </AdoptButton>
                </Box>
              </InfoCard>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Footer />

      {/* Adoption Confirmation Dialog */}
      <Dialog
        open={adoptDialogOpen}
        onClose={() => setAdoptDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          <Pets sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Adopt {pet.name}?
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            You're about to start the adoption process for{" "}
            <strong>{pet.name}</strong>. This will add them to your cart where
            you can complete the adoption.
          </Typography>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: alpha("#4a6fa5", 0.1),
              border: "1px solid rgba(74, 111, 165, 0.2)",
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="primary">
              Adoption Fee: ${petPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Includes vaccinations, microchip, and health check
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: "center", gap: 2 }}>
          <Button
            onClick={() => setAdoptDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: "50px", px: 3 }}
          >
            Cancel
          </Button>

          <AdoptButton
            onClick={confirmAdopt}
            disabled={adopting}
            startIcon={
              adopting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <ShoppingCart />
              )
            }
            sx={{ px: 4 }}
          >
            {adopting ? "Adding to Cart..." : "Add to Cart & Adopt"}
          </AdoptButton>
        </DialogActions>
      </Dialog>

      {/* Login Dialog */}
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </>
  );
}

export default Enhanced_Details;
