import React from 'react';

export default function About() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Former tech executive with 15+ years of experience in real estate and technology.',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      bio: 'Tech innovator specializing in virtual reality and 360° imaging technology.',
      image: '/team/michael.jpg'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Operations',
      bio: 'Hospitality industry veteran with a passion for creating exceptional guest experiences.',
      image: '/team/emma.jpg'
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      bio: 'Product leader focused on creating intuitive and engaging user experiences.',
      image: '/team/david.jpg'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Pushing boundaries in virtual tourism and property visualization.',
      icon: '💡'
    },
    {
      title: 'Trust',
      description: 'Building reliable connections between hosts and guests.',
      icon: '🤝'
    },
    {
      title: 'Sustainability',
      description: 'Promoting responsible tourism and eco-friendly practices.',
      icon: '🌱'
    },
    {
      title: 'Community',
      description: 'Creating meaningful connections in the travel community.',
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl">
            lookaround was born from a simple idea: to make property exploration more immersive and accessible. 
            We're revolutionizing how people discover and experience spaces through cutting-edge virtual technology.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6">
                We're on a mission to transform the way people explore and book properties. 
                By combining virtual reality technology with traditional property listings, 
                we're creating a more transparent and engaging experience for both hosts and guests.
              </p>
              <p className="text-gray-600 text-lg">
                Our platform empowers property owners to showcase their spaces in immersive detail 
                while helping travelers make more informed decisions about their accommodations.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">🏠</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Cities Worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking to list your property or find your next adventure, 
            we're here to help you every step of the way.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/list-your-property"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              List Your Property
            </a>
            <a
              href="/explore"
              className="inline-block bg-gray-100 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              Explore Properties
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 