import { useContext } from 'react';
import { ShoppingContext } from './shoppingcontextvalue';

// Custom hook for accessing shopping information
export const useShopping = () => {
  const context = useContext(ShoppingContext);

  if (!context) {
    throw new Error('useShopping must be used inside a ShoppingProvider.');
  }

  return context;
};
