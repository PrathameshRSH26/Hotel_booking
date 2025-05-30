import React from 'react';
import { testimonials } from '../assets/assets';
import StarRating from './StarRating';

const Testimonial = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
          What Our Guests Say
        </h2>
        <p className="text-lg text-gray-600">
          Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-full">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4">
              <StarRating rating={testimonial.rating} />
            </div>

            <p className="text-gray-500 max-w-90 mt-4">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
