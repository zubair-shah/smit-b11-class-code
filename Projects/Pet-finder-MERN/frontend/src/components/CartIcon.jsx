"use client"

import { useState, useEffect } from "react"
import { IconButton, Badge, styled } from "@mui/material"
import { ShoppingCart } from "@mui/icons-material"
import { useAuth } from "../../context/AuthContext"

const StyledCartButton = styled(IconButton)(({ theme }) => ({
  color: "common.white",
  padding: theme.spacing(1.25),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(5px)",
  borderRadius: "12px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
    transform: "scale(1.05)",
  },
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 8,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "0 4px",
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}))

function CartIcon({ onClick }) {
  const [cartCount, setCartCount] = useState(0)
  const { auth } = useAuth()

  useEffect(() => {
    if (auth?.user) {
      fetchCartCount()
      // Set up polling to update cart count
      const interval = setInterval(fetchCartCount, 5000)
      return () => clearInterval(interval)
    } else {
      setCartCount(0)
    }
  }, [auth?.user])

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const totalItems = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
        setCartCount(totalItems)
      }
    } catch (error) {
      console.error("Error fetching cart count:", error)
    }
  }

  return (
    <StyledCartButton onClick={onClick}>
      <StyledBadge badgeContent={cartCount} color="secondary">
        <ShoppingCart />
      </StyledBadge>
    </StyledCartButton>
  )
}

export default CartIcon
