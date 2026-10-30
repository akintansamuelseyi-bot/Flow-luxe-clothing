import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/flow new design.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contactus' },
  ];

  const extraLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Refund Policy', path: '/refund' },
    { name: 'Track Order', path: '/track' },
  ];

  const mobileLinks = [...mainLinks, ...extraLinks];

  return (
    <>
      <nav className="relative z-30 w-full bg-gray-200 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:h-18 md:px-10">
          {/* Brand Name */}
          <Link to="/" onClick={closeMenu}>
            <h1 className="font-runethia transition-colors hover:text-pink-700">
              Flow-Luxe
            </h1>
          </Link>

          {/* Brand Logo */}
          <Link to="/" onClick={closeMenu}>
            <img
              src={logo}
              alt="Flow Luxe Clothing"
              className="h-15 w-full object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 md:flex lg:gap-10">
            {mainLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-[#1d0e05] transition-colors duration-300 hover:text-pink-700"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="transition-colors duration-300 hover:text-pink-700 md:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? 'visible opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside
        id="mobile-navigation"
        inert={!isOpen}
        className={`fixed left-0 top-0 z-50 flex h-screen w-[50vw] flex-col overflow-y-auto bg-violet-50 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-violet-200 px-4 py-5">
          <h2 className="font-runethia text-xl text-[#1d0e05]">Flow-Luxe</h2>

          <button
            type="button"
            onClick={closeMenu}
            className="text-[#1d0e05] transition-colors hover:text-pink-700"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-7 px-5 py-8">
          {mobileLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={closeMenu}
                className="block text-sm font-medium text-[#1d0e05] transition-colors duration-300 hover:text-pink-700 sm:text-base"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer Footer */}
        <div className="mt-auto border-t border-violet-200 px-5 py-5">
          <p className="text-xs text-gray-600">
            Your Style. Your Confidence. Your FLOW.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
