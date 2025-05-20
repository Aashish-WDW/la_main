'use client';
import React, { useState } from 'react';
import { X, Bell, Mail, MessageCircle } from 'lucide-react';

interface NotificationPreferencesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (preferences: {
        email: {
            bookings: boolean;
            messages: boolean;
            promotions: boolean;
        };
        whatsapp: {
            bookings: boolean;
            messages: boolean;
            promotions: boolean;
        };
    }) => Promise<void>;
    initialPreferences?: {
        email: {
            bookings: boolean;
            messages: boolean;
            promotions: boolean;
        };
        whatsapp: {
            bookings: boolean;
            messages: boolean;
            promotions: boolean;
        };
    };
}

export default function NotificationPreferencesModal({
    isOpen,
    onClose,
    onSave,
    initialPreferences = {
        email: {
            bookings: true,
            messages: true,
            promotions: false,
        },
        whatsapp: {
            bookings: true,
            messages: true,
            promotions: false,
        },
    },
}: NotificationPreferencesModalProps) {
    const [preferences, setPreferences] = useState(initialPreferences);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await onSave(preferences);
            onClose();
        } catch (error) {
            console.error('Failed to save notification preferences:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = (channel: 'email' | 'whatsapp', type: 'bookings' | 'messages' | 'promotions') => {
        setPreferences(prev => ({
            ...prev,
            [channel]: {
                ...prev[channel],
                [type]: !prev[channel][type],
            },
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Notifications */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="w-5 h-5 text-gray-600" />
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={preferences.email.bookings}
                                    onChange={() => handleToggle('email', 'bookings')}
                                    className="w-4 h-4 text-[#00aeef] border-gray-300 rounded focus:ring-[#00aeef]"
                                />
                                <span className="text-gray-700">Booking updates and confirmations</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={preferences.email.messages}
                                    onChange={() => handleToggle('email', 'messages')}
                                    className="w-4 h-4 text-[#00aeef] border-gray-300 rounded focus:ring-[#00aeef]"
                                />
                                <span className="text-gray-700">Messages from hosts and guests</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={preferences.email.promotions}
                                    onChange={() => handleToggle('email', 'promotions')}
                                    className="w-4 h-4 text-[#00aeef] border-gray-300 rounded focus:ring-[#00aeef]"
                                />
                                <span className="text-gray-700">Promotions and special offers</span>
                            </label>
                        </div>
                    </div>

                    {/* WhatsApp Notifications */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <MessageCircle className="w-5 h-5 text-gray-600" />
                            <h3 className="font-medium text-gray-900">WhatsApp Notifications</h3>
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={preferences.whatsapp.bookings}
                                    onChange={() => handleToggle('whatsapp', 'bookings')}
                                    className="w-4 h-4 text-[#00aeef] border-gray-300 rounded focus:ring-[#00aeef]"
                                />
                                <span className="text-gray-700">Booking updates and confirmations</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={preferences.whatsapp.messages}
                                    onChange={() => handleToggle('whatsapp', 'messages')}
                                    className="w-4 h-4 text-[#00aeef] border-gray-300 rounded focus:ring-[#00aeef]"
                                />
                                <span className="text-gray-700">Messages from hosts and guests</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={preferences.whatsapp.promotions}
                                    onChange={() => handleToggle('whatsapp', 'promotions')}
                                    className="w-4 h-4 text-[#00aeef] border-gray-300 rounded focus:ring-[#00aeef]"
                                />
                                <span className="text-gray-700">Promotions and special offers</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Saving...' : 'Save Preferences'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 