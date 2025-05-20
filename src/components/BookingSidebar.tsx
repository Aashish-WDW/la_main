"use client";

import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import CalendarRangeModal from './CalendarRangeModal';

export default function BookingSidebar({
  price = 150,
  rating = 4.92,
  reviews = 4,
  onBookNow,
  onLookAround,
}: {
  price?: number;
  rating?: number;
  reviews?: number;
  onBookNow?: () => void;
  onLookAround?: () => void;
}) {
  const [showDateModal, setShowDateModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [dates, setDates] = useState<{ checkIn: Date | null; checkOut: Date | null }>({
    checkIn: null,
    checkOut: null,
  });
  const [guests, setGuests] = useState({ adults: 1, children: 0 });

  const handleDateSelect = (checkIn: Date, checkOut: Date) => {
    setDates({ checkIn, checkOut });
    setShowDateModal(false);
  };

  const handleGuestChange = (type: 'adults' | 'children', delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta),
    }));
  };

  const formattedDates =
    dates.checkIn && dates.checkOut
      ? `${dates.checkIn.toLocaleDateString()} - ${dates.checkOut.toLocaleDateString()}`
      : 'Add dates';

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-gray-900">${price} <span className="text-base font-normal text-gray-500">night</span></span>
        <span className="flex items-center gap-1 text-gray-700 text-sm">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
          {rating} · {reviews} reviews
        </span>
      </div>

      {/* Dates */}
      <div
        className="border rounded-xl p-4 mb-3 cursor-pointer hover:border-[#00aeef] transition"
        onClick={() => setShowDateModal(true)}
      >
        <div className="text-xs font-bold text-gray-500 mb-1">DATES</div>
        <div className="text-gray-900">{formattedDates}</div>
      </div>

      {/* Guests */}
      <div
        className="border rounded-xl p-4 mb-3 cursor-pointer hover:border-[#00aeef] transition"
        onClick={() => setShowGuestModal(true)}
      >
        <div className="text-xs font-bold text-gray-500 mb-1">GUESTS</div>
        <div className="text-gray-900">
          Adults <span className="font-semibold">{guests.adults}</span>, Children <span className="font-semibold">{guests.children}</span>
        </div>
      </div>

      {/* Select Dates Button */}
      <button
        className={`w-full py-3 rounded-lg font-semibold mb-4 ${
          dates.checkIn && dates.checkOut
            ? 'bg-[#00aeef] text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!(dates.checkIn && dates.checkOut)}
        onClick={() => alert('Dates selected!')}
      >
        Select dates
      </button>

      <hr className="my-4" />

      {/* Look Around Button */}
      <button
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#00aeef] to-blue-600 text-white mb-3 hover:opacity-90 transition"
        onClick={onLookAround}
      >
        <Eye className="w-5 h-5" /> Look Around the Property
      </button>

      {/* Book Now Button */}
      <button
        className="w-full py-3 rounded-lg font-semibold bg-[#00aeef] text-white mb-3 hover:bg-blue-600 transition"
        onClick={onBookNow}
      >
        Book Now
      </button>

      {/* Date Picker Modal */}
      <CalendarRangeModal
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
        initialRange={[dates.checkIn, dates.checkOut]}
        onApply={([checkIn, checkOut]) => setDates({ checkIn, checkOut })}
      />

      {/* Guest Picker Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="mb-4 font-bold text-lg">Select Guests</div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold">Adults</div>
                <div className="text-xs text-gray-500">Ages 13+</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 rounded-full border text-lg flex items-center justify-center"
                  onClick={() => handleGuestChange('adults', -1)}
                  disabled={guests.adults <= 1}
                >-</button>
                <span>{guests.adults}</span>
                <button
                  className="w-8 h-8 rounded-full border text-lg flex items-center justify-center"
                  onClick={() => handleGuestChange('adults', 1)}
                >+</button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-semibold">Children</div>
                <div className="text-xs text-gray-500">Ages 2–12</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 rounded-full border text-lg flex items-center justify-center"
                  onClick={() => handleGuestChange('children', -1)}
                  disabled={guests.children <= 0}
                >-</button>
                <span>{guests.children}</span>
                <button
                  className="w-8 h-8 rounded-full border text-lg flex items-center justify-center"
                  onClick={() => handleGuestChange('children', 1)}
                >+</button>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-100 rounded-lg" onClick={() => setShowGuestModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#00aeef] text-white rounded-lg"
                onClick={() => setShowGuestModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 