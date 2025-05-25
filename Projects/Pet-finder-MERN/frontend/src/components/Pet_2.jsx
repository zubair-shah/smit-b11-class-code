import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  styled,
  Button,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BreedIcon from "@mui/icons-material/EmojiNature";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Styled components with premium theme integration
const PetCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 24px rgba(69, 111, 165, 0.12)",
  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 28px rgba(69, 111, 165, 0.2)",
    "& $PetMedia": {
      "&:after": {
        opacity: 0.3,
      },
    },
  },
}));

const PetMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: "100%",
  position: "relative",
  overflow: "hidden",
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(to bottom, transparent 60%, ${theme.palette.primary.dark} 100%)`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
}));

const PetChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 12,
  right: 12,
  backgroundColor: theme.palette.primary.main,
  color: "white",
  fontWeight: 600,
  fontSize: "0.75rem",
  padding: "4px 8px",
  zIndex: 1,
  "& .MuiChip-icon": {
    color: "white",
    marginLeft: 0,
  },
}));

const FavoriteButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: 12,
  left: 12,
  minWidth: "auto",
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: theme.palette.secondary.main,
  zIndex: 1,
  padding: 0,
  "&:hover": {
    backgroundColor: "white",
    color: theme.palette.secondary.dark,
  },
}));

const DetailButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
  borderRadius: "50px",
  padding: "10px 24px",
  fontWeight: 600,
  width: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 12px ${theme.palette.primary.main}40`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

const BreedText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: "0.875rem",
}));

const LocationText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: "0.875rem",
}));

function Pet_2(props) {
  const theme = useTheme();
  const { name, animal, breed, images, location, id } = props;
  const hero = images.length
    ? images[0]
    : "http://pets-images.dev-apis.com/pets/none.jpg";

  // Capitalize first letter of animal type
  const formattedAnimal = animal.charAt(0).toUpperCase() + animal.slice(1);

  return (
    <PetCard>
      <Link
        to={`/details/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <PetMedia image={hero} title={name}>
          <FavoriteButton size="small" aria-label="Add to favorites">
            <FavoriteBorderIcon fontSize="small" />
          </FavoriteButton>
          <PetChip
            label={formattedAnimal}
            icon={<PetsIcon fontSize="small" />}
          />
        </PetMedia>

        <CardContent sx={{ flexGrow: 1, px: 2.5, pt: 2.5, pb: 0 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1.5,
              color: theme.palette.text.primary,
            }}
          >
            {name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <BreedIcon
              fontSize="small"
              sx={{
                mr: 1,
                color: theme.palette.secondary.main,
              }}
            />
            <BreedText variant="body2">{breed}</BreedText>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationOnIcon
              fontSize="small"
              sx={{
                mr: 1,
                color: theme.palette.secondary.main,
              }}
            />
            <LocationText variant="body2">{location}</LocationText>
          </Box>
        </CardContent>

        <Box sx={{ p: 2.5, pt: 0 }}>
          <DetailButton
            size="medium"
            endIcon={<PetsIcon sx={{ fontSize: "1rem" }} />}
          >
            View Details
          </DetailButton>
        </Box>
      </Link>
    </PetCard>
  );
}

export default Pet_2;
