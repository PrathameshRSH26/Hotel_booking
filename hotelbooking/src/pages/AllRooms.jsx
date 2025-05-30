// AllRooms.jsx
import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const handleRoomClick = (roomId) => {
    scrollTo(0, 0);
    navigate(`/rooms/${roomId}`); // ✅ corrected path
  };

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Bed", "Family Suite"];
  const priceRange = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
  const sortOptions = ["Newest First", "Price : Low to High", "Price : High to Low"];

  return (
    <div className="pt-28 px-4 md:px-16">
      <div className="mb-8">
        <h1 className="font-playfair text-4xl">Hotel Rooms</h1>
        <p className="text-gray-500 mt-2">
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-6">
        <div className="flex-1 space-y-6">
          {roomsDummyData.map((room, index) => (
            <React.Fragment key={room._id}>
              <div
                className="flex flex-col md:flex-row gap-4 p-4 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                onClick={() => handleRoomClick(room._id)}
              >
                <img
                  src={room.images[0]}
                  alt="hotel"
                  className="w-full md:w-[350px] h-[180px] rounded-md object-cover shadow-sm hover:shadow-md transition-all duration-200"
                />
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <p className="text-gray-500 text-sm">{room.hotel.city}</p>
                  <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors">
                    {room.hotel.name}
                  </h2>
                  <div className="flex items-center text-sm">
                    <StarRating rating={4} />
                    <span className="ml-2 text-gray-600">200+ reviews</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-500 text-sm">
                    <img
                      src={assets.locationIcon}
                      alt="location"
                      className="w-4 h-4 mr-1"
                    />
                    <span>{room.hotel.address}</span>
                  </div>
                  <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                    {room.amenities.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                      >
                        <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                        <p className="text-xs">{item}</p>
                      </div>
                    ))}
                    <p className="text-xl font-medium text-gray-600 ml-20">
                      ${room.pricePerNight} /night
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/my-bookings");
                    }}
                    className="mt-2 px-5 py-2 border border-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold w-max"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
              {index !== roomsDummyData.length - 1 && (
                <hr className="border-t border-gray-400 my-2" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Filter Sidebar */}
        <div className="w-full lg:w-[280px] flex-shrink-0">
          <div
            className={`bg-gray-100 p-4 rounded-lg shadow-sm sticky top-28 hover:shadow-md hover:bg-gray-200 transition-all duration-200 cursor-pointer ${
              openFilters ? "border-b" : ""
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">Filters</h3>
            <div className="text-xs cursor-pointer">
              <span onClick={() => setOpenFilters(!openFilters)} className="lg:hidden">
                {openFilters ? "HIDE" : "SHOW"}
              </span>
              <span className="hidden lg:inline">CLEAR</span>
            </div>

            <div
              className={`${
                openFilters ? "h-auto" : "h-0 lg:h-auto"
              } overflow-hidden transition-all duration-700`}
            >
              <div className="pt-5">
                <p className="font-medium text-gray-800 pb-2">
                  Popular Filters
                  {roomTypes.map((room, index) => (
                    <CheckBox key={index} label={room} />
                  ))}
                </p>
              </div>
              <div className="pt-5">
                <p className="font-medium text-gray-800 pb-2">
                  Price Range
                  {priceRange.map((range, index) => (
                    <CheckBox key={index} label={`$ ${range}`} />
                  ))}
                </p>
              </div>
              <div className="pt-5">
                <p className="font-medium text-gray-800 pb-2">
                  Sort By
                  {sortOptions.map((option, index) => (
                    <RadioButton key={index} label={option} />
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
