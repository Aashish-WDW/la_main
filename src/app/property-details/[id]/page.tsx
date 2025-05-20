'use client';
import React from 'react';
import { Eye, Heart, Share, Star, MapPin, CheckCircle } from 'lucide-react';
import PropertyGallery from '@/components/PropertyGallery';
import localfont from 'next/font/local';
import BookingSidebar from '@/components/BookingSidebar';
import Amenities from '@/components/Amenities';
import LocationMap from '@/components/LocationMap';
import HostProfile from '@/components/HostProfile';
import HotFeatures from '@/components/HotFeatures';
import ReviewSection from '@/components/ReviewSection';
import { useRouter, useParams } from 'next/navigation';

const dummyProperty = {
    id: "123",
    title: "Cozy Villa with Ocean View",
    price: 220,
    description: "Experience tranquil beachside living at our cozy villa...",
};

const dummyDetails = {
    location: {
        address: "123 Palm Beach Road",
        city: "Goa",
        state: "Goa",
        latitude: 15.2993,
        longitude: 74.124,
    },
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    additionalInfo: "This villa is pet-friendly and includes a private chef on request.",
    features: ["Private pool", "Ocean view", "High-speed Wi-Fi"],
    nearbyAttractions: [
        { name: "Candolim Beach", distance: "2 km" },
        { name: "Fort Aguada", distance: "3.5 km" },
    ],
    houseRules: ["No loud music after 10 PM", "No smoking indoors", "Pets allowed"],
    cancellationPolicy: "Full refund up to 5 days before check-in.",
};

const dummyImages = [
    { imageUrl: "/hero.jpg" },
    { imageUrl: "/hero.jpg" },
    { imageUrl: "/hero.jpg" },
];

const dummyAmenities = [
    { name: "Air conditioning" },
    { name: "Free Wi-Fi" },
    { name: "Kitchen" },
    { name: "TV" },
    { name: "Washing machine" },
];

const dummyReviews = [
    { id: 1, name: "John", rating: 4, comment: "Great place!" },
    { id: 2, name: "Jane", rating: 5, comment: "Loved the view and the pool." },
];


const nugget = localfont({
    src: [{ path: '../../../../public/fonts/AirbnbCereal_W_Md.otf' }],
    variable: '--font-nugget',
});

function PropertyDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const propertyId = params.id as string;

    // Fetch property data
    const property = dummyProperty;
    const propertyDetails = dummyDetails;
    const propertyImages = dummyImages;
    const amenities = dummyAmenities;
    const reviews = dummyReviews;
    ;

    if (!property || !propertyDetails) {
        return <div>Property not found</div>;
    }

    const handleBookNow = () => {
        router.push(`/confirm-and-pay?propertyId=${property.id}`);
    };

    const onLookAroundClick = () => {
        router.push(`/lookaround/${property.id}`);
    };

    // Calculate average rating
    const averageRating = reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white text-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
                {/* Title and Actions */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center items-start flex-wrap gap-3 mb-8">
                    <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${nugget.className} text-gray-900`}>{property.title}</h1>
                    <div className="flex space-x-2 sm:space-x-3 ml-auto sm:ml-0 mt-1 sm:mt-0">
                        <button className="cursor-pointer flex items-center gap-1 text-sm hover:bg-gray-100 rounded-full px-4 py-2 transition border border-gray-200 shadow-sm">
                            <Share size={16} />
                            <span className="hidden sm:inline">Share</span>
                        </button>
                        <button className="cursor-pointer flex items-center gap-1 text-sm hover:bg-gray-100 rounded-full px-4 py-2 transition border border-gray-200 shadow-sm">
                            <Heart size={16} />
                            <span className="hidden sm:inline">Save</span>
                        </button>
                    </div>
                </div>

                {/* Gallery Card */}
                <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 mb-10">
                    <PropertyGallery
                        images={propertyImages.map(img => img.imageUrl)}
                        title={property.title}
                    />
                </div>

                {/* Mobile Booking Sidebar (below images) */}
                <div className="block lg:hidden mb-8">
                    <BookingSidebar
                        price={property.price}
                        rating={averageRating}
                        reviews={reviews.length}
                        onBookNow={handleBookNow}
                        onLookAround={onLookAroundClick}
                    />
                </div>

                {/* Content Grid */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Property Meta Info Card */}
                        <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-100">
                            <div className="flex-1">
                                <div className="flex flex-wrap gap-4 items-center text-gray-700 text-base">
                                    <span className="inline-flex items-center gap-2 bg-[#00aeef]/10 text-[#00aeef] px-3 py-1 rounded-full font-medium">
                                        <Eye size={16} /> Lookaround Verified
                                    </span>
                                    <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                        <span className="font-bold">{propertyDetails.location.city}, {propertyDetails.location.state}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                        {propertyDetails.maxGuests} guests · {propertyDetails.bedrooms} bedrooms · {propertyDetails.bathrooms} bathrooms
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* About Section Card */}
                        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-3 text-gray-900">About this place</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {property.description}
                            </p>
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Additional Information</h3>
                                <p className="text-gray-700">{propertyDetails.additionalInfo}</p>
                            </div>
                        </div>

                        {/* Hot Features Card */}
                        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                            <HotFeatures features={propertyDetails.features} />
                        </div>

                        {/* Side-by-side: What this place offers & Lookaround */}
                        <div className="flex flex-col md:flex-row gap-8 w-full mt-2">
                            {/* What this place offers (Amenities) */}
                            <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center items-start p-8 hover:shadow-2xl transition-all duration-200">
                                <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                                    <CheckCircle className="text-[#00aeef] w-6 h-6" /> What this place offers
                                </h2>
                                <div className="grid grid-cols-2 gap-3 w-full mb-4">
                                    {amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-2 text-gray-700">
                                            <span className="bg-[#00aeef]/10 text-[#00aeef] p-2 rounded-full">
                                                <CheckCircle size={18} />
                                            </span>
                                            {amenity.name}
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-2 text-[#00aeef] font-medium hover:underline">Show all amenities</button>
                            </div>
                            {/* This property offers Lookaround */}
                            <div className="flex-1 bg-gradient-to-r from-[#00aeef]/10 to-blue-100 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg border border-[#00aeef]/10 hover:shadow-2xl transition-all duration-200">
                                <div className="flex items-center justify-center w-20 h-20 bg-[#00aeef]/20 rounded-full mb-4">
                                    <Eye size={32} className="text-[#00aeef]" />
                                </div>
                                <h3 className="text-lg font-bold text-[#00aeef] mb-2 text-center">This property offers Lookaround</h3>
                                <p className="text-gray-700 mb-4 text-center">
                                    Take a virtual walk through the property before booking – see every room and explore the space as if you were there.
                                </p>
                                <button
                                    onClick={onLookAroundClick}
                                    className="cursor-pointer bg-gradient-to-r from-[#00aeef] to-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:opacity-90 transition w-full sm:w-auto"
                                >
                                    Look Around the Property
                                </button>
                            </div>
                        </div>

                        {/* Where you'll be (Map) */}
                        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-start p-8 mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="text-[#00aeef] w-7 h-7" />
                                <h2 className="text-lg font-bold text-gray-900">Where you'll be</h2>
                            </div>
                            <div className="text-gray-700 text-base mb-4">
                                {propertyDetails.location.address}, {propertyDetails.location.city}, {propertyDetails.location.state}
                            </div>
                            <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-200">
                                <iframe
                                    title="Property Location"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"

                                    src="https://www.google.com/maps?q=No.122,+Saalu+Hunase+Village,+Opp.+Anjaneya+Temple,+Udayapura+Post,+Kanakapura+Main+Rd,+Bengaluru,+Karnataka+560082&output=embed"                                ></iframe>
                            </div>
                            {/* Nearby Attractions */}
                            <div className="mt-6 w-full">
                                <h3 className="font-semibold mb-3">Nearby Attractions</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {propertyDetails.nearbyAttractions.map((attraction, index) => (
                                        <div key={index} className="flex items-center gap-2 text-gray-700">
                                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                                {attraction.name} ({attraction.distance})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* House Rules */}
                        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">House Rules</h2>
                            <div className="space-y-2">
                                {propertyDetails.houseRules.map((rule, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <CheckCircle className="text-[#00aeef] w-5 h-5 mt-0.5" />
                                        <span className="text-gray-700">{rule}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cancellation Policy */}
                        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>
                            <p className="text-gray-700">{propertyDetails.cancellationPolicy}</p>
                        </div>

                        {/* Reviews Card */}
                        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                            <ReviewSection reviews={reviews} />
                        </div>
                    </div>

                    {/* Desktop Booking Sidebar (right) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <BookingSidebar
                            price={property.price}
                            rating={averageRating}
                            reviews={reviews.length}
                            onBookNow={handleBookNow}
                            onLookAround={onLookAroundClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetailsPage; 