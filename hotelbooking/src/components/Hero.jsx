import React from "react";

const Hero = () => {
  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/pexels.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full">
        The ultimate Hotel Experience
      </p>

      <h1 className=" mt-[2%] font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>

      <p className="mt-[5px] text-white/200 max-w-md font-bold">
        Unparalleled luxury and comfort await at the worlds most exclusive
        hotels and resorts. Start your journey today.
      </p>

      <form className="bg-white text-gray-700 rounded-lg px-6  py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto mt-8">
        {/* Destination Input */}
        <div>
          <label htmlFor="destinationInput" className="block font-medium mb-1">
            Destination
          </label>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-300 px-3 py-2 text-sm w-44 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {["Paris", "Tokyo", "New York", "Dubai", "Rome"].map(
              (city, index) => (
                <option value={city} key={index} />
              )
            )}
          </datalist>
        </div>

        {/* Check-in */}
        <div>
          <label htmlFor="checkIn" className="block font-medium mb-1">
            Check in
          </label>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-300 px-3 py-2 text-sm w-40 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Check-out */}
        <div>
          <label htmlFor="checkOut" className="block font-medium mb-1">
            Check out
          </label>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-300 px-3 py-2 text-sm w-40 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className="block font-medium mb-1">
            Guests
          </label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-300 px-3 py-2 text-sm w-20 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="0"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-black text-white px-5 py-3 rounded-md text-sm font-medium mt-6 md:mt-auto hover:bg-gray-800 transition-all duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};
export default Hero;
