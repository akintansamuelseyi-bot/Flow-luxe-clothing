import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Contactus from './pages/Contactus';
import Shoppage from './pages/Shoppage';
import Aboutpage from './pages/Aboutpage';
import Privacypage from './pages/privacypage';
import Refundpage from './pages/refundpage';
import Termspage from './pages/termspage';
import Trackpage from './pages/trackpage';

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/privacy" element={<Privacypage />} />
        <Route path="/refund" element={<Refundpage />} />
        <Route path="/terms" element={<Termspage />} />
        <Route path="/track" element={<Trackpage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
