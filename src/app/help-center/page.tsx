import React from 'react';
import Link from 'next/link';
import { Search, MessageCircle, Phone, Mail } from 'lucide-react';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Hero Section */}
      <div className="bg-[#00aeef] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-4 py-3 pl-12 rounded-full text-gray-900 bg-white shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Popular Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Booking & Reservations',
                description: 'Learn about our booking process and policies',
                link: '/faq#booking',
              },
              {
                title: 'Virtual Tours',
                description: 'How to use and navigate our 360° virtual tours',
                link: '/faq#virtual-tours',
              },
              {
                title: 'Account & Profile',
                description: 'Manage your account settings and preferences',
                link: '/faq#account',
              },
            ].map((topic) => (
              <Link
                key={topic.title}
                href={topic.link}
                className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: 'Live Chat',
                description: 'Chat with our support team',
                action: 'Start Chat',
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: 'Phone Support',
                description: 'Call us at +1 (555) 123-4567',
                action: 'Call Now',
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: 'Email Support',
                description: 'support@lookaround.com',
                action: 'Send Email',
              },
            ].map((option) => (
              <div
                key={option.title}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="text-[#00aeef] mb-4">{option.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <button className="text-[#00aeef] font-medium hover:underline">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Terms of Service',
                description: 'Read our terms and conditions',
                link: '/terms',
              },
              {
                title: 'Privacy Policy',
                description: 'Learn about how we protect your data',
                link: '/privacy',
              },
              {
                title: 'Refund Policy',
                description: 'Understand our refund and cancellation policies',
                link: '/refund-policy',
              },
              {
                title: 'Cookie Policy',
                description: 'Learn about our use of cookies',
                link: '/cookies',
              },
            ].map((resource) => (
              <Link
                key={resource.title}
                href={resource.link}
                className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 