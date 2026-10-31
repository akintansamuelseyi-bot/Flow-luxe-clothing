import { useCallback, useEffect, useMemo, useState } from 'react';

import { ShoppingContext } from './shoppingcontextvalue';

// Storage keys
const CART_STORAGE_KEY = 'flow-luxe-cart';
const WISHLIST_STORAGE_KEY = 'flow-luxe-wishlist';

// Safely retrieve saved data from localStorage
const getSavedData = (key) => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  } catch (error) {
    console.error(`Unable to load ${key}:`, error);
    return [];
  }
};

// Shopping provider
export const ShoppingProvider = ({ children }) => {
  // Cart and wishlist states
  const [cart, setCart] = useState(() => getSavedData(CART_STORAGE_KEY));

  const [wishlist, setWishlist] = useState(() =>
    getSavedData(WISHLIST_STORAGE_KEY)
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Unable to save cart:', error);
    }
  }, [cart]);

  // Save wishlist whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Unable to save wishlist:', error);
    }
  }, [wishlist]);

  // Add a product to the cart
  const addToCart = useCallback((product, size, quantity = 1) => {
    if (!product?.id || !size || quantity < 1) return;

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...previousCart, { ...product, size, quantity }];
    });

    // Open the cart drawer after adding a product
    setIsCartOpen(true);
  }, []);

  // Remove a product from the cart
  const removeFromCart = useCallback((productId, size) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => !(item.id === productId && item.size === size)
      )
    );
  }, []);

  // Update product quantity
  const updateCartQuantity = useCallback((productId, size, quantity) => {
    if (quantity < 1) return;

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  // Empty the cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Add or remove a product from the wishlist
  const toggleWishlist = useCallback((product) => {
    if (!product?.id) return;

    setWishlist((previousWishlist) => {
      const alreadySaved = previousWishlist.some(
        (item) => item.id === product.id
      );

      return alreadySaved
        ? previousWishlist.filter((item) => item.id !== product.id)
        : [...previousWishlist, product];
    });
  }, []);

  // Check whether a product is in the wishlist
  const isInWishlist = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  // Remove a product from the wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist((previousWishlist) =>
      previousWishlist.filter((item) => item.id !== productId)
    );
  }, []);

  // Calculate total cart quantity and price
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  // Share all shopping information with the application
  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      removeFromWishlist,
    }),
    [
      cart,
      wishlist,
      cartCount,
      cartTotal,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      removeFromWishlist,
    ]
  );

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};
