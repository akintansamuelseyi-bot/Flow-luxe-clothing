import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Contactus from "./pages/Contactus";
import Shoppage from "./pages/Shoppage";
import Aboutpage from "./pages/Aboutpage";

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
    </Suspense>
  );
};

export default App;
