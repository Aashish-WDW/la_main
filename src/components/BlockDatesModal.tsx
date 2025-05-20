'use client';
import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface BlockDatesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (dates: { startDate: Date; endDate: Date }) => void;
    existingBlocks?: { startDate: Date; endDate: Date }[];
}

export default function BlockDatesModal({ isOpen, onClose, onSave, existingBlocks = [] }: BlockDatesModalProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleSave = () => {
        if (startDate && endDate) {
            onSave({ startDate, endDate });
            setStartDate(null);
            setEndDate(null);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Block Dates</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <div className="relative">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                minDate={new Date()}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                                placeholderText="Select start date"
                            />
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <div className="relative">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                                placeholderText="Select end date"
                            />
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {existingBlocks.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Existing Blocks</h3>
                            <div className="space-y-2">
                                {existingBlocks.map((block, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-600">
                                            {block.startDate.toLocaleDateString()} - {block.endDate.toLocaleDateString()}
                                        </span>
                                        <button
                                            onClick={() => {
                                                // Handle removing block
                                            }}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!startDate || !endDate}
                        className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Block Dates
                    </button>
                </div>
            </div>
        </div>
    );
} 