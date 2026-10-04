import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const testimonials = [
  {
    id: 1,
    name: "Sarah",
    role: "FLOW LUXE Customer",
    review:
      "I absolutely love my dress from FLOW LUXE. The quality was beautiful, the fit was perfect, and I felt so confident wearing it.",
  },
  {
    id: 2,
    name: "Amanda",
    role: "FLOW LUXE Customer",
    review:
      "FLOW LUXE has quickly become one of my favorite fashion brands. Their styles are elegant, unique, and perfect for different occasions.",
  },
  {
    id: 3,
    name: "Jessica",
    role: "FLOW LUXE Customer",
    review:
      "My two-piece set was exactly what I hoped for. It looked even better in person and I received so many compliments when I wore it.",
  },
];

const Testimonial = () => {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <section ref={sectionRef} className="w-full border  bg-violet-50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:px-12 lg:px-16">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 font-semibold text-pink-400">Testimonials</p>

          <h2 className="mb-4 text-[24px] font-bold text-gray-800 md:text-[30px]">
            What Our Customers Say
          </h2>

          <p className="mx-auto max-w-2xl text-[14px] leading-6 text-gray-500 md:text-[16px]">
            We love making women feel confident, beautiful, and comfortable in
            their own style. Here's what some of our customers have to say about
            their FLOW LUXE experience.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300 hover:-translate-y-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 80,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 80,
                    }
              }
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className=" rounded-2xl bg-violet-50 p-3 shadow-[6px_6px_14px_#d9c5cc,-6px_-6px_14px_#ffffff]
  "
            >
              {/* INNER FRAME */}
              <div
                className=" rounded-4xl border border-white/80 p-6 transition-all duration-300 hover:-translate-y-1 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff]
    "
              >
                {/* Customer information */}
                <div className="mb-5 flex items-center gap-4">
                  <div
                    className="flex h-12 w-14 items-center justify-center rounded-full bg-pink-50 shadow-[4px_4px_8px_#d9c5cc,-4px_-4px_8px_#ffffff]
        "
                  >
                    <span className="text-xl font-bold text-pink-400">
                      {item.name.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-400">{item.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4 tracking-wide text-pink-400">
                  ★ ★ ★ ★ ★
                </div>

                {/* Review */}
                <p className="text-[14px] leading-6 text-gray-600">
                  "{item.review}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
