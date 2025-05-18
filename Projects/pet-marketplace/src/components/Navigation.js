"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, ShoppingCart, Heart, Menu } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Badge } from "./ui/Badge"

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 md:hidden cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          <Link to="/" className="flex items-center gap-2">
            <img src="https://placehold.co/32x32" alt="PetPals Logo" className="w-[32px] h-[32px] rounded-full" />
            <span className="text-xl font-bold text-pink-500">PetPals</span>
          </Link>
        </div>
        <nav
          className={`${mobileMenuOpen ? "flex" : "hidden"} md:flex absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-0 border-b md:border-0`}
        >
          <Link to="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-pink-500 transition-colors">
            Shop
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-pink-500 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-pink-500 transition-colors">
            Contact
          </Link>
          <Link to="/admin" className="text-sm font-medium hover:text-pink-500 transition-colors">
            Admin Panel
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <form className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search pets..."
              className="w-[200px] pl-8 rounded-full bg-gray-100 focus-visible:ring-pink-500"
            />
          </form>
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-pink-500">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-pink-500">
              2
            </Badge>
          </Button>
          <Button className="rounded-full bg-pink-500 hover:bg-pink-600">Sign In</Button>
        </div>
      </div>
    </header>
  )
}

export default Navigation
