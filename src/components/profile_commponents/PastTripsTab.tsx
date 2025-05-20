import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

interface Booking {
  id: number;
  propertyName: string;
  location: string;
  date: string;
  rating: number;
  image: string;
}

export default function PastTripsTab({ bookings = [] }: { bookings?: Booking[] }) {
  if (!bookings.length) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">No Past Trips Yet</h1>
        <p className="text-gray-500 mb-6">When you book a property, your trips will show up here.</p>
        <img src="/empty-trips.svg" alt="No trips" className="mx-auto w-40 h-40 opacity-80" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">Past Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src={trip.image}
                alt={trip.propertyName}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">{trip.propertyName}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {trip.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {trip.date}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  {trip.rating} out of 5
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
