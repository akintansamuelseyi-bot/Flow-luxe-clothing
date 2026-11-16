import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import AdminRoute from './components/adminroute';
import CartDrawer from './components/cartdrawer';

const Homepage = lazy(() => import('./pages/Homepage'));
const Contactus = lazy(() => import('./pages/Contactus'));
const Shoppage = lazy(() => import('./pages/Shoppage'));
const Aboutpage = lazy(() => import('./pages/Aboutpage'));
const Privacypage = lazy(() => import('./pages/privacypage'));
const Refundpage = lazy(() => import('./pages/refundpage'));
const Termspage = lazy(() => import('./pages/termspage'));
const Trackpage = lazy(() => import('./pages/trackpage'));
const Cartpage = lazy(() => import('./pages/cartpage'));
const Accountpage = lazy(() => import('./pages/accountpage'));
const Wishlistpage = lazy(() => import('./pages/wishlistpage'));
const Checkoutpage = lazy(() => import('./pages/checkoutpage'));
const Adminpage = lazy(() => import('./pages/adminpage'));

const Paymentcallbackpage = lazy(() => import('./pages/paymentcallbackpage'));

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/privacy" element={<Privacypage />} />
        <Route path="/refund" element={<Refundpage />} />
        <Route path="/terms" element={<Termspage />} />
        <Route path="/track" element={<Trackpage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/account" element={<Accountpage />} />
        <Route path="/wishlist" element={<Wishlistpage />} />
        <Route path="/checkout" element={<Checkoutpage />} />
        <Route path="/payment/callback" element={<Paymentcallbackpage />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Adminpage />} />
        </Route>
      </Routes>

      <CartDrawer />
    </Suspense>
  );
};

export default App;
