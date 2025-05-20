// components/HostProfile.tsx
export default function HostProfile() {
    return (
      <div className="mt-6 flex items-center space-x-4">
        <img
          src="/hero.jpg"
          alt="Host"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-medium">Mahesh Babu</h3>
          <p className="text-sm text-gray-500">Superhost · Joined in 2004</p>
          <p className="text-sm mt-2">
            Passionate about providing comfortable stays. Always here to help!
          </p>
        </div>
      </div>
    );
  }
  