import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

function PetCard({ image, name, age, breed, price, featured = false }) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-md">
      {featured && <Badge className="absolute top-2 right-2 z-10 bg-pink-500">Featured</Badge>}
      <div className="relative h-60 overflow-hidden">
        <img
          src={image || "https://placehold.co/300x300"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
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
          <div className="flex items-center gap-1 cursor-pointer">
            <Heart className="h-4 w-4 text-pink-500" />
            <span className="text-xs text-gray-500">Add to Wishlist</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <ShoppingCart className="h-4 w-4 text-pink-500" />
            <span className="text-xs text-gray-500">Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetCard
