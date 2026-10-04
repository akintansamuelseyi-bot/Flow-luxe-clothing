import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-gray-200">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="md:flex gap-8 text-gray-600">
          {" "}
          <div className="border md:border-hidden p-2 border-white/80 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff] ">
            <h2 className="py-6">Contact</h2>
            <ul className="space-y-3">
              <li> Phone Number: 09163402353</li>
              <li>Whatsapp Number: 09163402353</li>
              <li>Instagram:</li>
              <li>Tiktok:</li>
              <li>Email:</li>
              <li>Facebook:</li>
              <li>Location: Ibadan Nigeria</li>
            </ul>
          </div>
          <div className="border md:border-hidden p-2 border-white/80 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            <h2 className="py-6">Shop</h2>
            <ul className="space-y-3">
              <li>New Arrivals</li>
              <li>Best Sellers Gowns</li>
              <li>Baggy Jeans</li>
              <li>Two-Set</li>
              <li> Bumb Shorts/Mum Shorts</li> <li> All Products</li>
              <li>Party Dress</li>
              <li>Kids Wears</li>
              <li>Wigs</li>
            </ul>
          </div>
          <div className="border md:border-hidden p-2 border-white/80 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            {" "}
            <h2 className="py-6"> Help</h2>
            <ul className="space-y-3">
              <li>Refund Policy</li>
              <li>Shipping & Delivery</li> <li>Order Tracking</li>
            </ul>
          </div>
          <div className="border md:border-hidden p-2 border-white/80 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            <h2 className="py-6">About</h2>
            <ul className="space-y-3">
              {" "}
              <li>Why FLOW LUXE</li>
              <li>Privacy Policy</li> <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h2 className="py-6">ORDERS ABOVE 200K GETS FREE SHIPPING</h2>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {" "}
          <h3 className="text-[18px]">
            © 2026 FLOW LUXE Clothing & fashion -- Built by{" "}
            <span className="text-pink-500">Sammiedev</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
