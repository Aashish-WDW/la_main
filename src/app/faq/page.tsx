"use client"

import React from 'react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState<string | null>('general');

  const faqCategories: FAQCategory[] = [
    {
      title: 'General',
      items: [
        {
          question: 'What is lookaround?',
          answer: 'lookaround is a platform that connects travelers with unique accommodations and virtual tours. We offer both traditional bookings and immersive 360° virtual experiences of properties.'
        },
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Sign Up" button in the top right corner. You can sign up using your email address or through social media accounts like Google or Facebook.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your consent. For more details, please see our Privacy Policy.'
        }
      ]
    },
    {
      title: 'Bookings',
      items: [
        {
          question: 'How do I book a property?',
          answer: 'Browse available properties, select your dates, and click "Book Now". You\'ll need to provide payment information and agree to the host\'s terms. Once confirmed, you\'ll receive a booking confirmation email.'
        },
        {
          question: 'What is the cancellation policy?',
          answer: 'Cancellation policies vary by property. Most properties offer flexible (24-hour), moderate (5-day), or strict (7-day) cancellation windows. The specific policy is clearly displayed on each property listing.'
        },
        {
          question: 'How do I modify or cancel a booking?',
          answer: 'Go to your account dashboard, find the booking you want to modify, and click "Modify" or "Cancel". Follow the prompts to complete the process. Note that cancellation fees may apply based on the property\'s policy.'
        }
      ]
    },
    {
      title: 'Virtual Tours',
      items: [
        {
          question: 'What are virtual tours?',
          answer: 'Virtual tours are immersive 360° experiences that let you explore properties from anywhere. You can view every room, check amenities, and get a true feel for the space before booking.'
        },
        {
          question: 'How do I access virtual tours?',
          answer: 'Click the "Virtual Tour" button on any property listing. You can view tours on desktop or mobile devices. For the best experience, we recommend using a modern web browser.'
        },
        {
          question: 'Are virtual tours available for all properties?',
          answer: 'Not all properties have virtual tours yet. Properties with virtual tours are marked with a "Virtual Tour Available" badge on their listing.'
        }
      ]
    },
    {
      title: 'Payments',
      items: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and select digital payment methods. Payment options may vary by region.'
        },
        {
          question: 'When will I be charged?',
          answer: 'For most bookings, you\'ll be charged when the host accepts your booking request. Some properties may require a deposit upfront, with the balance due closer to your stay.'
        },
        {
          question: 'Are there any additional fees?',
          answer: 'Our service fee is included in the total price shown during booking. Additional fees may include cleaning fees, security deposits, or local taxes, which are clearly displayed before booking.'
        }
      ]
    },
    {
      title: 'Hosting',
      items: [
        {
          question: 'How do I become a host?',
          answer: 'Click "Become a Host" in the top navigation, create a listing for your property, and follow our step-by-step guide. You\'ll need to provide property details, photos, and set your availability and pricing.'
        },
        {
          question: 'What are the requirements for hosting?',
          answer: 'Hosts must be at least 18 years old, have a valid government ID, and provide accurate property information. Properties must meet our safety and quality standards.'
        },
        {
          question: 'How do I get paid as a host?',
          answer: 'Hosts receive payment 24 hours after guest check-in. You can choose to receive payments via bank transfer, PayPal, or other supported payment methods.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-30">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setOpenCategory(openCategory === category.title ? null : category.title)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <h2 className="text-xl font-semibold">{category.title}</h2>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    openCategory === category.title ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openCategory === category.title && (
                <div className="px-6 pb-4 space-y-4">
                  {category.items.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
} 