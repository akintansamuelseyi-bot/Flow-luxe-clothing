import React from "react";

const Newsletter = () => {
  return (
    <div
      className="w-full bg-violet-50
  "
    >
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-12 ">
        <div className="flex flex-col border border-pink-200 rounded-bl-4xl p-5">
          <h1 className=" font-bold mb-4 md:text-[40px]">
            Subscribe To Our Newsletter To Stay In The Flow{" "}
          </h1>
          <p className="">
            Be the first to discover our new arrivals,
            <span className="text-pink-500 ">
              our exclusive offers, styling inspiration,
            </span>{" "}
            and everything new at FLOW LUXE
          </p>
          <input
            type="text"
            placeholder="Enter Your Email"
            className=" rounded-2xl bg-violet-50 my-4 border border-white/80 p-2 transition-all duration-300 hover:-translate-y-1 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]"
          />
          <button className=" w-30 my-4 rounded-2xl bg-violet-50 border border-white/80 p-2 transition-all duration-30 hover:-translate-y-1 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]">
            Join Us
          </button>
          <p className="py-4">
            This section is completely optional. Subscribe with your email to
            receive updates about our new arrivals, exclusive offers, discount
            sales, restocks, and other exciting FLOW LUXE updates so you never
            miss a great deal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
