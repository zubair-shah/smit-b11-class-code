"use client";

import { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Box,
  CircularProgress,
  Chip,
  styled,
  alpha,
} from "@mui/material";
import { Add, Remove, AddShoppingCart } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

// Styled components matching your theme
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
  padding: "8px 20px",
  fontWeight: 600,
  borderRadius: "50px",
  boxShadow: "0 4px 15px rgba(74, 111, 165, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(74, 111, 165, 0.3)",
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
  "&:disabled": {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
    transform: "none",
    boxShadow: "none",
  },
}));

const QuantityContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.5),
  borderRadius: "50px",
  background: alpha(theme.palette.primary.main, 0.1),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  background: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    background: theme.palette.primary.dark,
    transform: "scale(1.1)",
  },
  "&:disabled": {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
  },
}));

function CartButton({ petId, petName, petPrice, petImage, onLoginRequired }) {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (auth?.user) {
      fetchCartQuantity();
    }
  }, [petId, auth?.user]);

  const fetchCartQuantity = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/cart/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuantity(data.quantity || 0);
      }
    } catch (error) {
      console.error("Error fetching cart quantity:", error);
    }
  };

  const addToCart = async () => {
    if (!auth?.user) {
      onLoginRequired();
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          petId,
          petName,
          petPrice,
          petImage,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setQuantity(data.quantity);
        enqueueSnackbar(`${petName} added to cart!`, {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      enqueueSnackbar("Failed to add item to cart", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (newQuantity) => {
    if (!auth?.user) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (newQuantity === 0) {
        const response = await fetch(
          `http://localhost:5000/api/cart/remove/${petId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setQuantity(0);
          enqueueSnackbar(`${petName} removed from cart`, {
            variant: "info",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        }
      } else {
        const response = await fetch("http://localhost:5000/api/cart/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            petId,
            quantity: newQuantity,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setQuantity(data.quantity);
        }
      }
    } catch (error) {
      enqueueSnackbar("Failed to update cart", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    } finally {
      setLoading(false);
    }
  };

  if (quantity === 0) {
    return (
      <GradientButton
        fullWidth
        onClick={addToCart}
        disabled={loading}
        startIcon={
          loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <AddShoppingCart />
          )
        }
      >
        {loading ? "Adding..." : "Add to Cart"}
      </GradientButton>
    );
  }

  return (
    <QuantityContainer>
      <QuantityButton
        size="small"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={loading}
      >
        <Remove fontSize="small" />
      </QuantityButton>

      <Chip
        label={`${quantity} in cart`}
        color="primary"
        variant="outlined"
        sx={{
          minWidth: 80,
          fontWeight: 600,
          borderRadius: "20px",
        }}
      />

      <QuantityButton
        size="small"
        onClick={() => updateQuantity(quantity + 1)}
        disabled={loading}
      >
        <Add fontSize="small" />
      </QuantityButton>
    </QuantityContainer>
  );
}

export default CartButton;
