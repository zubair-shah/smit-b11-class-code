import SearchParams_2 from "../components/Search_Params_2";
import Header_2 from "../components/Header_2";
import Footer from "../components/Footer";
import { Box, Container, Typography, styled } from "@mui/material";

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  paddingTop: theme.spacing(10), // Account for fixed header
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 800,
  fontSize: "3.5rem",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

function New_Home() {
  return (
    <PageContainer>
      <Header_2 />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <HeroTitle variant="h1">Adopt Your Perfect Companion</HeroTitle>

        <SearchParams_2 />
      </Container>

      <Footer />
    </PageContainer>
  );
}

export default New_Home;
