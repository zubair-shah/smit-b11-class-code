"use client"

import { useState, useEffect } from "react"
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  styled,
  alpha,
} from "@mui/material"
import { ShoppingCart, Close, Add, Remove, Delete, ShoppingBag } from "@mui/icons-material"
import { useAuth } from "../../context/AuthContext"
import { useSnackbar } from "notistack"

// Styled components
const CartHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const CartItem = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  },
}))

const QuantityControls = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: alpha(theme.palette.primary.main, 0.1),
  borderRadius: "20px",
  padding: theme.spacing(0.5),
}))

const CheckoutButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
  color: "white",
  padding: "12px 24px",
  fontWeight: 600,
  borderRadius: "50px",
  boxShadow: "0 4px 15px rgba(255, 154, 118, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(255, 154, 118, 0.4)",
  },
}))

function CartDrawer({ open, onClose, onLoginRequired }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (auth?.user && open) {
      fetchCartItems()
    }
  }, [auth?.user, open])

  const fetchCartItems = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setCartItems(data.items || [])
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (petId, newQuantity) => {
    try {
      const token = localStorage.getItem("token")

      if (newQuantity === 0) {
        const response = await fetch(`http://localhost:5000/api/cart/remove/${petId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          setCartItems((items) => items.filter((item) => item.petId !== petId))
          enqueueSnackbar("Item removed from cart", { variant: "info" })
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
        })

        if (response.ok) {
          setCartItems((items) =>
            items.map((item) => (item.petId === petId ? { ...item, quantity: newQuantity } : item)),
          )
        }
      }
    } catch (error) {
      enqueueSnackbar("Failed to update cart", { variant: "error" })
    }
  }

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setCartItems([])
        enqueueSnackbar("Cart cleared", { variant: "success" })
      }
    } catch (error) {
      enqueueSnackbar("Failed to clear cart", { variant: "error" })
    }
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.petPrice * item.quantity, 0)

  const handleCartClick = () => {
    if (!auth?.user) {
      onLoginRequired()
      return
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        },
      }}
    >
      <CartHeader>
        <Box display="flex" alignItems="center" gap={1}>
          <ShoppingCart />
          <Typography variant="h6" fontWeight="bold">
            Shopping Cart
          </Typography>
          <Chip
            label={totalItems}
            size="small"
            sx={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </CartHeader>

      <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : cartItems.length === 0 ? (
          <Box textAlign="center" py={4}>
            <ShoppingBag sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Add some adorable pets to get started!
            </Typography>
          </Box>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item._id}>
              <Box display="flex" p={2}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, borderRadius: 2 }}
                  image={item.petImage || "/placeholder.svg?height=80&width=80"}
                  alt={item.petName}
                />

                <CardContent sx={{ flex: 1, p: "0 16px !important" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.petName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.petPrice.toFixed(2)} each
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <QuantityControls>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.petId, item.quantity - 1)}
                        sx={{
                          width: 28,
                          height: 28,
                          background: "primary.main",
                          color: "white",
                          "&:hover": { background: "primary.dark" },
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>

                      <Typography variant="body2" fontWeight="bold" minWidth="20px" textAlign="center">
                        {item.quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.petId, item.quantity + 1)}
                        sx={{
                          width: 28,
                          height: 28,
                          background: "primary.main",
                          color: "white",
                          "&:hover": { background: "primary.dark" },
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </QuantityControls>

                    <IconButton onClick={() => updateQuantity(item.petId, 0)} sx={{ color: "error.main" }}>
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Box>
            </CartItem>
          ))
        )}
      </Box>

      {cartItems.length > 0 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <CheckoutButton fullWidth size="large" sx={{ mb: 1 }}>
            Proceed to Checkout
          </CheckoutButton>

          <Button
            fullWidth
            variant="outlined"
            onClick={clearCart}
            sx={{
              borderRadius: "50px",
              borderColor: "grey.300",
              color: "text.secondary",
            }}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Drawer>
  )
}

export default CartDrawer
