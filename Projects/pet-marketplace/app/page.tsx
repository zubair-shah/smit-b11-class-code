import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Menu className="h-6 w-6 md:hidden" />
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="PetPals Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-pink-500">PetPals</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-pink-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-sm font-medium hover:text-pink-500 transition-colors">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Happy pets" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Find Your Furry Friend Today!</h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              Discover the perfect companion from our selection of adorable, healthy, and loving pets.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full bg-pink-500 hover:bg-pink-600">
                Browse Pets
              </Button>
              <Button size="lg" variant="outline" className="rounded-full bg-white/10 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Find by Category</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <TabsTrigger value="all" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  All Pets
                </TabsTrigger>
                <TabsTrigger value="dogs" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Dogs
                </TabsTrigger>
                <TabsTrigger value="cats" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Cats
                </TabsTrigger>
                <TabsTrigger value="birds" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Birds
                </TabsTrigger>
                <TabsTrigger value="small" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Small Pets
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Buddy"
                    age="2 years"
                    breed="Golden Retriever"
                    price="$1,200"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Luna"
                    age="1 year"
                    breed="Siamese Cat"
                    price="$800"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Charlie"
                    age="3 months"
                    breed="French Bulldog"
                    price="$1,800"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Daisy"
                    age="6 months"
                    breed="Labrador Retriever"
                    price="$1,000"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Oliver"
                    age="1 year"
                    breed="Maine Coon"
                    price="$950"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Bella"
                    age="4 months"
                    breed="Yorkshire Terrier"
                    price="$1,500"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Max"
                    age="2 years"
                    breed="German Shepherd"
                    price="$1,300"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Coco"
                    age="1 year"
                    breed="Ragdoll Cat"
                    price="$900"
                  />
                </div>
              </TabsContent>
              <TabsContent value="dogs" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Buddy"
                    age="2 years"
                    breed="Golden Retriever"
                    price="$1,200"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Charlie"
                    age="3 months"
                    breed="French Bulldog"
                    price="$1,800"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Daisy"
                    age="6 months"
                    breed="Labrador Retriever"
                    price="$1,000"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Bella"
                    age="4 months"
                    breed="Yorkshire Terrier"
                    price="$1,500"
                  />
                </div>
              </TabsContent>
              <TabsContent value="cats" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Luna"
                    age="1 year"
                    breed="Siamese Cat"
                    price="$800"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Oliver"
                    age="1 year"
                    breed="Maine Coon"
                    price="$950"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Coco"
                    age="1 year"
                    breed="Ragdoll Cat"
                    price="$900"
                  />
                </div>
              </TabsContent>
              <TabsContent value="birds" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Rio"
                    age="6 months"
                    breed="Parakeet"
                    price="$150"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Sunny"
                    age="1 year"
                    breed="Canary"
                    price="$120"
                  />
                </div>
              </TabsContent>
              <TabsContent value="small" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Whiskers"
                    age="8 months"
                    breed="Hamster"
                    price="$50"
                  />
                  <PetCard
                    image="/placeholder.svg?height=300&width=300"
                    name="Nibbles"
                    age="1 year"
                    breed="Guinea Pig"
                    price="$80"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Emotional Hook Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Happy pet with owner"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Every Pet Deserves a Loving Home</h2>
                <p className="text-lg text-gray-700 mb-6">
                  We believe every pet deserves a loving home. Browse our adorable selection and give your next best
                  friend a forever family.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  All our pets are ethically sourced, thoroughly health-checked, and lovingly cared for until they find
                  their perfect match. When you adopt from PetPals, you're not just getting a pet – you're gaining a
                  companion for life.
                </p>
                <Button className="rounded-full bg-pink-500 hover:bg-pink-600">Our Adoption Process</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Pets Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Pets</h2>
              <Link href="/shop" className="text-pink-500 hover:underline mt-2 md:mt-0">
                View All Pets →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <PetCard
                image="/placeholder.svg?height=300&width=300"
                name="Rocky"
                age="3 years"
                breed="Siberian Husky"
                price="$1,400"
                featured={true}
              />
              <PetCard
                image="/placeholder.svg?height=300&width=300"
                name="Milo"
                age="2 years"
                breed="Bengal Cat"
                price="$1,100"
                featured={true}
              />
              <PetCard
                image="/placeholder.svg?height=300&width=300"
                name="Rosie"
                age="5 months"
                breed="Pomeranian"
                price="$1,600"
                featured={true}
              />
              <PetCard
                image="/placeholder.svg?height=300&width=300"
                name="Simba"
                age="1 year"
                breed="Persian Cat"
                price="$950"
                featured={true}
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Happy Families</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Customer"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Adopted Buddy</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Buddy has brought so much joy to our family! The adoption process was smooth, and the staff was
                  incredibly helpful. We couldn't be happier with our new furry family member."
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Customer"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">Michael Thompson</h4>
                    <p className="text-sm text-gray-500">Adopted Luna</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Luna has been the perfect addition to my apartment. She's playful, affectionate, and exactly as
                  described. The health guarantee gave me peace of mind, and she arrived in perfect condition."
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Customer"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">Emily Rodriguez</h4>
                    <p className="text-sm text-gray-500">Adopted Charlie</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The team at PetPals was amazing throughout the entire adoption process. They answered all my
                  questions and helped me find the perfect match. Charlie is now my best friend!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-pink-500 text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for new pet arrivals, care tips, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-pink-500 hover:bg-white/90">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="PetPals Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-xl font-bold text-pink-400">PetPals</span>
              </Link>
              <p className="text-gray-400">Finding loving homes for adorable pets since 2010.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Pet Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/shop/dogs" className="text-gray-400 hover:text-white transition-colors">
                    Dogs
                  </Link>
                </li>
                <li>
                  <Link href="/shop/cats" className="text-gray-400 hover:text-white transition-colors">
                    Cats
                  </Link>
                </li>
                <li>
                  <Link href="/shop/birds" className="text-gray-400 hover:text-white transition-colors">
                    Birds
                  </Link>
                </li>
                <li>
                  <Link href="/shop/small-pets" className="text-gray-400 hover:text-white transition-colors">
                    Small Pets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p>123 Pet Street</p>
                <p>Furry City, PC 12345</p>
                <p className="mt-2">Email: info@petpals.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} PetPals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PetCard({ image, name, age, breed, price, featured = false }) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-md">
      {featured && <Badge className="absolute top-2 right-2 z-10 bg-pink-500">Featured</Badge>}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-pink-500 hover:bg-pink-600">
              View Details
            </Button>
            <Button size="sm" className="flex-1 bg-white text-pink-500 hover:bg-gray-100">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Badge variant="outline" className="text-pink-500 border-pink-200 bg-pink-50">
            {price}
          </Badge>
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          <p>Age: {age}</p>
          <p>Breed: {breed}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-pink-500" />
            <span className="text-xs text-gray-500">Add to Wishlist</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4 text-pink-500" />
            <span className="text-xs text-gray-500">Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  )
}
