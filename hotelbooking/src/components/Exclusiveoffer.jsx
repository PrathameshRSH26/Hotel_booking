import React from 'react';
import { assets, exclusiveOffers } from '../assets/assets';

const Exclusiveoffer = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
      {/* Header & Button Row */}
      <div className='flex flex-col md:flex-row items-center justify-between w-full mb-10'>
        <div className='text-left max-w-xl'>
          <h2 className='text-3xl font-bold mb-2 font-playfair'>Exclusive Offers</h2>
          <p className='text-gray-700'>
            Take advantage of our limited-time offers and special packages to enhance your stay and create memories
          </p>
        </div>

        <button className='border rounded flex gap-1 p-2 group font-semibold filter group-hover:invert transition-all mt-4 md:mt-0'>
          <p className='m-2'>View All Offers</p>
          <img
            src={assets.arrowIcon}
            alt="arrowicon"
            className='transition-all group-hover:translate-x-1 p-1 w-5 h-5'
          />
        </button>
      </div>

      {/* Offers Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
        {exclusiveOffers.map((offer) => (
          <div
            key={offer._id}
            className='group relative flex flex-col items-start justify-between gap-1 pt-12 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center min-h-[300px] overflow-hidden'
          >
            {/* Background Image */}
            <div 
              className='absolute inset-0 bg-black/30 z-0'
              style={{
                backgroundImage: `url(${offer.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Content */}
            <div className='relative z-10 w-full'>
              <p className='px-3 py-1 text-xs bg-white text-gray-800 font-medium rounded-full inline-block'>
                {offer.priceOff}% OFF
              </p>
            </div>
            
            <div className='relative z-10 mt-auto pb-5'>
              <p className='text-2xl font-medium font-playfair'>{offer.title}</p>
              <p className='text-white/90'>{offer.description}</p>
              <p className='text-xs text-white/70 mt-3'>Expires {offer.expiryDate}</p>
              <button className='flex items-center gap-2 font-medium cursor-pointer mt-4'>
                View Offers
                <img
                  src={assets.arrowIcon}
                  alt="arrowicon"
                  className='transition-all group-hover:translate-x-1 p-1 w-5 h-5 invert'
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exclusiveoffer;