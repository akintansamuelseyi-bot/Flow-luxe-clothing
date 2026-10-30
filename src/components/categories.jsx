import { useState } from 'react';
import { ArrowBigRight, ShoppingCart, X, Minus, Plus } from 'lucide-react';

import cloth1 from '../assets/cloth1.jpg';
import cloth2 from '../assets/cloth2.jpg';
import cloth3 from '../assets/cloth3.jpg';
import cloth4 from '../assets/cloth4.jpg';
import cloth5 from '../assets/cloth5.jpg';
import cloth6 from '../assets/cloth6.jpg';
import cloth7 from '../assets/cloth7.jpg';
import cloth8 from '../assets/cloth8.jpg';
import bumbshort from '../assets/bumpshot.PNG';
import cloth10 from '../assets/white-upndown.JPEG';

const categories = [
  {
    id: 1,
    item: 'Gown',
    img: cloth1,
    title: 'Ladies Dress',
    price: 12000,
    description:
      'A beautiful and elegant ladies dress designed to give you a stylish and confident look.',
  },
  {
    id: 2,
    item: 'Gown',
    img: cloth2,
    title: 'Ladies Dress',
    price: 12000,
    description:
      'A stylish feminine dress perfect for special occasions and everyday elegance.',
  },
  {
    id: 3,
    item: 'Gown',
    img: cloth3,
    title: 'Ladies Dress',
    price: 10000,
    description: 'A beautiful gown designed with comfort and elegance in mind.',
  },
  {
    id: 4,
    item: 'Gown',
    img: cloth4,
    title: 'Ladies Dress',
    price: 12000,
    description:
      'A fashionable ladies dress that combines modern style with effortless elegance.',
  },
  {
    id: 5,
    item: 'Gown',
    img: cloth5,
    title: 'Ladies Dress',
    price: 12000,
    description:
      'A gorgeous dress that adds a sophisticated touch to your wardrobe.',
  },
  {
    id: 6,
    item: 'Gown',
    img: cloth6,
    title: 'Ladies Dress',
    price: 12000,
    description: 'A versatile feminine dress suitable for different occasions.',
  },
  {
    id: 7,
    item: 'Gown',
    img: cloth7,
    title: 'Ladies Dress',
    price: 10000,
    description:
      'A stylish and comfortable dress created for a beautiful everyday look.',
  },
  {
    id: 8,
    item: 'Gown',
    img: cloth8,
    title: 'Ladies Dress',
    price: 12000,
    description:
      'An elegant ladies dress designed to make you stand out with confidence.',
  },
  {
    id: 9,
    item: 'Bumb Short',
    img: bumbshort,
    title: 'Bumb Short',
    price: 6000,
    description:
      'A comfortable and stylish bumb short that is perfect for casual outfits.',
  },
  {
    id: 10,
    item: 'Twopieces',
    img: cloth10,
    title: 'Two-Piece Set',
    price: 20000,
    description:
      'A beautiful two-piece outfit designed for a stylish and confident appearance.',
  },
];

const Categories = () => {
  // Product currently being previewed
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Selected clothing size
  const [selectedSize, setSelectedSize] = useState('');

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Cart
  const [cart, setCart] = useState([]);

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

  // Add product to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding this item to your cart.');
      return;
    }

    const cartItem = {
      ...selectedProduct,
      size: selectedSize,
      quantity,
    };

    setCart((previousCart) => [...previousCart, cartItem]);

    alert(`${selectedProduct.title} has been added to your cart.`);

    closePreview();
  };

  return (
    <div className="w-full bg-violet-50 border">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-12">
        {/* SECTION HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">
            Shop By Category
          </h2>

          <button
            type="button"
            className="flex items-center rounded-2xl bg-violet-50 my-4 border border-white/80 p-2 transition-all duration-300 hover:-translate-y-1 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]"
          >
            View All
            <ArrowBigRight size={18} className="ml-2" />
          </button>
        </div>

        {/* PRODUCTS */}
        <div className="mx-auto py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {categories.map((product) => (
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
                  <h2 className=" text-sm font-medium md:text-base">
                    {product.title}
                  </h2>

                  <p className="mt-1 text-gray-700">
                    ₦{product.price.toLocaleString()}
                  </p>

                  {/* PREVIEW BUTTON */}
                  <button
                    type="button"
                    onClick={() => handlePreview(product)}
                    className="mt-3 flex w-full items-center border border-pink-200 justify-center gap-2 rounded-2xl bg-violet-50 p-1 text-pink-400 border border-white/80 p-2  transition-all duration-300 hover:-translate-y-1 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]"
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

      {/* ================= PRODUCT PREVIEW MODAL ================= */}

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
                {cart.length > 0 && (
                  <p className="mt-3 text-center text-sm text-gray-500">
                    {cart.length} item
                    {cart.length > 1 ? 's' : ''} in your cart
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
