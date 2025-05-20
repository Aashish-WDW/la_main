import { Star } from 'lucide-react';

export default function SuperhostCard() {
    return (
        <div className="max-w-sm w-full mx-auto rounded-2xl shadow-md border p-6 bg-white text-center">
            <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden">
                <img
                    src="/terrence.jpg"
                    alt="Host"
                    className="w-full h-full object-cover"
                />
                {/* Verification Badge */}
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
                    <div className="bg-pink-600 text-white p-1 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        ✓
                    </div>
                </div>
            </div>

            <h2 className="mt-4 text-lg font-semibold">Terrence Salvador</h2>
            <p className="text-sm text-gray-500">Superhost</p>

            <div className="mt-4 text-sm divide-y divide-gray-200">
                <div className="py-2 flex justify-between">
                    <span className="text-gray-600">838</span>
                    <span className="text-gray-500">Reviews</span>
                </div>
                <div className="py-2 flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-1">
                        4.65 <Star className="w-4 h-4 fill-black text-black" />
                    </span>
                    <span className="text-gray-500">Rating</span>
                </div>
                <div className="py-2 flex justify-between">
                    <span className="text-gray-600">3</span>
                    <span className="text-gray-500">Years hosting</span>
                </div>
            </div>
        </div>
    );
}
