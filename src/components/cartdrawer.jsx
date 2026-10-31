import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

import { useShopping } from '../context/useshopping';

const CartDrawer = () => {
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
  } = useShopping();

  const closeDrawer = () => setIsCartOpen(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <>
      {/* Background Overlay */}
      <button
        type="button"
        onClick={closeDrawer}
        aria-label="Close shopping cart"
        tabIndex={isCartOpen ? 0 : -1}
        className={`fixed inset-0 z-60 bg-black/40 transition-opacity duration-300 ${
          isCartOpen
            ? 'visible opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
      />

      {/* Cart Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your shopping cart"
        aria-hidden={!isCartOpen}
        inert={!isCartOpen}
        className={`fixed right-0 top-0 z-70 flex h-dvh w-[92vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:w-[60vw] lg:w-[30vw] lg:min-w-[340px] lg:max-w-[480px] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-violet-100 px-5 py-5">
          <div>
            <h2 className="text-xl font-semibold text-[#1d0e05]">
              Your Cart ({cartCount})
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Your favourite styles, all in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="rounded-full bg-violet-50 p-2 text-gray-700 transition hover:bg-violet-100 hover:text-pink-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Products */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={48} className="mb-4 text-pink-300" />

              <h3 className="text-lg font-semibold text-[#1d0e05]">
                Your cart is empty
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Find something beautiful to add to your bag.
              </p>

              <Link
                to="/shop"
                onClick={closeDrawer}
                className="mt-5 rounded-full bg-pink-500 px-6 py-3 text-sm font-medium text-white hover:bg-pink-600"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((product) => (
                <article
                  key={`${product.id}-${product.size}`}
                  className="flex gap-4 border-b border-gray-100 pb-5"
                >
                  {/* Product Image */}
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-24 w-20 shrink-0 rounded-lg object-cover"
                  />

                  {/* Product Information */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-[#1d0e05]">
                      {product.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Size: {product.size}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-gray-800">
                      {formatPrice(product.price)}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>

                  {/* Remove Product */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id, product.size)}
                    aria-label={`Remove ${product.title} from cart`}
                    className="self-start text-gray-400 transition hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="border-t border-violet-100 bg-white px-5 pb-6 pt-5">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1d0e05]">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Delivery</span>
              <span>To be confirmed</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-base font-semibold text-[#1d0e05]">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <p className="mt-3 text-xs leading-5 text-gray-500">
              Delivery costs will be confirmed based on your location before
              payment.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white opacity-60"
            >
              Checkout
              <ArrowRight size={18} />
            </button>

            <Link
              to="/cart"
              onClick={closeDrawer}
              className="mt-3 block w-full rounded-full border border-pink-300 px-5 py-3 text-center text-sm font-semibold text-gray-800 transition hover:bg-violet-50"
            >
              View Cart
            </Link>

            <button
              type="button"
              onClick={closeDrawer}
              className="mt-4 w-full text-center text-xs font-medium text-gray-500 transition hover:text-pink-700"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
