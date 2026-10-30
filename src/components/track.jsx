import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch, ArrowRight } from 'lucide-react';
import track from '../assets/img-tracking.jpg';

const Trackpage = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tracking functionality will be connected to your backend.
    console.log({
      orderId,
      email,
    });
  };

  return (
    <section className="min-h-screen w-full bg-violet-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-pink-600 shadow-sm">
            ORDER TRACKING
          </span>

          <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Track Your <span className="text-pink-500">Order</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Your FLOW LUXE order is on its way. Enter your order details below
            to check its delivery progress.
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl border border-white/80 bg-white/70 p-5 shadow-[8px_8px_25px_#ddd5e8,-8px_-8px_25px_#ffffff] sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={track}
              alt="Track your FLOW LUXE order"
              className="h-64 w-full object-cover sm:h-80 lg:h-105"
            />
          </div>

          {/* Tracking Form */}
          <div>
            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-pink-600">
                <PackageSearch size={25} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Find Your Order
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Please provide your order ID and the email address used when
                placing your order.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Order ID */}
              <div>
                <label
                  htmlFor="orderId"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Order ID
                </label>

                <input
                  id="orderId"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* Billing Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Billing Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your billing email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-pink-600 hover:shadow-lg"
              >
                Track My Order
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Need assistance?{' '}
              <a
                href="https://wa.me/2349163402353"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-pink-600 hover:text-pink-700"
              >
                Contact us on WhatsApp
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Thank you for shopping with FLOW LUXE.
          </p>

          <Link
            to="/shop"
            className="mt-3 inline-block text-sm font-semibold text-pink-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Trackpage;
