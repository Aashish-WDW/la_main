import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const BookingCalendar: React.FC = () => {
  const property = {
    title: 'Cozy Mountain Cabin',
    price: 150,
    rating: 4.92,
    reviews: [{}, {}, {}, {}],
    hasLookAround: true,
  };

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [openDropdown, setOpenDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const checkIn = selectedRange?.from;
  const checkOut = selectedRange?.to;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

  const subtotal = property.price * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const totalPrice = subtotal + serviceFee;

  const formatRange = (range: DateRange | undefined) => {
    if (!range?.from) return 'Add dates';
    if (range.from && !range.to)
      return `${range.from.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — `;
    return `${range.from.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${range.to?.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  };

  const handleGuestChange = (type: 'adults' | 'children', action: 'increase' | 'decrease') => {
    setGuests((prev) => {
      const current = prev[type];
      const newValue =
        action === 'increase'
          ? current + 1
          : Math.max(type === 'adults' ? 1 : 0, current - 1);
      return { ...prev, [type]: newValue };
    });
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) return;
    console.log('Booking confirmed:', {
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });
  };

  return (
    <div
      ref={ref}
      className="max-w-md mx-auto border border-gray-300 rounded-xl p-6 shadow-sm bg-white  relative"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="font-bold text-xl">${property.price}</span>
          <span className="text-gray-500"> night</span>
        </div>
        <div className="flex items-center">
          <svg className="h-4 w-4 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="ml-1 text-sm">
            {property.rating.toFixed(2)} · {property.reviews.length} reviews
          </span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="relative mb-4">
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="cursor-pointer w-full border border-gray-300 rounded-lg p-3 text-left"
        >
          <div className="text-xs font-bold uppercase text-gray-600">Dates</div>
          <div className="text-sm mt-1">{formatRange(selectedRange)}</div>
        </button>

        {openDropdown && (
          <div className="absolute left-0 z-20 mt-2 w-full bg-white border shadow-lg rounded-xl p-4">
            <DayPicker
              mode="range"
              selected={selectedRange}
              onSelect={(range) => {
                setSelectedRange(range);
                if (range?.from && range.to) setOpenDropdown(false);
              }}
              fromDate={new Date()}
            />
          </div>
        )}
      </div>

      {/* Guests */}
      <div className="border border-gray-300 rounded-lg p-3 mb-4">
        <label className="block text-xs font-bold uppercase mb-3">Guests</label>
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="font-medium">Adults</div>
            <div className="text-sm text-gray-500">Ages 13+</div>
          </div>
          <div className="flex items-center">
            <button
              className="cursor-pointer p-2 border border-gray-300 rounded-full hover:border-gray-500"
              onClick={() => handleGuestChange('adults', 'decrease')}
            >
              −
            </button>
            <span className="mx-3 w-4 text-center">{guests.adults}</span>
            <button
              className="cursor-pointer p-2 border border-gray-300 rounded-full hover:border-gray-500"
              onClick={() => handleGuestChange('adults', 'increase')}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">Children</div>
            <div className="text-sm text-gray-500">Ages 2–12</div>
          </div>
          <div className="flex items-center">
            <button
              className="cursor-pointer p-2 border border-gray-300 rounded-full hover:border-gray-500"
              onClick={() => handleGuestChange('children', 'decrease')}
            >
              −
            </button>
            <span className="mx-3 w-4 text-center">{guests.children}</span>
            <button
              className="cursor-pointer p-2 border border-gray-300 rounded-full hover:border-gray-500"
              onClick={() => handleGuestChange('children', 'increase')}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Reserve Button */}
      <Link href="/confirm-and-pay">
        <button
          onClick={handleBooking}
          disabled={!checkIn || !checkOut}
          className={`cursor-pointer w-full py-3 rounded-lg font-bold text-white mb-4 ${
            checkIn && checkOut
              ? 'bg-gradient-to-r from-[#00aeef] to-blue-600 hover:bg-opacity-90'
              : 'bg-gray-300 cursor-not-allowed'
          } transition-colors duration-200`}
        >
          {checkIn && checkOut ? 'Reserve' : 'Select dates'}
        </button>
      </Link>

      {/* Look Around Button */}
      {property.hasLookAround && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="cursor-pointer w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-[#00aeef] to-blue-600 hover:opacity-90 transition-opacity duration-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Look Around the Property
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
