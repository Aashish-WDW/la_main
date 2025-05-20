// components/Amenities.tsx
import { Wifi, ParkingCircle, Thermometer, Key, Tv, Coffee } from 'lucide-react';

const amenities = [
    { icon: <Wifi />, label: 'Wi-Fi' },
    { icon: <Coffee />, label: 'Kitchen' },
    { icon: <ParkingCircle />, label: 'Free Parking' },
    { icon: <Thermometer />, label: 'Air Conditioning' },
    { icon: <Key />, label: 'Self Check-in' },
    { icon: <Tv />, label: 'TV' },
];

export default function Amenities() {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-medium mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4">
                {amenities.map(({ icon, label }) => (
                    <div key={label} className="flex items-center space-x-2">
                        {icon}
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
