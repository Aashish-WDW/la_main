'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { User, Search, Menu, X, Home, Map, Camera, HelpCircle, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import localFont from 'next/font/local';
import SuggestedDestinations from './SuggestedDestinations';
import CalendarDropdown from './CalendarDropdown';

const nugget = localFont({
  src: [
    {
      path: "../../public/fonts/HighriseFont-Condensed-Demo.otf",
    },
  ],
  variable: "--font-nugget",
});

interface NavbarProps {
  isAuthenticated?: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
  onLookAroundClick: () => void;
}

const Navbar = memo(function Navbar({
  isAuthenticated = false,
  onLoginClick,
  onSignupClick,
  onProfileClick,
  onLogoClick,
  onLookAroundClick,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<null | 'location' | 'calendar' | 'guests'>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isVirtualTourPage = pathname?.startsWith('/tour');
  const alwaysScrolled =
    pathname === '/login' ||
    pathname === '/confirm-and-pay' ||
    pathname === '/property-details' ||
    pathname === '/profile' ||
    pathname === '/listings' ||
    isVirtualTourPage;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname])

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined' && !alwaysScrolled) {
      setScrolled(window.scrollY > 400);
    }
  }, [alwaysScrolled]);

  useEffect(() => {
    if (alwaysScrolled) {
      setScrolled(true);
    } else {
      handleScroll();
    }

    if (typeof window !== 'undefined' && !alwaysScrolled) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [alwaysScrolled, handleScroll]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActiveDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener('scroll', closeMenu);
    return () => window.removeEventListener('scroll', closeMenu);
  }, []);

  const handleDropdownClick = useCallback((type: 'location' | 'calendar' | 'guests') => {
    setActiveDropdown(prev => prev === type ? null : type);
  }, []);

  const handleGuestChange = useCallback((type: 'adults' | 'children', increment: boolean) => {
    if (type === 'adults') {
      setAdults(prev => increment ? prev + 1 : Math.max(prev - 1, 0));
    } else {
      setChildren(prev => increment ? prev + 1 : Math.max(prev - 1, 0));
    }
  }, []);

  const navClassName = `top-0 w-full z-50 transition-all duration-300
    ${pathname === '/property-details' ? 'relative' : 'fixed'}
    ${isVirtualTourPage
      ? 'pointer-events-none bg-transparent border-none'
      : (pathname === '/' || pathname === '/listings') && !scrolled
        ? 'bg-transparent border-transparent'
        : `bg-white/90 backdrop-blur-md ${(pathname === '/' || pathname === '/listings') ? '' : 'border-b border-gray-200'}`}`;

  const navStyle = {
    backdropFilter:
      isVirtualTourPage || (pathname === '/' && !scrolled && !isMenuOpen)
        ? 'none'
        : 'blur(10px)',
  };

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/listings', icon: Map },
    { name: 'Lookaround', href: '/lookaroundpage', icon: Camera },
    { name: 'Help', href: '/help-center', icon: HelpCircle },
  ];

  return (
    <nav className={navClassName} style={navStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-16 gap-4">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center min-w-[120px]">
            <motion.div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={onLogoClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-16 w-28 md:h-12 md:w-20">
                <Image
                  src="/logo.png"
                  alt="LookAround Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 112px, 80px"
                  priority
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop: Explore, Lookaround, Profile on the right */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 min-w-[120px] justify-end">
            <Link href="/listings">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-base font-medium
                  ${pathname === '/listings' 
                    ? 'bg-[#00aeef] text-white shadow-md hover:shadow-lg' 
                    : 'text-gray-700 hover:bg-[#00aeef]/10 hover:text-[#00aeef]'}`}
              >
                Explore
              </motion.button>
            </Link>
            <Link href="/lookaroundpage">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-base font-medium
                  ${pathname === '/lookaroundpage' 
                    ? 'bg-[#00aeef] text-white shadow-md hover:shadow-lg' 
                    : 'text-gray-700 hover:bg-[#00aeef]/10 hover:text-[#00aeef]'}`}
              >
                Lookaround
              </motion.button>
            </Link>
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onProfileClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00aeef] text-white hover:bg-[#0095c7] transition-all duration-200 shadow-md hover:shadow-lg text-base font-medium"
                title="Profile"
              >
                <User size={20} />
              </motion.button>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLoginClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00aeef] text-white hover:bg-[#0095c7] transition-all duration-200 shadow-md hover:shadow-lg text-base font-medium"
                  title="Log in"
                >
                  <User size={20} />
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-3 space-y-2">
                {/* Mobile Search */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 shadow-sm">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </motion.div>
                {/* Mobile Navigation Items */}
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                          ${pathname === item.href
                            ? 'bg-[#00aeef] text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                {/* Mobile User Actions */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-2 border-t border-gray-100"
                >
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        onProfileClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User size={20} />
                      <span className="font-medium">Profile</span>
                    </button>
                  ) : (
                    <Link href="/login">
                      <button
                        onClick={() => {
                          onLoginClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LogIn size={20} />
                        <span className="font-medium">Log in</span>
                      </button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
});

export default Navbar;
