import { useState } from 'react';
import { ArrowBigRight, ShoppingCart, X, Minus, Plus } from 'lucide-react';
import { useShopping } from '../context/useshopping';
import products from '../data/products';

const Categories = () => {
  // Product currently being previewed
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Selected clothing size
  const [selectedSize, setSelectedSize] = useState('');

  // Product quantity
  const [quantity, setQuantity] = useState(1);

  // Shared shopping information
  const { addToCart, cartCount } = useShopping();

  // Open product preview
  const handlePreview = (product) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setQuantity(1);
  };

  // Close product preview
  const closePreview = () => {
    setSelectedProduct(null);
    setSelectedSize('');
    setQuantity(1);
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity((previousQuantity) =>
      previousQuantity > 1 ? previousQuantity - 1 : 1
    );
  };

  // Add product to shared cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding this item to your cart.');
      return;
    }

    addToCart(selectedProduct, selectedSize, quantity);

    alert(`${selectedProduct.title} has been added to your cart.`);

    closePreview();
  };

  return (
    <div className="w-full border bg-violet-50">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-12">
        {/* SECTION HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">
            Shop By Category
          </h2>

          <button
            type="button"
            className="my-4 flex items-center rounded-2xl border border-white/80 bg-violet-50 p-2 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff] transition-all duration-300 hover:-translate-y-1"
          >
            View All
            <ArrowBigRight size={18} className="ml-2" />
          </button>
        </div>

        {/* PRODUCTS */}
        <div className="mx-auto py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white p-2 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-3"
              >
                {/* PRODUCT IMAGE */}
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-48 w-full object-contain transition duration-500 hover:scale-105 md:h-64"
                  />
                </div>

                {/* PRODUCT INFORMATION */}
                <div className="mt-3">
                  <h2 className="text-sm font-medium md:text-base">
                    {product.title}
                  </h2>

                  <p className="mt-1 text-gray-700">
                    ₦{product.price.toLocaleString()}
                  </p>

                  {/* PREVIEW BUTTON */}
                  <button
                    type="button"
                    onClick={() => handlePreview(product)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-pink-200 bg-violet-50 p-2 text-pink-400 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff] transition-all duration-300 hover:-translate-y-1"
                  >
                    <ShoppingCart size={18} />
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT PREVIEW MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closePreview}
        >
          {/* MODAL */}
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={closePreview}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100"
            >
              <X size={22} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* PRODUCT IMAGE */}
              <div className="flex min-h-87.5 items-center justify-center bg-gray-100 p-6 md:min-h-125">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.title}
                  className="max-h-112.5 w-full object-contain"
                />
              </div>

              {/* PRODUCT DETAILS */}
              <div className="p-6 md:p-10">
                <p className="text-sm uppercase tracking-widest text-gray-500">
                  {selectedProduct.item}
                </p>

                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                  {selectedProduct.title}
                </h2>

                <p className="mt-3 text-2xl font-bold text-gray-800">
                  ₦{selectedProduct.price.toLocaleString()}
                </p>

                <div className="my-6 h-px bg-gray-200" />

                {/* DESCRIPTION */}
                <div>
                  <h3 className="font-semibold">Product Details</h3>

                  <p className="mt-2 leading-7 text-gray-600">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* SIZE */}
                <div className="mt-6">
                  <h3 className="mb-3 font-semibold">Select Size</h3>

                  <div className="flex flex-wrap gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-lg border px-5 py-2 text-sm font-medium transition ${
                          selectedSize === size
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 hover:border-gray-900'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="mt-6">
                  <h3 className="mb-3 font-semibold">Quantity</h3>

                  <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="flex h-10 w-10 items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="flex h-10 w-12 items-center justify-center border-x border-gray-300 font-medium">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="flex h-10 w-10 items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                {/* CART COUNT */}
                {cartCount > 0 && (
                  <p className="mt-3 text-center text-sm text-gray-500">
                    {cartCount} item
                    {cartCount > 1 ? 's' : ''} in your cart
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
