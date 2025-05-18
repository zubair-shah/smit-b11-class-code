import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="https://placehold.co/32x32" alt="PetPals Logo" className="w-[32px] h-[32px] rounded-full" />
              <span className="text-xl font-bold text-pink-400">PetPals</span>
            </Link>
            <p className="text-gray-400">Finding loving homes for adorable pets since 2010.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Pet Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/dogs" className="text-gray-400 hover:text-white transition-colors">
                  Dogs
                </Link>
              </li>
              <li>
                <Link to="/shop/cats" className="text-gray-400 hover:text-white transition-colors">
                  Cats
                </Link>
              </li>
              <li>
                <Link to="/shop/birds" className="text-gray-400 hover:text-white transition-colors">
                  Birds
                </Link>
              </li>
              <li>
                <Link to="/shop/small-pets" className="text-gray-400 hover:text-white transition-colors">
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
  )
}

export default Footer
