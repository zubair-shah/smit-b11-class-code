// Import React core library
import React from "react";
// Import our custom Pet component (version 2 with premium styling)
import Pet_2 from "./Pet_2";
// Import necessary Material-UI components
import { Grid, Box, Typography, Container, useTheme } from "@mui/material";

// Results component that displays a grid of pet cards
function Results_2({ pets }) {
  // Access the current theme for consistent styling
  const theme = useTheme();

  return (
    // Outer container with max width and vertical padding
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Main content box with styled background */}
      <Box
        sx={{
          // Use paper background color from theme
          backgroundColor: theme.palette.background.paper,
          // Rounded corners (2x theme's base border radius)
          borderRadius: theme.shape.borderRadius * 2,
          // Padding all around
          p: 4,
          // Subtle shadow with primary color tint
          boxShadow: "0 8px 24px rgba(69, 111, 165, 0.08)",
        }}
      >
        {/* Conditional rendering based on pets array length */}
        {!pets.length ? (
          // Show message when no pets are found
          <Typography
            variant="h4"
            align="center"
            sx={{
              // Use secondary text color
              color: theme.palette.text.secondary,
              // Medium font weight
              fontWeight: 500,
              // Vertical padding
              py: 8,
            }}
          >
            No Pets Found
          </Typography>
        ) : (
          // Grid container for pet cards when pets exist
          <Grid
            container
            spacing={4} // Consistent spacing between cards
          >
            {/* Map through pets array to render each pet */}
            {pets.map((pet) => (
              // Grid item for each pet (full width on mobile, half on sm+ screens)
              <Grid
                item
                xs={12} // Full width on extra small screens
                sm={6} // Half width on small and larger screens
                key={pet.id} // Unique key for React rendering
              >
                {/* Render our premium Pet component */}
                <Pet_2
                  animal={pet.animal}
                  name={pet.name}
                  breed={pet.breed}
                  images={pet.images}
                  // Combine city and state for location
                  location={`${pet.city}, ${pet.state}`}
                  id={pet.id}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

// Export the component as default
export default Results_2;
