import React from "react";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = React.useState(userBookingsDummyData);
  return (
    <div className="py-28 md:pb-32 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="text-left mb-8 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 font-playfair">
          My Bookings
        </h2>
        <p className="font text-md text-gray-900">
          Easily manage your past, current and upcoming hotel reservations in
          one place. Plan your trips seamlessly with just a few clicks
        </p>
      </div>

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date and Timing</div>
          <div className="w-1/3">Payment</div>
        </div>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            {/* Hotel details */}
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room.images[0]}
                alt="img"
                className="w-full md:w-44 h-32 rounded shadow object-cover"
              />
              <div className="flex flex-col gap-1.5 md:ml-4 mt-3 md:mt-0">
                <p className="font-playfair text-2xl">
                  {booking.hotel.name}
                  <span className="font-inter text-sm">
                     ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="guesticon" className="w-4 h-4" />
                  <span>{booking.guests} guests</span>
                </div>
                <p className="text-base">Total: ${booking.totalPrice}</p>
              </div>
            </div>
            {/* Date and time */}
<div className="flex flex-col justify-center gap-2 mt-3 md:mt-0">
  <div className="flex items-center gap-2">
    <p className="font-medium">Check-In:</p>
    <p className="text-gray-500 text-sm">
      {new Date(booking.checkInDate).toDateString()}
    </p>
  </div>
  <div className="flex items-center gap-2">
    <p className="font-medium">Check-Out:</p>
    <p className="text-gray-500 text-sm">
      {new Date(booking.checkOutDate).toDateString()}
    </p>
  </div>
</div>

            <div className="flex flex-col items-start justify-center pt-3">
  <div className="flex items-center gap-2 mb-2">
    <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
    <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>
      {booking.isPaid ? "Paid" : "Unpaid"}
    </p>
  </div>
  {!booking.isPaid && (
    <button className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-800 bg-white rounded hover:bg-gray-100 transition-all cursor-pointer">
    Pay Now
    </button>
  )}
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;