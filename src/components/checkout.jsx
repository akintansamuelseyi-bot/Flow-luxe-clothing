import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  ShoppingBag,
  MapPin,
  User,
  Mail,
  Phone,
} from 'lucide-react';

import { useShopping } from '../context/useshopping';

const Checkout = () => {
  const { cart, cartCount, cartTotal } = useShopping();

  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    deliveryInstructions: '',
  });

  const [message, setMessage] = useState('');

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomerDetails((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage(
      'Your checkout details have been validated. Payment integration is the next step. Your delivery fee will be confirmed separately by FLOW LUXE.'
    );
  };

  const inputClass =
    'mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100';

  if (cart.length === 0) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#faf8fc] px-5 py-16">
        <div className="w-full max-w-lg rounded-3xl bg-white px-6 py-14 text-center shadow-sm">
          <ShoppingBag size={45} className="mx-auto mb-5 text-pink-400" />

          <h1 className="text-2xl font-semibold text-gray-800">
            Your shopping bag is empty
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Add something beautiful to your cart before proceeding to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-full bg-pink-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-pink-700"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#faf8fc] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-pink-600">
            FLOW LUXE
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-gray-800 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            You're one step closer to your favourite styles.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Customer Information */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-7 rounded-2xl border border-pink-100 bg-white p-5 shadow-sm sm:p-8"
            >
              {/* Contact Information */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-full bg-pink-100 p-3">
                    <User size={20} className="text-pink-500" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Contact Information
                    </h2>

                    <p className="text-xs text-gray-500">
                      Enter the details we should use to contact you.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={customerDetails.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-5 text-gray-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={customerDetails.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number *
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-5 text-gray-400"
                      />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={customerDetails.phone}
                        onChange={handleChange}
                        placeholder="e.g. 08012345678"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Delivery Address */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-full bg-pink-100 p-3">
                    <MapPin size={20} className="text-pink-500" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Delivery Address
                    </h2>

                    <p className="text-xs text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-700"
                    >
                      Street Address *
                    </label>

                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      autoComplete="street-address"
                      value={customerDetails.address}
                      onChange={handleChange}
                      placeholder="House number and street name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="apartment"
                      className="text-sm font-medium text-gray-700"
                    >
                      Apartment, Suite or Landmark
                    </label>

                    <input
                      id="apartment"
                      name="apartment"
                      type="text"
                      value={customerDetails.apartment}
                      onChange={handleChange}
                      placeholder="Optional"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="text-sm font-medium text-gray-700"
                      >
                        City *
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        autoComplete="address-level2"
                        value={customerDetails.city}
                        onChange={handleChange}
                        placeholder="Your city"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="text-sm font-medium text-gray-700"
                      >
                        State *
                      </label>

                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        autoComplete="address-level1"
                        value={customerDetails.state}
                        onChange={handleChange}
                        placeholder="Your state"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      autoComplete="postal-code"
                      value={customerDetails.postalCode}
                      onChange={handleChange}
                      placeholder="Optional"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="deliveryInstructions"
                      className="text-sm font-medium text-gray-700"
                    >
                      Delivery Instructions
                    </label>

                    <textarea
                      id="deliveryInstructions"
                      name="deliveryInstructions"
                      rows={3}
                      value={customerDetails.deliveryInstructions}
                      onChange={handleChange}
                      placeholder="Any additional directions for delivery? (Optional)"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information Notice */}
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
                <h3 className="mb-2 text-sm font-semibold text-pink-400">
                  Important Delivery Information
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  After your order and product payment are confirmed, FLOW LUXE
                  will contact you using the phone number provided to confirm
                  your delivery details and communicate the delivery fee.
                </p>

                <p className="mt-2 text-sm font-medium text-pink-400">
                  Please note: Delivery fees are calculated separately and will
                  be paid after confirmation.
                </p>
              </div>

              {message && (
                <div
                  role="status"
                  className="rounded-xl border border-pink-200 bg-pink-50 p-4 text-sm leading-6 text-pink-400"
                >
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-pink-400 px-6 py-4 text-sm font-semibold text-white transition hover:bg-pink-500"
              >
                Continue to Payment
                <ArrowRight size={18} />
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-xs text-gray-400">
                <LockKeyhole size={14} />
                Your information will be handled securely.
              </p>

              <Link
                to="/cart"
                className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-pink-700"
              >
                <ArrowLeft size={16} />
                Return to Cart
              </Link>
            </form>
          </div>

          {/* Order Summary */}
          <aside className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Order</h2>

            <p className="mt-1 text-sm text-gray-500">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag
            </p>

            <div className="mt-6 space-y-5">
              {cart.map((product) => (
                <div
                  key={`${product.id}-${product.size}`}
                  className="flex gap-4"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-20 w-16 rounded-lg bg-pink-50 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {product.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Size: {product.size} · Qty: {product.quantity}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-pink-500">
                      {formatPrice(product.price * product.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium text-pink-400">
                  To be confirmed
                </span>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4 text-base font-semibold text-gray-800">
                <span>Product Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <p className="text-xs leading-5 text-gray-400">
                This is the amount payable for your products at checkout.
                Delivery charges are separate and will be communicated to you by
                FLOW LUXE after your payment is confirmed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
