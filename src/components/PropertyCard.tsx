'use client';
import React, { useState } from 'react';
import { Edit, Trash2, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import BlockDatesModal from './BlockDatesModal';

interface PropertyCardProps {
    property: {
        id: string;
        name: string;
        type: string;
        location: string;
        price: number;
        images: string[];
        status: 'active' | 'inactive';
        blockedDates?: { startDate: Date; endDate: Date }[];
    };
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: 'active' | 'inactive') => void;
    onBlockDates: (id: string, dates: { startDate: Date; endDate: Date }) => void;
    onRemoveBlock: (id: string, blockIndex: number) => void;
}

export default function PropertyCard({ property, onDelete, onStatusChange, onBlockDates, onRemoveBlock }: PropertyCardProps) {
    const [isBlockDatesModalOpen, setIsBlockDatesModalOpen] = useState(false);

    const handleBlockDates = (dates: { startDate: Date; endDate: Date }) => {
        onBlockDates(property.id, dates);
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="aspect-[4/3] relative">
                    <Image
                        src={property.images[0] || '/placeholder-property.jpg'}
                        alt={property.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsBlockDatesModalOpen(true);
                            }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                            title="Block Dates"
                        >
                            <Calendar className="w-5 h-5 text-gray-600" />
                        </button>
                        <Link
                            href={`/edit-property/${property.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                            title="Edit Property"
                        >
                            <Edit className="w-5 h-5 text-gray-600" />
                        </Link>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(property.id);
                            }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                            title="Delete Property"
                        >
                            <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{property.name}</h3>
                            <p className="text-sm text-gray-600 truncate">{property.type}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                            <span className="text-base sm:text-lg font-bold text-gray-900">${property.price}</span>
                            <span className="text-sm text-gray-600">/night</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 truncate">{property.location}</p>

                    {property.blockedDates && property.blockedDates.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Blocked Dates:</h4>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                                {property.blockedDates.map((block, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-600 truncate">
                                            {block.startDate.toLocaleDateString()} - {block.endDate.toLocaleDateString()}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemoveBlock(property.id, index);
                                            }}
                                            className="text-red-500 hover:text-red-600 ml-2 flex-shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                                property.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            <span className="text-sm text-gray-600 capitalize">{property.status}</span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onStatusChange(property.id, property.status === 'active' ? 'inactive' : 'active');
                            }}
                            className="text-sm text-[#00aeef] hover:text-blue-600 transition-colors"
                        >
                            {property.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                </div>
            </div>

            <BlockDatesModal
                isOpen={isBlockDatesModalOpen}
                onClose={() => setIsBlockDatesModalOpen(false)}
                onSave={handleBlockDates}
                existingBlocks={property.blockedDates}
            />
        </>
    );
} 