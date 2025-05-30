import React from "react";
import { Link } from "react-router-dom";

// ✅ Proper asset imports
import starIconFilled from "../assets/starIconFilled.svg";
import locationIcon from "../assets/locationIcon.svg";

const Hotelcard = ({ room, index }) => {
  return (
    <Link
      to={"/rooms/" + room._id}
      onClick={() => scrollTo(0, 0)}
      className="relative max-w-70 w-full 
        rounded-xl overflow-hidden bg-white text-gray-50/90 shadow-[0px_4px_4px_rgba(0,0,0,0.5)] mb-6"
    >
      <img
        src={room.images[0]}
        alt="Room"
        className="w-full h-60 object-cover"
      />

      {index % 2 === 0 && (
        <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
          Best Seller
        </p>
      )}

      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.hotel.name}
          </p>
          <div className="flex items-center gap-1">
            <img src={starIconFilled} alt="Star" className="w-4 h-4" />
            <span className="text-sm text-gray-700">4.5</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <img src={locationIcon} alt="Location" className="w-4 h-4" />
          <span>{room.hotel.address}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-base font-semibold text-gray-800">
            ${room.pricePerNight}{" "}
            <span className="text-sm text-gray-500">/night</span>
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-800 bg-white rounded hover:bg-gray-100 transition-all cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Hotelcard;
