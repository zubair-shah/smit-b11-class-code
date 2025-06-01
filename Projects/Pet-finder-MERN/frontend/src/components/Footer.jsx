import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  TextField,
  Button,
  useTheme,
  styled,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Pets,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { alpha, keyframes } from "@mui/system";

// Floating animation for logo
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Gradient background animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled footer container
const StyledFooter = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.95)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.95)} 50%, 
    ${alpha(theme.palette.primary.dark, 0.95)} 100%)`,
  backgroundSize: "300% 300%",
  animation: `${gradientAnimation} 12s ease infinite`,
  backdropFilter: "blur(10px)",
  borderTop: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  color: theme.palette.common.white,
  padding: theme.spacing(6, 0),
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, 
      ${theme.palette.secondary.main}, 
      ${theme.palette.primary.main})`,
  },
}));

// Styled logo text
const FooterLogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, 
    ${theme.palette.common.white}, 
    ${theme.palette.secondary.light})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontWeight: 800,
  letterSpacing: ".3rem",
  textDecoration: "none",
  fontFamily: '"Montserrat", sans-serif',
  textShadow: `0 2px 4px ${alpha(theme.palette.primary.dark, 0.3)}`,
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

// Styled social icon
const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  margin: theme.spacing(0, 1),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    transform: "translateY(-3px)",
  },
}));

// Styled footer link
const FooterLink = styled(Link)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.8),
  display: "block",
  marginBottom: theme.spacing(1),
  transition: "all 0.2s ease",
  "&:hover": {
    color: theme.palette.common.white,
    transform: "translateX(5px)",
    textDecoration: "none",
  },
}));

// Styled contact item
const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  color: alpha(theme.palette.common.white, 0.9),
  "& svg": {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.light,
  },
}));

function Footer() {
  const theme = useTheme();

  return (
    <StyledFooter component="footer">
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  animation: `${floatAnimation} 6s ease-in-out infinite`,
                  mb: 3,
                }}
              >
                <Pets
                  sx={{
                    fontSize: 40,
                    mr: 2,
                    color: theme.palette.secondary.light,
                  }}
                />
                <FooterLogoText variant="h4">PETPARADISE</FooterLogoText>
              </Box>
              <Typography
                variant="body1"
                sx={{ mb: 3, color: alpha(theme.palette.common.white, 0.8) }}
              >
                Connecting loving homes with pets in need since 2015. Our
                mission is to make pet adoption easy and enjoyable.
              </Typography>
              <Box sx={{ mt: "auto" }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: theme.palette.common.white,
                  }}
                >
                  Follow Us
                </Typography>
                <Box>
                  <SocialIcon aria-label="Facebook">
                    <Facebook fontSize="medium" />
                  </SocialIcon>
                  <SocialIcon aria-label="Twitter">
                    <Twitter fontSize="medium" />
                  </SocialIcon>
                  <SocialIcon aria-label="Instagram">
                    <Instagram fontSize="medium" />
                  </SocialIcon>
                  <SocialIcon aria-label="LinkedIn">
                    <LinkedIn fontSize="medium" />
                  </SocialIcon>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Links Column */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: 600, color: theme.palette.common.white }}
            >
              Quick Links
            </Typography>
            {[
              "Home",
              "About Us",
              "Adopt a Pet",
              "Success Stories",
              "Volunteer",
              "Donate",
            ].map((text) => (
              <FooterLink key={text} href="#" underline="none">
                {text}
              </FooterLink>
            ))}
          </Grid>

          {/* Services Column */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: 600, color: theme.palette.common.white }}
            >
              Services
            </Typography>
            {[
              "Pet Adoption",
              "Veterinary Care",
              "Training",
              "Grooming",
              "Pet Sitting",
              "Emergency Care",
            ].map((text) => (
              <FooterLink key={text} href="#" underline="none">
                {text}
              </FooterLink>
            ))}
          </Grid>

          {/* Contact Column */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: 600, color: theme.palette.common.white }}
            >
              Contact Us
            </Typography>
            <ContactItem>
              <LocationOn />
              <Typography>
                123 Pet Paradise Lane, Animal City, AC 12345
              </Typography>
            </ContactItem>
            <ContactItem>
              <Phone />
              <Typography>+1 (555) 123-4567</Typography>
            </ContactItem>
            <ContactItem>
              <Email />
              <Typography>info@petparadise.com</Typography>
            </ContactItem>

            <Box
              sx={{
                mt: 4,
                p: 3,
                backgroundColor: alpha(theme.palette.common.black, 0.2),
                borderRadius: theme.shape.borderRadius,
                backdropFilter: "blur(5px)",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Newsletter
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: alpha(theme.palette.common.white, 0.8) }}
              >
                Subscribe to get updates on new pets and special offers.
              </Typography>
              <Box component="form" sx={{ display: "flex" }}>
                <TextField
                  placeholder="Your email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    mr: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: alpha(theme.palette.common.white, 0.3),
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.common.white,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.common.white,
                      },
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      color: theme.palette.common.white,
                    },
                    "& input": {
                      color: theme.palette.common.white,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    color: theme.palette.common.white,
                    fontWeight: 600,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{ my: 5, borderColor: alpha(theme.palette.common.white, 0.2) }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: alpha(theme.palette.common.white, 0.7),
              mb: { xs: 2, md: 0 },
            }}
          >
            © {new Date().getFullYear()} PetParadise. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
