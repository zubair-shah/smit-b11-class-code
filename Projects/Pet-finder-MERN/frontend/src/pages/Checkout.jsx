"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  styled,
  alpha,
} from "@mui/material"
import { ShoppingCart, CreditCard, LocalShipping, CheckCircle, ArrowBack, Pets, Delete } from "@mui/icons-material"
import { useAuth } from "../../context/AuthContext"
import { useSnackbar } from "notistack"
import Header_2 from "../components/Header_2"
import Footer from "../components/Footer"

// Styled components
const CheckoutContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
  minHeight: "100vh",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(4),
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: "0 8px 32px rgba(74, 111, 165, 0.1)",
}))

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
  },
  "&:disabled": {
    background: theme.palette.grey[300],
    transform: "none",
    boxShadow: "none",
  },
}))

const CartItemCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  },
}))

const steps = ["Cart Review", "Shipping Info", "Payment", "Confirmation"]

function Checkout() {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const [activeStep, setActiveStep] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: auth?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    paymentMethod: "credit",
  })

  useEffect(() => {
    if (!auth?.user) {
      navigate("/login")
      return
    }
    fetchCartItems()
  }, [auth?.user, navigate])

  const fetchCartItems = async () => {
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
      enqueueSnackbar("Failed to load cart items", { variant: "error" })
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

  const handleNext = () => {
    if (activeStep === 0 && cartItems.length === 0) {
      enqueueSnackbar("Your cart is empty", { variant: "warning" })
      return
    }

    if (activeStep === 1) {
      // Validate shipping info
      const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"]
      const missingFields = requiredFields.filter((field) => !shippingInfo[field])

      if (missingFields.length > 0) {
        enqueueSnackbar("Please fill in all shipping information", { variant: "error" })
        return
      }
    }

    if (activeStep === 2) {
      // Validate payment info
      const requiredFields = ["cardNumber", "expiryDate", "cvv", "cardName"]
      const missingFields = requiredFields.filter((field) => !paymentInfo[field])

      if (missingFields.length > 0) {
        enqueueSnackbar("Please fill in all payment information", { variant: "error" })
        return
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handlePlaceOrder = async () => {
    setProcessing(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart after successful order
      const token = localStorage.getItem("token")
      await fetch("http://localhost:5000/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      enqueueSnackbar("🎉 Order placed successfully! Welcome to your new pet family!", {
        variant: "success",
        autoHideDuration: 6000,
      })

      setActiveStep(3) // Move to confirmation step
    } catch (error) {
      enqueueSnackbar("Failed to place order. Please try again.", { variant: "error" })
    } finally {
      setProcessing(false)
    }
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.petPrice * item.quantity, 0)
  const tax = totalAmount * 0.08
  const shipping = totalAmount > 500 ? 0 : 25
  const finalTotal = totalAmount + tax + shipping

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <>
      <Header_2 />

      <CheckoutContainer>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            sx={{
              mb: 3,
              borderRadius: "50px",
              color: "primary.main",
              "&:hover": { background: alpha("#4a6fa5", 0.1) },
            }}
          >
            Back to Shopping
          </Button>

          <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
            Checkout
          </Typography>

          {/* Stepper */}
          <StyledPaper sx={{ mb: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      style: {
                        color: index <= activeStep ? "#4a6fa5" : "#ccc",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </StyledPaper>

          <Grid container spacing={3}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              <StyledPaper>
                {activeStep === 0 && (
                  <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      <ShoppingCart sx={{ mr: 1 }} />
                      Review Your Cart
                    </Typography>

                    {cartItems.length === 0 ? (
                      <Box textAlign="center" py={4}>
                        <Pets sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          Your cart is empty
                        </Typography>
                        <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 2, borderRadius: "50px" }}>
                          Continue Shopping
                        </Button>
                      </Box>
                    ) : (
                      cartItems.map((item) => (
                        <CartItemCard key={item._id}>
                          <Box display="flex" p={2}>
                            <CardMedia
                              component="img"
                              sx={{ width: 120, height: 120, borderRadius: 2 }}
                              image={item.petImage || "/placeholder.svg?height=120&width=120"}
                              alt={item.petName}
                            />

                            <CardContent sx={{ flex: 1, p: "0 16px !important" }}>
                              <Typography variant="h6" fontWeight="bold">
                                {item.petName}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Adoption Fee: ${item.petPrice.toFixed(2)}
                              </Typography>
                              <Chip
                                label="Includes: Vaccinations, Microchip, Health Check"
                                size="small"
                                color="primary"
                                variant="outlined"
                              />

                              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                  Total: ${(item.petPrice * item.quantity).toFixed(2)}
                                </Typography>

                                <Button
                                  startIcon={<Delete />}
                                  onClick={() => updateQuantity(item.petId, 0)}
                                  color="error"
                                  sx={{ borderRadius: "50px" }}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </CardContent>
                          </Box>
                        </CartItemCard>
                      ))
                    )}
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      <LocalShipping sx={{ mr: 1 }} />
                      Shipping Information
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, address: e.target.value }))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="City"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, city: e.target.value }))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="State"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, state: e.target.value }))}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="ZIP Code"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, zipCode: e.target.value }))}
                          required
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {activeStep === 2 && (
                  <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      <CreditCard sx={{ mr: 1 }} />
                      Payment Information
                    </Typography>

                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                      <FormLabel component="legend">Payment Method</FormLabel>
                      <RadioGroup
                        value={paymentInfo.paymentMethod}
                        onChange={(e) => setPaymentInfo((prev) => ({ ...prev, paymentMethod: e.target.value }))}
                        row
                      >
                        <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
                        <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
                        <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                      </RadioGroup>
                    </FormControl>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Card Number"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardNumber: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Expiry Date"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, expiryDate: e.target.value }))}
                          placeholder="MM/YY"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="CVV"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Cardholder Name"
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardName: e.target.value }))}
                          required
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {activeStep === 3 && (
                  <Box textAlign="center" py={4}>
                    <CheckCircle sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
                    <Typography variant="h4" fontWeight="bold" color="success.main" gutterBottom>
                      Order Confirmed!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Thank you for choosing to adopt! Your new pet family member will be ready for pickup soon. We'll
                      contact you within 24 hours to schedule the meet and greet.
                    </Typography>
                    <Button variant="contained" onClick={() => navigate("/")} sx={{ borderRadius: "50px", mt: 2 }}>
                      Continue Shopping
                    </Button>
                  </Box>
                )}

                {/* Navigation Buttons */}
                {activeStep < 3 && (
                  <Box display="flex" justifyContent="space-between" mt={4}>
                    <Button disabled={activeStep === 0} onClick={handleBack} sx={{ borderRadius: "50px" }}>
                      Back
                    </Button>

                    {activeStep === 2 ? (
                      <GradientButton
                        onClick={handlePlaceOrder}
                        disabled={processing || cartItems.length === 0}
                        startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
                      >
                        {processing ? "Processing..." : "Place Order"}
                      </GradientButton>
                    ) : (
                      <GradientButton onClick={handleNext} disabled={cartItems.length === 0}>
                        Next
                      </GradientButton>
                    )}
                  </Box>
                )}
              </StyledPaper>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Order Summary
                </Typography>

                {cartItems.map((item) => (
                  <Box key={item._id} display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">
                      {item.petName} x {item.quantity}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      ${(item.petPrice * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">${totalAmount.toFixed(2)}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Tax</Typography>
                  <Typography variant="body2">${tax.toFixed(2)}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Shipping {totalAmount > 500 && "(Free)"}</Typography>
                  <Typography variant="body2">${shipping.toFixed(2)}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    ${finalTotal.toFixed(2)}
                  </Typography>
                </Box>

                {totalAmount > 500 && <Chip label="Free Shipping!" color="success" size="small" sx={{ mt: 2 }} />}
              </StyledPaper>
            </Grid>
          </Grid>
        </Container>
      </CheckoutContainer>

      <Footer />
    </>
  )
}

export default Checkout
