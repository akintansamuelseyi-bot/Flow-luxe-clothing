import flow from '../assets/flow.jpg';
const HeroSection = () => {
  return (
    <section className="w-full bg-white">
      {' '}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {' '}
        <div className="relative min-h-175 overflow-hidden">
          {' '}
          {/* Text Content */}{' '}
          <div className="relative z-30 flex min-h-175 flex-col justify-center pb-95 pt-16 sm:pb-105 md:justify-center md:pb-20 md:pt-0">
            {' '}
            <div className="max-w-3xl">
              {' '}
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gray-700  sm:text-base">
                {' '}
                Welcome to FLOW LUXE{' '}
              </p>{' '}
              <h1 className=" md:leading-13 leading-6 tracking-[-0.04em] text-gray-900 text-[26px] sm:text-[30px] md:text-[62px]  lg:text-[8]">
                {' '}
                Your Style. <br />{' '}
                <span className="  text-pink-500">
                  <span className="font-runethia ">Y</span> our Confidence.
                </span>{' '}
                <br /> Your <span className="font-runethia ">FL</span>OW.{' '}
              </h1>{' '}
              <p className="mt-6 max-w-xl text-sm leading-4.5 text-gray-700 sm:text-base md:text-lg">
                {' '}
                Where modern{' '}
                <span className="text-pink-500">
                  fashion meets effortless femininity.
                </span>{' '}
                Discover elegant pieces designed to make you feel confident,
                beautiful, and uniquely you.{' '}
              </p>{' '}
              <div className=" flex gap-6">
                {' '}
                <button className="mt-7 rounded-b-md bg-white px-4 py-2 text-sm font-medium uppercase border-white/80 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff] transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff] sm:px-4 sm:py-2 mb-10">
                  {' '}
                  Shop Now{' '}
                </button>
                <button className="mt-7 rounded-b-md bg-white px-4 py-2 text-sm font-medium uppercase border-white/80 shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff] transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-[inset_2px_2px_5px_#d9c5cc,inset_-2px_-2px_5px_#ffffff] sm:px-4 sm:py-2 mb-10">
                  {' '}
                  New Arrivals{' '}
                </button>
              </div>{' '}
            </div>{' '}
          </div>{' '}
          {/* Model / Clothing Image */}{' '}
          <div className=" absolute bottom-1 md:right-10 z-20 flex h-[55%] w-[90%] md:items-end md:justify-end sm:right-5 sm:h-[60%] sm:w-[75%]  md:h-full md:w-[58%]">
            {' '}
            <img
              src={flow}
              alt="FLOW LUXE fashion"
              className="h-full w-auto max-w-none object-contain object-bottom mt-9  "
            />{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
};
export default HeroSection;
