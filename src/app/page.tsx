'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
// import PropertyCardGrid from '@/components/PropertyCardGrid';

import Image from 'next/image';
import localFont from 'next/font/local';
import { Eye, Star } from 'lucide-react';
import Link from 'next/link';

// Dummy Data
const properties = [
  {
    id: 1,
    name: 'Cozy Cottage',
    location: 'Shimla, India',
    price: '₹4,000',
    rating: 4.7,
    image: '/hero.jpg',
    launchDate: '2024-12-01',
  },
  {
    id: 2,
    name: 'Beachside Villa',
    location: 'Goa, India',
    price: '₹6,500',
    rating: 4.9,
    image: '/hero.jpg',
    launchDate: '2025-01-05',
  },
  {
    id: 3,
    name: 'Mountain Cabin',
    location: 'Manali, India',
    price: '₹5,200',
    rating: 4.8,
    image: '/hero.jpg',
    launchDate: '2024-11-10',
  },
  {
    id: 4,
    name: 'Luxury Penthouse',
    location: 'Mumbai, India',
    price: '₹12,000',
    rating: 5.0,
    image: '/hero.jpg',
    launchDate: '2025-02-15',
  },
  {
    id: 5,
    name: 'Modern Apartment',
    location: 'Bangalore, India',
    price: '₹3,800',
    rating: 4.5,
    image: '/hero.jpg',
    launchDate: '2025-01-20',
  },
  {
    id: 6,
    name: 'Heritage Haveli',
    location: 'Jaipur, India',
    price: '₹5,000',
    rating: 4.6,
    image: '/hero.jpg',
    launchDate: '2025-03-10',
  },
  {
    id: 7,
    name: 'Jungle Treehouse',
    location: 'Wayanad, India',
    price: '₹4,200',
    rating: 4.4,
    image: '/hero.jpg',
    launchDate: '2025-04-01',
  },
  {
    id: 8,
    name: 'Lakeview Studio',
    location: 'Udaipur, India',
    price: '₹3,500',
    rating: 4.3,
    image: '/hero.jpg',
    launchDate: '2025-02-28',
  },
  {
    id: 9,
    name: 'Himalayan Homestay',
    location: 'Leh, India',
    price: '₹4,800',
    rating: 4.9,
    image: '/hero.jpg',
    launchDate: '2025-03-15',
  },
];

const blogPosts = [
  {
    id: 1,
    title: 'Top 5 Winter Destinations in India',
    excerpt: 'Discover breathtaking locations to visit this winter season.',
    image: '/hero.jpg',
    author: 'Amit Sharma',
    date: 'May 10, 2025',
  },
  {
    id: 2,
    title: 'Why 360° Tours Help You Choose Better',
    excerpt: 'Explore how immersive experiences improve booking confidence.',
    image: '/hero.jpg',
    author: 'Sneha Verma',
    date: 'May 15, 2025',
  },
  {
    id: 3,
    title: 'Host Tips for Better Property Photos',
    excerpt: 'A quick guide to creating stunning photos that attract bookings.',
    image: '/hero.jpg',
    author: 'Rohit Mehra',
    date: 'May 18, 2025',
  },
];


const nugget = localFont(
  {
    src: [
      {
        path: "../../public/fonts/AirbnbCereal_W_Bd.otf"
      }
    ],
    variable: "--font-nugget",
  }
);

const featuredProperties = properties.slice(0, 3);

const trendingProperties = properties.slice(3, 6);

const newLaunches = properties.slice(6, 9);

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full relative flex items-center justify-center min-h-[80vh] text-white overflow-hidden"
      >
        {/* Background Image with subtle zoom effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src="/hero.jpg"
            alt="Hero Background"
            fill
            className="object-cover brightness-100"
            priority
          />
        </motion.div>

        {/* Dark overlay with subtle gradient shift */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/20 to-[#00aeef]/30 z-0"
          animate={{
            background: [
              "linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,174,239,0.3))",
              "linear-gradient(to bottom right, rgba(0,0,0,0.25), rgba(0,174,239,0.25))",
              "linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,174,239,0.3))",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* White fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#ffffff] z-10" />

        {/* Content */}
        <motion.div
          className="relative z-20 w-full max-w-4xl px-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center drop-shadow-xl ${nugget.className}`}
            variants={slideUp}
          >
            Discover your next stay through 360° tours.
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-center text-white/90 mt-4 mb-10 drop-shadow"
            variants={slideUp}
          >
            Explore immersive digital experiences of properties
          </motion.p>

          {/* Glass button */}
          <Link href="/listings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer mx-auto flex items-center justify-center gap-2 backdrop-blur-sm bg-[#00aeef]/20 text-white border border-[#00aeef]/30 px-5 py-3 rounded-full font-semibold text-base shadow-md hover:bg-[#00aeef]/30 transition duration-200"
            >
              <Eye size={18} className="text-white" />
              Look Around
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Trending Properties Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Properties</h2>
          <button className="text-[#00aeef] text-sm font-medium hidden md:block">View all</button>
        </div>
        <div className="relative">
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 no-scrollbar">
            {trendingProperties.map((property) => (
              <motion.div
                key={property.id}
                whileHover={{ y: -5 }}
                className="min-w-[280px] md:min-w-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden snap-center"
              >
                <div className="relative h-40 md:h-48">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base md:text-lg">{property.name}</h3>
                  <p className="text-gray-600 text-sm">{property.location}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#00aeef] font-semibold text-sm md:text-base">{property.price}/night</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span className="text-sm">{property.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* New Launches Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full bg-gray-50 py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Newly Launched</h2>
            <button className="text-[#00aeef] text-sm font-medium hidden md:block">View all</button>
          </div>
          <div className="relative">
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 no-scrollbar">
              {newLaunches.map((property) => (
                <motion.div
                  key={property.id}
                  whileHover={{ y: -5 }}
                  className="min-w-[280px] md:min-w-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden snap-center"
                >
                  <div className="relative h-40 md:h-48">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#00aeef] text-white px-2 py-1 rounded-full text-xs md:text-sm">
                      New
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base md:text-lg">{property.name}</h3>
                    <p className="text-gray-600 text-sm">{property.location}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[#00aeef] font-semibold text-sm md:text-base">{property.price}/night</span>
                      <span className="text-xs md:text-sm text-gray-500">
                        Launched {new Date(property.launchDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Latest from Our Blog</h2>
        <div className="relative">
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 no-scrollbar">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -5 }}
                className="min-w-[280px] md:min-w-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden snap-center"
              >
                <div className="relative h-40 md:h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base md:text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}