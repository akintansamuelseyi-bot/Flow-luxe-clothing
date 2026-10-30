import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Truck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    'New Arrivals',
    'Best Sellers',
    'Gowns',
    'Baggy Jeans',
    'Two Sets',
    'Bum Shorts',
    'Party Dresses',
    'Kids Wear',
    'Wigs',
    'All Products',
  ];

  const helpLinks = [
    { name: 'Refund Policy', path: '/refund' },
    { name: 'Shipping & Delivery', path: '/contactus' },
    { name: 'Track Your Order', path: '/track' },
  ];

  const aboutLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
  ];

  const linkStyle =
    'text-sm text-gray-600 transition-colors duration-300 hover:text-pink-600';

  return (
    <footer className="w-full bg-gray-200 text-gray-700">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Contact Section */}
          <div className="rounded-2xl border border-white/80 p-5 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Contact Us
            </h2>

            <ul className="space-y-4">
              <li>
                <a
                  href="tel:09163402353"
                  className={`${linkStyle} flex items-center gap-2`}
                >
                  <Phone size={16} />
                  09163402353
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/2349163402353"
                  target="_blank"
                  rel="noreferrer"
                  className={`${linkStyle} flex items-center gap-2`}
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>

              <li>
                <a
                  href="mailto:flowluxefashion@gmail.com"
                  className={`${linkStyle} flex items-center gap-2`}
                >
                  <Mail size={16} />
                  Email Us
                </a>
              </li>

              <li className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                Ibadan, Nigeria
              </li>
            </ul>
          </div>

          {/* Shop Section */}
          <div className="rounded-2xl border border-white/80 p-5 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">Shop</h2>

            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li key={item}>
                  <Link to="/shop" className={linkStyle}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div className="rounded-2xl border border-white/80 p-5 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Help & Support
            </h2>

            <ul className="space-y-4">
              {helpLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className={linkStyle}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div className="rounded-2xl border border-white/80 p-5 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              About FLOW LUXE
            </h2>

            <ul className="space-y-4">
              {aboutLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className={linkStyle}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Shipping Section */}
          <div className="flex flex-col justify-center rounded-2xl border border-white/80 p-5 text-center shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            <Truck size={32} className="mx-auto mb-4 text-pink-400" />

            <h2 className="text-lg font-bold leading-relaxed text-gray-800">
              ENJOY FREE SHIPPING
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Orders above ₦200,000 qualify for free shipping.
            </p>

            <Link
              to="/shop"
              className="mt-5 inline-block rounded-xl bg-pink-400 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-pink-500"
            >
              Start Shopping
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-gray-300 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-gray-600">
              © {currentYear} FLOW LUXE Clothing & Fashion. All rights reserved.
            </p>

            <p className="text-sm text-gray-600">
              Built by{' '}
              <span className="font-semibold text-pink-500">Sammiedev</span>
            </p>
          </div>

          <p className="mt-4 text-center text-sm italic text-gray-500">
            Your Style. Your Confidence. Your FLOW.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
