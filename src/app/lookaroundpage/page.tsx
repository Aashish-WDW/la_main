import React from 'react';
import { Camera, Upload, Check } from 'lucide-react';

interface LookAroundPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
  onLookAroundClick: () => void;
  isAuthenticated?: boolean;
}

const LookAroundPage: React.FC<LookAroundPageProps> = ({
  onLoginClick,
  onSignupClick,
  onProfileClick,
  onLogoClick,
  onLookAroundClick,
  isAuthenticated = false
}) => {
  return (
    <div className='bg-gradient-to-b from-gray-50 to-white mt-16'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Look Around Your Space</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create virtual tours of your property to attract more guests and get verified status.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Create a Virtual Tour?</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 bg-[#00aeef] rounded-full p-1 text-white mr-4">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Attract More Guests</h3>
                  <p className="text-gray-600">Properties with virtual tours get 32% more bookings and appear higher in search results.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-[#00aeef] rounded-full p-1 text-white mr-4">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Build Trust</h3>
                  <p className="text-gray-600">Show guests exactly what to expect with a virtual walkthrough of your space.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-[#00aeef] rounded-full p-1 text-white mr-4">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Get Verified Status</h3>
                  <p className="text-gray-600">Earn the "Lookaround Verified" badge that builds trust with potential guests.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg" 
              alt="Virtual tour creation" 
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-semibold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Camera size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">1. Capture Your Space</h3>
                <p className="text-gray-600">
                  Use our app to take panoramic photos of each room in your property. 
                  We'll guide you through the process step by step.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Upload size={24} className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">2. Upload & Process</h3>
                <p className="text-gray-600">
                  Our advanced AI technology stitches your photos together to create a 
                  seamless 3D tour of your property.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check size={24} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">3. Get Verified</h3>
                <p className="text-gray-600">
                  Once approved, your listing will receive the "Lookaround Verified" badge 
                  and your virtual tour will be live.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <button className="cursor-pointer bg-[#00aeef] text-white font-medium px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200">
            Get Started with Lookaround
          </button>
          <p className="mt-4 text-gray-500 text-sm">
            Already have a property listing? <a href="#" className="text-[#00aeef]">Sign in</a> to add a virtual tour.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LookAroundPage;