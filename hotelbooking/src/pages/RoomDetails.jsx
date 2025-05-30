import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logoJpg from "../assets/logo.jpg";

import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, []);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Hotel Name and Discount */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">( {room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating rating={room.rating || 4.5} />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Main & Sub Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="roomimg"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:w-1/2 w-full">
            {room?.images?.length > 0 &&
              room.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Room Image"
                  onClick={() => setMainImage(image)}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image ? "outline-3 outline-orange-500" : ""
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Title & Amenities */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt="item"
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Room Price */}
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>

        {/* Booking Form */}
        <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check In
              </label>
              <input
                type="date"
                id="checkInDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                type="number"
                placeholder="0"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 md:mt-0 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-800 bg-white rounded hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
          >
            Check Availability
          </button>
        </form>

        {/* Common Specs */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment that has a true city feeling. The price quoted is for two guests. Please mark the number of guests to get the exact price for groups.
          </p>
        </div>

        {/* Hosted By Section */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <img
  src={logoJpg}
  alt="hostedby"
  className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover"
/>

            <div className="text-lg md:text-xl">
              <p>Hosted By {room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <StarRating rating={room.rating || 4.5} />
                <p className="ml-4">200+ reviews</p>
              </div>
            </div>
          </div>

          {/* Contact Button */}
          <button className="mt-4 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-800 bg-white rounded hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
