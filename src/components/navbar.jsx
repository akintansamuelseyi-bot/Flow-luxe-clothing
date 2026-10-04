import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/flow new design.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-200 shadow-md">
      <div className="mx-auto max-w-7xl md:h-18 px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <div className="">
          {" "}
          <Link to="/homepage">
            <h1 className="   hover:text-pink-700 font-runethia">Flow-Luxe</h1>
          </Link>
        </div>
        <div>
          <img src={logo} alt="" className=" h-15 w-full object-contain" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font- lg:gap-10 ">
          <li>
            <Link
              to="/homepage"
              className="text-[#1d0e05] transition-colors duration-300 hover:text-pink-700"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/shop"
              className="text-[#1d0e05] transition-colors duration-300 hover:text-pink-700"
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="text-[#1d0e05] transition-colors duration-300 hover:text-pink-700"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              to="/contactus"
              className="text-[#1d0e05] transition-colors duration-300 hover:text-pink-700"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden hover:text-pink-700 transition-colors duration-300"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-violet-50">
          <ul className="flex flex-col px-5 py-6 gap-5 ">
            <li>
              <Link
                to="/homepage"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-700   transition-colors duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className=" hover:text-pink-700   transition-colors duration-300"
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-700 transition-colors duration-300"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/contactus"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-700 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
