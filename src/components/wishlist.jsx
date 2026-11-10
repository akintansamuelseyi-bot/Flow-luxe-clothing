import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  ArrowLeft,
} from 'lucide-react';

import { useShopping } from '../context/useshopping';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShopping();

  const [selectedSizes, setSelectedSizes] = useState({});

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id];

    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }

    addToCart(product, selectedSize);
  };

  return (
    <section className="min-h-screen bg-[#faf8fc] px-4 py-12 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex justify-center">
            <div className="rounded-full bg-pink-100 p-4">
              <Heart size={28} className="fill-pink-400 text-pink-500" />
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-3 text-gray-500">
            Your favourite styles, all in one place.
          </p>

          <p className="mt-2 text-sm font-medium text-pink-400">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Empty wishlist */}
        {wishlist.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-5 flex justify-center">
              <div className="rounded-full bg-pink-50 p-6">
                <ShoppingBag size={42} className="text-pink-400" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Your wishlist is waiting!
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              You haven't saved any styles yet. Explore our collection and tap
              the heart on products you love.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-pink-400 px-7 py-3 text-sm font-medium text-white transition hover:bg-pink-500"
            >
              <ArrowLeft size={17} />
              Explore Collection
            </Link>
          </div>
        ) : (
          /* Wishlist products */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Product image */}
                <div className="relative bg-[#f8f5fa] p-4">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-64 w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.title} from wishlist`}
                    className="absolute right-4 top-4 rounded-full bg-white p-2 text-pink-400 shadow-md transition hover:scale-110"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>

                {/* Product information */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-800">
                    {product.title}
                  </h3>

                  <p className="mt-2 text-lg font-semibold text-pink-400">
                    ₦{Number(product.price).toLocaleString('en-NG')}
                  </p>

                  {/* Size selector */}
                  <label
                    htmlFor={`size-${product.id}`}
                    className="mt-4 block text-sm font-medium text-gray-600"
                  >
                    Choose your size
                  </label>

                  <select
                    id={`size-${product.id}`}
                    value={selectedSizes[product.id] || ''}
                    onChange={(event) =>
                      setSelectedSizes((previous) => ({
                        ...previous,
                        [product.id]: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-pink-400"
                  >
                    <option value="">Select size</option>

                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>

                  {/* Add to cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-pink-400 py-3 text-sm font-medium text-white transition hover:bg-pink-500"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
