import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const brandStatements = [
  {
    title: "Premium & Unique Styles",
    description:
      "Discover carefully selected pieces that bring elegance, individuality, and timeless style to your wardrobe.",
  },
  {
    title: "Made for Confidence",
    description:
      "Fashion designed to help you feel beautiful, comfortable, and confident in everything you wear.",
  },
  {
    title: "Quality You Can Feel",
    description:
      "We pay attention to the details, bringing you beautiful pieces selected with quality and comfort in mind.",
  },
  {
    title: "Fashion for Every Occasion",
    description:
      "From everyday looks to special moments, find styles that make every occasion a little more beautiful.",
  },
];

const BrandStatements = () => {
  const [currentStatement, setCurrentStatement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatement((previous) =>
        previous === brandStatements.length - 1 ? 0 : previous + 1,
      );
    }, 2700);

    return () => clearInterval(interval);
  }, []);

  const statement = brandStatements[currentStatement];

  return (
    <section className="w-full bg-violet-50 px-5 py-3 sm:px-8 md:py-14">
      <div className="mx-auto max-w-5xl text-center">
        {/* SMALL LABEL */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-gray-500" />

          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
            The FLOW LUXE Experience
          </span>

          <Sparkles size={16} className="text-gray-500" />
        </div>

        {/* ROTATING CONTENT */}
        <div
          key={currentStatement}
          className="min-h-37.5 animate-[fadeIn_0.8s_ease-in-out]"
        >
          <h2 className="text-3xl font-light tracking-tight text-gray-500 sm:text-2xl md:text-4xl">
            {statement.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            {statement.description}
          </p>
        </div>

        {/* INDICATORS */}
        <div className="mt-3 flex items-center justify-center gap-2">
          {brandStatements.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentStatement(index)}
              aria-label={`Show statement ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentStatement === index
                  ? "w-4 bg-gray-900"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* SMALL BRAND LINE */}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gray-400">
          <span>FLOW LUXE</span>
          <span>•</span>
          <span>Style with Confidence</span>
        </div>
      </div>
    </section>
  );
};

export default BrandStatements;
