'use client';
import React, { useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, Edit2, Settings, Bell, Lock, CreditCard, HelpCircle, LogOut, User, Heart, Clock, Star, Calendar, Building2, AlertCircle, Home, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import NotificationPreferencesModal from '@/components/NotificationPreferencesModal';
import PaymentMethodsModal from '@/components/PaymentMethodsModal';
import { toast } from 'react-hot-toast';

interface Property {
    id: string;
    name: string;
    type: string;
    location: string;
    price: number;
    images: string[];
    status: 'active' | 'inactive';
    blockedDates?: { startDate: Date; endDate: Date }[];
}

export default function ProfilePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'profile';
    const [isEditing, setIsEditing] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isNotificationPreferencesModalOpen, setIsNotificationPreferencesModalOpen] = useState(false);
    const [isPaymentMethodsModalOpen, setIsPaymentMethodsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
    });

    // Dummy user data
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        avatar: '/placeholder-avatar.jpg',
        joinDate: 'January 2024',
        savedProperties: 12,
        reviews: 8,
        rating: 4.8,
        isHost: true, // Add this field to determine if user is a host
        bookings: [
            {
                id: 1,
                propertyName: 'Luxury Apartment',
                location: 'New York, USA',
                checkIn: '2024-03-15',
                checkOut: '2024-03-20',
                status: 'upcoming',
                image: '/placeholder-property.jpg'
            },
            {
                id: 2,
                propertyName: 'Beach House',
                location: 'Miami, USA',
                checkIn: '2024-02-01',
                checkOut: '2024-02-05',
                status: 'completed',
                image: '/placeholder-property.jpg'
            }
        ]
    };

    // Dummy host data - only used if user.isHost is true
    const host = {
        name: 'Lookaround Properties',
        email: 'contact@lookaround.com',
        phone: '+1 (555) 987-6543',
        location: 'New York, USA',
        avatar: '/placeholder-avatar.jpg',
        verified: true,
        properties: 25,
        rating: 4.9,
        totalReviews: 150,
        propertiesList: [
            {
                id: 1,
                name: 'Luxury Apartment',
                location: 'New York, USA',
                type: 'Apartment',
                status: 'active',
                price: '$200/night',
                rating: 4.8,
                totalBookings: 45,
                image: '/placeholder-property.jpg',
                lastUpdated: '2024-02-15'
            },
            {
                id: 2,
                name: 'Beach House',
                location: 'Miami, USA',
                type: 'House',
                status: 'active',
                price: '$350/night',
                rating: 4.9,
                totalBookings: 32,
                image: '/placeholder-property.jpg',
                lastUpdated: '2024-02-10'
            }
        ]
    };

    useEffect(() => {
        // Load user data from localStorage
        const loadUserData = () => {
            const savedUserData = localStorage.getItem('user');
            if (savedUserData) {
                setUserData(JSON.parse(savedUserData));
            }
            setIsLoading(false);
        };
        loadUserData();
    }, []);

    useEffect(() => {
        // Simulate fetching properties
        const fetchProperties = async () => {
            if (!user.isHost) return;
            
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Dummy data
                const dummyProperties: Property[] = [
                    {
                        id: '1',
                        name: 'Luxury Apartment',
                        type: 'Apartment',
                        location: 'New York, USA',
                        price: 200,
                        images: ['/placeholder-property.jpg'],
                        status: 'active',
                        blockedDates: [
                            {
                                startDate: new Date('2024-03-15'),
                                endDate: new Date('2024-03-20')
                            }
                        ]
                    },
                    {
                        id: '2',
                        name: 'Beach House',
                        type: 'House',
                        location: 'Miami, USA',
                        price: 350,
                        images: ['/placeholder-property.jpg'],
                        status: 'active'
                    }
                ];

                setProperties(dummyProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (activeTab === 'properties' && user.isHost) {
            fetchProperties();
        }
    }, [activeTab, user.isHost]);

    const handleAddProperty = () => {
        router.push('/add-property');
    };

    const handleEditProperty = (propertyId: number) => {
        router.push(`/edit-property/${propertyId}`);
    };

    const handleViewProperty = (propertyId: number) => {
        router.push(`/property/${propertyId}`);
    };

    const handleDeleteProperty = async (id: string) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setProperties(properties.filter(property => property.id !== id));
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const handleStatusChange = async (id: string, status: 'active' | 'inactive') => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setProperties(properties.map(property =>
                property.id === id ? { ...property, status } : property
            ));
        } catch (error) {
            console.error('Error updating property status:', error);
        }
    };

    const handleBlockDates = async (id: string, dates: { startDate: Date; endDate: Date }) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setProperties(properties.map(property =>
                property.id === id
                    ? {
                        ...property,
                        blockedDates: [...(property.blockedDates || []), dates]
                    }
                    : property
            ));
        } catch (error) {
            console.error('Error blocking dates:', error);
        }
    };

    const handleRemoveBlock = async (id: string, blockIndex: number) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setProperties(properties.map(property =>
                property.id === id
                    ? {
                        ...property,
                        blockedDates: property.blockedDates?.filter((_, index) => index !== blockIndex)
                    }
                    : property
            ));
        } catch (error) {
            console.error('Error removing blocked dates:', error);
        }
    };

    const handleChangePassword = async (currentPassword: string, newPassword: string) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Password changed successfully');
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    };

    const handleSaveNotificationPreferences = async (preferences: {
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
    }) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Notification preferences saved:', preferences);
        } catch (error) {
            console.error('Error saving notification preferences:', error);
            throw error;
        }
    };

    const handleAddCard = async (cardDetails: {
        number: string;
        expiryMonth: number;
        expiryYear: number;
        cvc: string;
    }) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Card added successfully:', cardDetails);
        } catch (error) {
            console.error('Error adding card:', error);
            throw error;
        }
    };

    const handleRemoveCard = async (cardId: string) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Card removed successfully:', cardId);
        } catch (error) {
            console.error('Error removing card:', error);
            throw error;
        }
    };

    const handleSetDefaultCard = async (cardId: string) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Default card set successfully:', cardId);
        } catch (error) {
            console.error('Error setting default card:', error);
            throw error;
        }
    };

    const handleSaveChanges = () => {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setIsEditing(false);
        toast.success('Profile updated successfully');
    };

    const handleGoBack = () => {
        // Check if all required fields are filled
        const requiredFields = ['name', 'email', 'phone'];
        const missingFields = requiredFields.filter(field => !userData[field as keyof typeof userData]);

        if (missingFields.length > 0) {
            toast.error('Please fill in all required personal information fields');
            return;
        }

        // Get the return URL from localStorage
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
            router.push(returnUrl);
        } else {
            router.push('/confirm-and-pay');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                        <button
                            onClick={handleGoBack}
                            className="px-6 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Go back to where you left
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                            {/* Profile Summary */}
                            <div className="text-center">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-[#00aeef] text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                                        <Camera className="w-5 h-5" />
                                    </button>
                                </div>
                                <h2 className="mt-4 text-xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-gray-600">Member since {user.joinDate}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#00aeef]">{user.savedProperties}</p>
                                    <p className="text-sm text-gray-600">Saved</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#00aeef]">{user.reviews}</p>
                                    <p className="text-sm text-gray-600">Reviews</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2 pt-4 border-t">
                                <button
                                    onClick={() => router.push('/profile?tab=profile')}
                                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                        activeTab === 'profile'
                                            ? 'bg-[#00aeef]/10 text-[#00aeef]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <User className="w-5 h-5" />
                                    Profile
                                </button>
                                <button
                                    onClick={() => router.push('/profile?tab=bookings')}
                                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                        activeTab === 'bookings'
                                            ? 'bg-[#00aeef]/10 text-[#00aeef]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Calendar className="w-5 h-5" />
                                    Bookings
                                </button>
                                {user.isHost && (
                                    <button
                                        onClick={() => router.push('/profile?tab=properties')}
                                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                            activeTab === 'properties'
                                                ? 'bg-[#00aeef]/10 text-[#00aeef]'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Home className="w-5 h-5" />
                                        My Properties
                                    </button>
                                )}
                                <button
                                    onClick={() => router.push('/profile?tab=saved')}
                                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                        activeTab === 'saved'
                                            ? 'bg-[#00aeef]/10 text-[#00aeef]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Heart className="w-5 h-5" />
                                    Saved Properties
                                </button>
                                <button
                                    onClick={() => router.push('/profile?tab=reviews')}
                                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                        activeTab === 'reviews'
                                            ? 'bg-[#00aeef]/10 text-[#00aeef]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Star className="w-5 h-5" />
                                    Reviews
                                </button>
                                <button
                                    onClick={() => router.push('/profile?tab=settings')}
                                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                        activeTab === 'settings'
                                            ? 'bg-[#00aeef]/10 text-[#00aeef]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Settings className="w-5 h-5" />
                                    Settings
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <>
                                {/* User Profile Section */}
                                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="flex items-center gap-2 text-[#00aeef] hover:text-blue-600 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={userData.name}
                                                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all disabled:bg-gray-50"
                                                    />
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        value={userData.email}
                                                        onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all disabled:bg-gray-50"
                                                    />
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        value={userData.phone}
                                                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all disabled:bg-gray-50"
                                                    />
                                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={userData.location}
                                                        onChange={(e) => setUserData(prev => ({ ...prev, location: e.target.value }))}
                                                        disabled={!isEditing}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all disabled:bg-gray-50"
                                                    />
                                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <div className="flex justify-end gap-4 pt-6 border-t">
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSaveChanges}
                                                    className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600 transition-colors"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Host Profile Section - Only show if user is a host */}
                                {user.isHost && (
                                    <div className="bg-white rounded-2xl shadow-sm p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex items-center gap-3">
                                                <h2 className="text-xl font-bold text-gray-900">Host Profile</h2>
                                                {host.verified && (
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <AlertCircle className="w-4 h-4" />
                                                <span className="text-sm">Contact support to update</span>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            defaultValue={host.name}
                                                            disabled
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                        />
                                                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            defaultValue={host.email}
                                                            disabled
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                        />
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                                    <div className="relative">
                                                        <input
                                                            type="tel"
                                                            defaultValue={host.phone}
                                                            disabled
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                        />
                                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            defaultValue={host.location}
                                                            disabled
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                        />
                                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 bg-gray-50 rounded-lg">
                                                        <p className="text-2xl font-bold text-[#00aeef]">{host.properties}</p>
                                                        <p className="text-sm text-gray-600">Total Properties</p>
                                                    </div>
                                                    <div className="p-4 bg-gray-50 rounded-lg">
                                                        <p className="text-2xl font-bold text-[#00aeef]">{host.rating}</p>
                                                        <p className="text-sm text-gray-600">Average Rating</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'properties' && user.isHost && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
                                    <button
                                        onClick={handleAddProperty}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Property
                                    </button>
                                </div>

                                {isLoading ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00aeef] mx-auto"></div>
                                        <p className="mt-4 text-gray-600">Loading properties...</p>
                                    </div>
                                ) : properties.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-600">No properties found.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {properties.map(property => (
                                            <PropertyCard
                                                key={property.id}
                                                property={property}
                                                onDelete={handleDeleteProperty}
                                                onStatusChange={handleStatusChange}
                                                onBlockDates={handleBlockDates}
                                                onRemoveBlock={handleRemoveBlock}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">My Bookings</h2>
                                <div className="space-y-6">
                                    {user.bookings.map((booking) => (
                                        <div key={booking.id} className="border rounded-xl overflow-hidden">
                                            <div className="grid grid-cols-1 md:grid-cols-3">
                                                <div className="md:col-span-1">
                                                    <div className="aspect-video bg-gray-200 relative">
                                                        <Image
                                                            src={booking.image}
                                                            alt={booking.propertyName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">{booking.propertyName}</h3>
                                                            <p className="text-gray-600 text-sm">{booking.location}</p>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                            booking.status === 'upcoming' 
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-green-100 text-green-800'
                                                        }`}>
                                                            {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                                        </span>
                                                    </div>
                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-sm text-gray-600">Check-in</p>
                                                            <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600">Check-out</p>
                                                            <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex gap-3">
                                                        {booking.status === 'upcoming' && (
                                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                                                Cancel Booking
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'saved' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Properties</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Dummy saved properties */}
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="aspect-video bg-gray-200 relative">
                                                <Image
                                                    src="/placeholder-property.jpg"
                                                    alt="Property"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-900">Luxury Apartment</h3>
                                                <p className="text-gray-600 text-sm">New York, USA</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">My Reviews</h2>
                                <div className="space-y-6">
                                    {/* Dummy reviews */}
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="border rounded-xl p-4">
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 relative overflow-hidden">
                                                    <Image
                                                        src="/placeholder-property.jpg"
                                                        alt="Property"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">Luxury Apartment</h3>
                                                    <p className="text-gray-600 text-sm">New York, USA</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 mb-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-700">
                                                Great experience! The property was exactly as described and the host was very helpful.
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">Posted on January 15, 2024</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                                <div className="space-y-6">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-2">Help & Support</h3>
                                        <div className="space-y-3">
                                            <button className="w-full flex items-center gap-3 text-gray-700 hover:text-[#00aeef] transition-colors">
                                                <HelpCircle className="w-5 h-5" />
                                                FAQ & Help Center
                                            </button>
                                            <button className="w-full flex items-center gap-3 text-gray-700 hover:text-[#00aeef] transition-colors">
                                                <Mail className="w-5 h-5" />
                                                Contact Support
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-2">Account Actions</h3>
                                        <div className="space-y-3">
                                            <button className="w-full flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors">
                                                <LogOut className="w-5 h-5" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={isChangePasswordModalOpen}
                onClose={() => setIsChangePasswordModalOpen(false)}
                onSave={handleChangePassword}
            />

            <NotificationPreferencesModal
                isOpen={isNotificationPreferencesModalOpen}
                onClose={() => setIsNotificationPreferencesModalOpen(false)}
                onSave={handleSaveNotificationPreferences}
            />

            <PaymentMethodsModal
                isOpen={isPaymentMethodsModalOpen}
                onClose={() => setIsPaymentMethodsModalOpen(false)}
                onAddCard={handleAddCard}
                onRemoveCard={handleRemoveCard}
                onSetDefault={handleSetDefaultCard}
                paymentMethods={[
                    {
                        id: '1',
                        type: 'credit',
                        last4: '4242',
                        expiryMonth: 12,
                        expiryYear: 24,
                        isDefault: true,
                    },
                    {
                        id: '2',
                        type: 'debit',
                        last4: '5678',
                        expiryMonth: 6,
                        expiryYear: 25,
                        isDefault: false,
                    },
                ]}
            />
        </div>
    );
}
