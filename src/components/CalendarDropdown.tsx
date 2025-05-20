'use client';

import React, { useState, useEffect } from 'react';
import { addMonths, format, startOfMonth } from 'date-fns';

const getDaysArray = (month: Date) => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const days = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i);
  }

  return days;
};

const CalendarMonth = ({ date }: { date: Date }) => {
  const days = getDaysArray(date);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full px-2 mb-2">
        <h3 className="font-medium text-base text-gray-900">{format(date, 'MMMM yyyy')}</h3>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-[13px] text-gray-500 w-full mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-sm w-full">
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-9 w-9 text-center leading-9 rounded-full mx-auto transition ${
              day
                ? 'hover:bg-gray-200 text-gray-900 cursor-pointer'
                : 'text-transparent cursor-default'
            }`}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

const CalendarDropdown = () => {
  const [monthOffset, setMonthOffset] = useState(0);
  const [showDropdown, setShowDropdown] = useState(true);

  const baseMonth = addMonths(startOfMonth(new Date()), monthOffset);

  useEffect(() => {
    if (!showDropdown) return;

    const handleScroll = () => {
      setShowDropdown(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDropdown]);

  if (!showDropdown) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl w-[700px] z-[999] fixed  left-1/2 -translate-x-1/2">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setMonthOffset((prev) => prev - 1)}
          className="cursor-pointer text-xl px-3 py-1 rounded-full text-gray-500 hover:bg-gray-100"
        >
          ‹
        </button>
        <button
          onClick={() => setMonthOffset((prev) => prev + 1)}
          className="cursor-pointer text-xl px-3 py-1 rounded-full text-gray-500 hover:bg-gray-100"
        >
          ›
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 gap-6">
        <CalendarMonth date={baseMonth} />
        <CalendarMonth date={addMonths(baseMonth, 1)} />
      </div>

      {/* Flexible Dates */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm">
        {['Exact dates', '± 1 day', '± 2 days', '± 3 days', '± 7 days', '± 14 days'].map(
          (label, idx) => (
            <button
              key={idx}
              className={`cursor-pointer px-4 py-2 rounded-full border transition ${
                idx === 0
                  ? 'border-black font-semibold text-black'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CalendarDropdown;
