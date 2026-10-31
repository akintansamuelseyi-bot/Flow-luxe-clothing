import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  UserRound,
  Store,
} from 'lucide-react';

import logo from '../assets/flow new design.png';
import { useShopping } from '../context/useshopping';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();

  const { cartCount, wishlist } = useShopping();

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

  const handleSearch = (event) => {
    event.preventDefault();

    const search = searchTerm.trim();

    if (!search) return;

    navigate(`/shop?search=${encodeURIComponent(search)}`);

    setSearchTerm('');
    setShowMobileSearch(false);
    closeMenu();
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="relative z-30 w-full bg-gray-200 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 md:h-18 md:px-10">
          {/* Brand Name */}
          <Link to="/" onClick={closeMenu} className="shrink-0">
            <h1 className="font-runethia transition-colors hover:text-pink-700">
              Flow-Luxe
            </h1>
          </Link>

          {/* Brand Logo */}
          <Link to="/" onClick={closeMenu} className="shrink-0">
            <img
              src={logo}
              alt="Flow Luxe Clothing"
              className="h-14 w-auto object-contain md:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
            {mainLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm text-[#1d0e05] transition-colors duration-300 hover:text-pink-700"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden max-w-52 flex-1 items-center rounded-full border border-white bg-violet-50 px-3 shadow-inner lg:flex xl:max-w-64"
          >
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full bg-transparent py-2 text-sm outline-none"
            />

            <button type="submit" aria-label="Submit search">
              <Search size={19} className="text-gray-600" />
            </button>
          </form>

          {/* Desktop Shopping Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} saved products`}
              className="relative text-[#1d0e05] transition-colors hover:text-pink-700"
            >
              <Heart size={22} />{' '}
              <h3 className="text-sm font-medium">Wishlist</h3>
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-xs text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative text-[#1d0e05] transition-colors hover:text-pink-700"
            >
              <ShoppingBag size={20} />{' '}
              <h3 className="text-sm font-medium">My Cart</h3>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              aria-label="My account"
              className="text-[#1d0e05] transition-colors hover:text-pink-700"
            >
              <UserRound size={22} />{' '}
              <h3 className="text-sm font-medium">My Account</h3>
            </Link>
          </div>

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

      {/* Mobile Search Panel */}
      {showMobileSearch && (
        <div className="fixed bottom-16 left-0 z-50 w-full border-t border-violet-200 bg-violet-50 p-4 shadow-lg md:hidden">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full border border-white bg-white px-4 shadow-inner"
          >
            <Search size={20} className="text-gray-500" />

            <input
              type="search"
              autoFocus
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for products, brands and more..."
              aria-label="Search products"
              className="w-full bg-transparent py-3 text-sm outline-none"
            />

            <button type="submit" className="text-sm font-medium text-pink-700">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t border-violet-200 bg-violet-50 px-2 py-3 shadow-[0_-3px_12px_rgba(0,0,0,0.08)] md:hidden"
        aria-label="Mobile shopping navigation"
      >
        {/* Shop */}
        <Link
          to="/shop"
          className="flex flex-col items-center gap-1 text-[#1d0e05] hover:text-pink-700"
        >
          <Store size={21} />
          <span className="text-[10px]">Shop</span>
        </Link>

        {/* Search */}
        <button
          type="button"
          onClick={() => setShowMobileSearch((previous) => !previous)}
          className={`flex flex-col items-center gap-1 ${
            showMobileSearch ? 'text-pink-700' : 'text-[#1d0e05]'
          }`}
          aria-label="Open product search"
          aria-expanded={showMobileSearch}
        >
          <Search size={21} />
          <span className="text-[10px]">Search</span>
        </button>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative flex flex-col items-center gap-1 text-[#1d0e05] hover:text-pink-700"
        >
          <Heart size={21} />
          {wishlist.length > 0 && (
            <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-pink-600 px-1 text-[9px] text-white">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px]">Wishlist</span>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative flex flex-col items-center gap-1 text-[#1d0e05] hover:text-pink-700"
        >
          <ShoppingBag size={21} />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-pink-600 px-1 text-[9px] text-white">
              {cartCount}
            </span>
          )}
          <span className="text-[10px]">Cart</span>
        </Link>

        {/* Account */}
        <Link
          to="/account"
          className="flex flex-col items-center gap-1 text-[#1d0e05] hover:text-pink-700"
        >
          <UserRound size={21} />
          <span className="text-[10px]">Account</span>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
