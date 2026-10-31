import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingCart,
} from 'lucide-react';

import { useShopping } from '../context/useshopping';

const Cart = () => {
  const { cart, cartCount, cartTotal, removeFromCart, updateCartQuantity } =
    useShopping();

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);

  // Empty cart
  if (cart.length === 0) {
    return (
      <section className="min-h-[70vh] bg-violet-50 px-5 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mb-6 rounded-full bg-violet-100 p-6">
            <ShoppingBag size={48} className="text-pink-500" />
          </div>

          <h1 className="mb-3 text-2xl font-semibold text-[#1d0e05] sm:text-3xl">
            Your shopping bag is empty
          </h1>

          <p className="mb-8 max-w-md text-sm leading-6 text-gray-500">
            Looks like you haven't added anything to your bag yet. Discover
            beautiful styles and find something you love.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-pink-400 px-7 py-3 text-sm font-medium text-white transition hover:bg-pink-500"
          >
            <ShoppingCart size={18} />
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-violet-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Your Shopping Bag
          </p>

          <h1 className="text-3xl font-semibold text-[#1d0e05] sm:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            You have {cartCount} item{cartCount !== 1 ? 's' : ''} in your bag.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Cart Products */}
          <div className="space-y-5 lg:col-span-2">
            {cart.map((product) => (
              <article
                key={`${product.id}-${product.size}`}
                className="flex flex-col gap-5 rounded-2xl border border-white bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                {/* Product Image */}
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-44 w-full rounded-xl object-cover sm:h-36 sm:w-32"
                />

                {/* Product Details */}
                <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-[#1d0e05]">
                      {product.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      Size:{' '}
                      <span className="font-semibold">{product.size}</span>
                    </p>

                    <p className="mt-2 font-semibold text-gray-500">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-3 rounded-full border border-violet-200 px-3 py-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(
                            product.id,
                            product.size,
                            product.quantity - 1
                          )
                        }
                        disabled={product.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-5 text-center text-sm font-medium">
                        {product.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(
                            product.id,
                            product.size,
                            product.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                        className="text-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id, product.size)}
                      className="flex items-center gap-1 text-sm text-red-500 transition hover:text-red-700"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="mb-6 text-xl font-semibold text-[#1d0e05]">
              Order Summary
            </h2>

            <div className="space-y-4 border-b border-gray-100 pb-5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items ({cartCount})</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between py-5 text-lg font-semibold text-[#1d0e05]">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-medium text-white opacity-60"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              Checkout will be available once we complete the payment
              integration.
            </p>

            <Link
              to="/shop"
              className="mt-5 block text-center text-sm font-medium text-gray-700 hover:text-pink-700"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
