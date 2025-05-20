// components/SuggestedDestinations.tsx

import React from 'react';

const destinations = [
    {
        name: 'North Goa, Goa',
        reason: 'Because your wishlist has stays in North Goa',
        icon: '🏖️',
    },
    {
        name: 'South Goa, Goa',
        reason: 'Popular beach destination',
        icon: '🌊',
    },
    {
        name: 'Anjuna, Goa',
        reason: 'For its bustling nightlife',
        icon: '🎉',
    },
    {
        name: 'Panaji, Goa',
        reason: 'A hidden gem',
        icon: '🧭',
    },
];

const SuggestedDestinations: React.FC = () => {
    return (
        <div className="mb-4">
            {destinations.map((dest) => (
                <div key={dest.name} className="flex items-start gap-3 py-2">
                    <div className="text-2xl">{dest.icon}</div>
                    <div>
                        <div className="font-semibold text-gray-800">{dest.name}</div>
                        <div className="text-sm text-gray-500">{dest.reason}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SuggestedDestinations;
