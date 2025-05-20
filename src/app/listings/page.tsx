'use client';

import { useState } from 'react';
import {
  MapPin,
  CalendarDays,
  DollarSign,
  Tag,
} from 'lucide-react';
import ExploreCardGrid from '@/components/ExploreCardGrid';
import PriceRangeModal from '@/components/PriceRangeModal';
import CategoryFilterModal from '@/components/CategoryFilterModal';
import LocationFilterModal from '@/components/LocationFilterModal';
import AvailabilityModal from '@/components/AvailabilityModal';
import { motion } from 'framer-motion';

const TABS = [
  { id: 'trending', label: 'Trending Properties' },
  { id: 'new', label: 'Newly Launched' },
  { id: 'villas', label: 'Villas' },
  { id: 'pgs', label: "PG's" },
  { id: 'hostels', label: 'Hostels' },
  { id: 'apartments', label: 'Apartments' },
  { id: 'rentals', label: 'Rental Properties' },
  { id: 'sale', label: 'Properties for Sale' },
];

const properties = [
  {
    id: '1',
    name: 'Cozy Cottage',
    location: 'Shimla, India',
    price: 4000,
    rating: 4.7,
    image: '/hero.jpg',
    launchDate: '2024-12-01',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
  {
    id: '2',
    name: 'Beachside Villa',
    location: 'Goa, India',
    price: 6500,
    rating: 4.9,
    image: '/hero.jpg',
    launchDate: '2025-01-05',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
  {
    id: '3',
    name: 'Mountain Cabin',
    location: 'Manali, India',
    price: 5200,
    rating: 4.8,
    image: '/hero.jpg',
    launchDate: '2024-11-10',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
  {
    id: '4',
    name: 'Luxury Penthouse',
    location: 'Mumbai, India',
    price: 12000,
    rating: 5.0,
    image: '/hero.jpg',
    launchDate: '2025-02-15',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
  {
    id: '5',
    name: 'Modern Apartment',
    location: 'Bangalore, India',
    price: 3800,
    rating: 4.5,
    image: '/hero.jpg',
    launchDate: '2025-01-20',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
  {
    id: '6',
    name: 'Heritage Haveli',
    location: 'Jaipur, India',
    price: 5000,
    rating: 4.6,
    image: '/hero.jpg',
    launchDate: '2025-03-10',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
  {
    id: '7',
    name: 'Jungle Treehouse',
    location: 'Wayanad, India',
    price: 4200,
    rating: 4.4,
    image: '/hero.jpg',
    launchDate: '2025-04-01',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
  {
    id: '8',
    name: 'Lakeview Studio',
    location: 'Udaipur, India',
    price: 3500,
    rating: 4.3,
    image: '/hero.jpg',
    launchDate: '2025-02-28',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
  {
    id: '9',
    name: 'Himalayan Homestay',
    location: 'Leh, India',
    price: 4800,
    rating: 4.9,
    image: '/hero.jpg',
    launchDate: '2025-03-15',
    title: 'string',
    imageUrl: 'string',
    hasLookAround: false,
  },
];

export default function Listings() {
  const [selectedTab, setSelectedTab] = useState('trending');
  const [selectedTabs, setSelectedTabs] = useState<string[]>(['trending']);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [availabilityRange, setAvailabilityRange] = useState<[number, number]>([0, 0]);

  return (
    <div className="min-h-screen pt-30 bg-gradient-to-br from-[#f7faff] via-[#e6f7fb] to-white relative">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full sm:pt-32 flex flex-col items-center justify-center py-10 sm:py-16 md:py-24 bg-gradient-to-r from-[#00aeef]/80 to-[#00aeef]/40 text-white mb-8 shadow-lg rounded-b-3xl"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 drop-shadow-xl text-center">Find Your Perfect Stay</h1>
        <p className="text-base sm:text-lg md:text-2xl font-medium text-white/90 text-center max-w-2xl">Browse trending, new, and unique properties with immersive 360° tours and modern filters.</p>
      </motion.section>

      {/* Fixed Filter Bar - always visible at the top */}
      <div className="fixed top-16 left-0 w-full z-50 flex justify-center bg-white/80 backdrop-blur-md shadow-lg border-b border-[#00aeef]/10">
        <div className="max-w-5xl w-full px-2 sm:px-4">
          <div className="flex flex-nowrap sm:flex-wrap justify-center items-center gap-2 py-2 sm:py-3 overflow-x-auto no-scrollbar">
            {/* Location Filter */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm text-gray-700 bg-white/80 hover:border-[#00aeef] hover:bg-[#e6f7fb] transition whitespace-nowrap"
            >
              <MapPin size={16} className="text-[#00aeef] flex-shrink-0" />
              <span className="truncate max-w-[150px] sm:max-w-none">
                {selectedLocations.length > 0
                  ? `${selectedLocations.slice(0, 2).join(', ')}${selectedLocations.length > 2 ? '…' : ''}`
                  : 'Location'}
              </span>
            </button>
            {/* Category Filter */}
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm text-gray-700 bg-white/80 hover:border-[#00aeef] hover:bg-[#e6f7fb] transition whitespace-nowrap"
            >
              <Tag size={16} className="text-[#00aeef] flex-shrink-0" />
              <span className="truncate max-w-[150px] sm:max-w-none">
                {selectedTabs.length > 0
                  ? `${selectedTabs
                    .map((id) => TABS.find((t) => t.id === id)?.label || id)
                    .slice(0, 2)
                    .join(', ')}${selectedTabs.length > 2 ? '…' : ''}`
                  : 'Category'}
              </span>
            </button>
            {/* Price Filter */}
            <button
              onClick={() => setShowPriceModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm text-gray-700 bg-white/80 hover:border-[#00aeef] hover:bg-[#e6f7fb] transition whitespace-nowrap"
            >
              <DollarSign size={16} className="text-[#00aeef] flex-shrink-0" />
              <span className="truncate max-w-[150px] sm:max-w-none">
                {priceRange[0] === 0 && priceRange[1] === 500
                  ? 'Price'
                  : `$${priceRange[0]} - $${priceRange[1]}`}
              </span>
            </button>
            {/* Availability Filter */}
            <button
              onClick={() => setShowAvailabilityModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm text-gray-700 bg-white/80 hover:border-[#00aeef] hover:bg-[#e6f7fb] transition whitespace-nowrap"
            >
              <CalendarDays size={16} className="text-[#00aeef] flex-shrink-0" />
              <span className="truncate max-w-[150px] sm:max-w-none">
                {availabilityRange[0] === 0 && availabilityRange[1] === 0
                  ? 'Availability'
                  : `${availabilityRange[0]} - ${availabilityRange[1]} days`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Add padding to main content so it is not hidden behind the fixed bar */}
      <div>
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-5xl mx-auto px-2 sm:px-4 mt-10 sm:mt-40 mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center drop-shadow"
        >
          Explore Properties
        </motion.h2>

        {/* Listings Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-2 sm:px-6 lg:px-8 pb-16"
        >
          <ExploreCardGrid properties={properties} />
        </motion.div>
      </div>

      {/* Modals */}
      {showCategoryModal && (
        <CategoryFilterModal
          selectedTabs={selectedTabs}
          onToggleTab={(tabId) =>
            setSelectedTabs((prev) =>
              prev.includes(tabId) ? prev.filter((id) => id !== tabId) : [...prev, tabId]
            )
          }
          onApply={setSelectedTabs}
          onClose={() => setShowCategoryModal(false)}
        />
      )}

      {showLocationModal && (
        <LocationFilterModal
          selectedLocations={selectedLocations}
          onToggleLocation={(loc) =>
            setSelectedLocations((prev) =>
              prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
            )
          }
          onClose={() => setShowLocationModal(false)}
        />
      )}

      {showPriceModal && (
        <PriceRangeModal
          initialRange={priceRange}
          onApply={setPriceRange}
          onClose={() => setShowPriceModal(false)}
        />
      )}

      {showAvailabilityModal && (
        <AvailabilityModal
          initialRange={availabilityRange}
          onApply={(range) => {
            setAvailabilityRange(range);
            setShowAvailabilityModal(false);
          }}
          onClose={() => setShowAvailabilityModal(false)}
        />
      )}
    </div>
  );
}
