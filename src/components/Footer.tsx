'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed:', email);
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Image src="/logo.png" alt="lookaround" width={90} height={100} className="rounded-lg" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover the world through immersive 360° virtual tours. Experience properties and destinations like never before.
          </p>
          <div className="flex mt-5 space-x-3">
            {[{ icon: Facebook, label: 'Facebook' }, { icon: Twitter, label: 'Twitter' }, { icon: Instagram, label: 'Instagram' }].map(({ icon: Icon, label }, i) => (
              <a
                key={i}
                href="#"
                aria-label={label}
                className="p-2 rounded-full bg-gray-800 hover:bg-white/10 transition duration-300 backdrop-blur-md"
              >
                <Icon className="w-5 h-5 text-gray-300 hover:text-white transition" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-base mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {['About', 'listings', 'Contact'].map((text, i) => (
              <li key={i}>
                <Link
                  href={`/${text.toLowerCase().replace(/\s/g, '')}`}
                  className="hover:text-white hover:underline underline-offset-4 transition"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-base mb-5">Support</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {['Help-Center', 'FAQ', 'Terms-of-Service', 'Privacy-Policy', 'Cookie-Policy'].map((text, i) => (
              <li key={i}>
                <Link
                  href={`/${text.toLowerCase().replace(/\s/g, '')}`}
                  className="hover:text-white hover:underline underline-offset-4 transition"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-base mb-5">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="w-full px-4 py-2.5 rounded-md bg-white/5 border border-gray-700 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 transition"
            >
              {submitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 mt-10 text-sm px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p className="text-gray-500">© 2024 lookaround. All rights reserved.</p>
          <div className="flex space-x-6">
            {['Terms', 'Privacy', 'Cookies'].map((text, i) => (
              <Link
                key={i}
                href={`/${text.toLowerCase()}`}
                className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
