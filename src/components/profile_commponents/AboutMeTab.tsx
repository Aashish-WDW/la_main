'use client';

import React from 'react';
import { useState } from 'react';
import {
  Briefcase, Music, Globe, School, Languages, Heart, Smile, BookOpen,
  PawPrint, MapPin, Timer, Lightbulb, Pencil, Save,
} from 'lucide-react';

const iconMap: Record<string, React.ReactElement> = {
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

interface AboutMeTabProps {
  data: Record<string, string>;
  isEditing: boolean;
  handleChange: (field: string, value: string) => void;
  handleToggleEdit: () => void;
}

export default function AboutMeTab({
  data,
  isEditing,
  handleChange,
  handleToggleEdit,
}: AboutMeTabProps) {
  return (
    <div className="max-w-3xl mx-auto pt-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">About me</h1>
        <button
          onClick={handleToggleEdit}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <Pencil className="w-4 h-4" />
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {key}
            </label>
            {isEditing ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
              />
            ) : (
              <p className="text-sm text-gray-600">{value}</p>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleToggleEdit}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleToggleEdit}
            className="px-4 py-2 text-sm font-medium text-white bg-[#00aeef] rounded-lg hover:bg-[#0095cc] transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
