'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);

    // Show success notification
    setNotification({
      show: true,
      message: 'Thank you for your message! We will get back to you soon.',
      type: 'success'
    });

    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Hide notification after 5 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClasses = "w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 bg-white/50 backdrop-blur-sm focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF] focus:ring-opacity-20 transition-all duration-200 hover:border-[#00AEEF]/50";

  const contactMethods = [
    {
      title: 'Customer Support',
      description: 'Get help with your bookings and account',
      email: 'support@lookaround.com',
      phone: '+1 (555) 123-4567',
      hours: '24/7'
    },
    {
      title: 'Business Inquiries',
      description: 'Partnerships and business opportunities',
      email: 'business@lookaround.com',
      phone: '+1 (555) 123-4568',
      hours: 'Mon-Fri, 9am-6pm EST'
    },
    {
      title: 'Press & Media',
      description: 'Media inquiries and press releases',
      email: 'press@lookaround.com',
      phone: '+1 (555) 123-4569',
      hours: 'Mon-Fri, 9am-6pm EST'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            Have questions? We're here to help. Choose the best way to reach us below.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method) => (
              <div key={method.title} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {method.email}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {method.phone}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {method.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="partnership">Partnership Opportunity</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Office Location */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Office</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-20">
              <iframe
                title="Lookaround HQ Location"
                src="https://www.google.com/maps?q=No.122,+Saalu+Hunase+Village,+Opp.+Anjaneya+Temple,+Udayapura+Post,+Kanakapura+Main+Rd,+Bengaluru,+Karnataka+560082&output=embed"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Lookaround Headquarters</h3>
              <p className="text-gray-600">
                No.122, Saalu Hunase Village<br />
                Opp. Anjaneya Temple, Udayapura Post<br />
                Kanakapura Main Rd, Bengaluru, Karnataka 560082
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* FAQ Link */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-6">
            Find quick answers to common questions in our FAQ section.
          </p>
          <a
            href="/faq"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
          >
            Visit FAQ
          </a>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 sm:top-28 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg p-4 border border-green-100"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm sm:text-base font-medium text-gray-900">{notification.message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 
