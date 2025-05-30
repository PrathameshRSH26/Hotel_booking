import React from 'react';
import { assets } from '../assets/assets';

const StarRating = ({ rating }) => {
  return (
    <>
      {Array(5).fill('').map((_, index) => (
        <img
          key={index}
          src={Number(rating) > index ? assets.starIconFilled : assets.starIconOutlined}
          alt="star-icon"
          className="w-4 h-4"
        />
      ))}
    </>
  );
};

export default StarRating;
