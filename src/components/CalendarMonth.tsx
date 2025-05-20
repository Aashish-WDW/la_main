'use client';

import { useState } from 'react';
import {
  Briefcase,
  Music,
  Timer,
  Lightbulb,
  Smile,
  Heart,
  Globe,
  MapPin,
  PawPrint,
  School,
  BookOpen,
  Languages,
} from 'lucide-react';
import CenterModal from './CenterModal';

const hostData = {
  'My work': 'Software Engineer & Property Host',
  'My favourite song in secondary school': 'Bohemian Rhapsody',
  'Decade I was born': '1980s',
  'My most useless skill': 'Juggling remotes',
  'My fun fact': 'Can name all the capitals in the world',
  "I'm obsessed with": 'Interior design',
  'Where I live': 'Bangalore, India',
  "Where I've always wanted to go": 'Iceland',
  Pets: 'Golden Retriever named Bruno',
  'Where I went to school': 'IIT Madras',
  'I spend too much time': 'Organizing my bookshelf',
  'My biography title would be': 'Life in Loops',
  'Languages I speak': 'English, Hindi, Telugu',
};

const iconMap = {
  'My work': <Briefcase className="w-5 h-5 text-gray-500" />,
  'My favourite song in secondary school': <Music className="w-5 h-5 text-gray-500" />,
  'Decade I was born': <Timer className="w-5 h-5 text-gray-500" />,
  'My most useless skill': <Lightbulb className="w-5 h-5 text-gray-500" />,
  'My fun fact': <Smile className="w-5 h-5 text-gray-500" />,
  "I'm obsessed with": <Heart className="w-5 h-5 text-gray-500" />,
  'Where I live': <Globe className="w-5 h-5 text-gray-500" />,
  "Where I've always wanted to go": <MapPin className="w-5 h-5 text-gray-500" />,
  Pets: <PawPrint className="w-5 h-5 text-gray-500" />,
  'Where I went to school': <School className="w-5 h-5 text-gray-500" />,
  'I spend too much time': <Timer className="w-5 h-5 text-gray-500" />,
  'My biography title would be': <BookOpen className="w-5 h-5 text-gray-500" />,
  'Languages I speak': <Languages className="w-5 h-5 text-gray-500" />,
};

export default function HostProfile() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <img
            src="/hero.jpg"
            alt="Host"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-medium">Mahesh Babu</h3>
            <p className="text-sm text-gray-500">Superhost · Joined in 2004</p>
            <p className="text-sm mt-2">
              Passionate about providing comfortable stays. Always here to help!
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="self-start md:self-auto px-4 py-2 rounded-md bg-gray-100 text-sm text-gray-800 hover:bg-gray-200 transition"
        >
          View Profile
        </button>
      </div>

      {showModal && (
        <CenterModal title="Host Profile" onClose={() => setShowModal(false)} wide>
          <div className="space-y-4">
            {Object.entries(hostData).map(([label, value]) => (
              <div key={label} className="flex items-start space-x-3">
                <div className="pt-1">
                  {iconMap[label as keyof typeof iconMap] ?? <Lightbulb className="w-5 h-5 text-gray-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <p className="text-sm text-gray-500">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </CenterModal>
      )}
    </>
  );
}

