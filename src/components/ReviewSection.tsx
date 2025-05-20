import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
};

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -width : width,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Recent reviews</h2>

      {/* Mobile View */}
      <div className="relative md:hidden">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-1"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-500" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
        >
          {reviews.map((review) => {
            return (
              <div
                key={review.id}
                className="min-w-[85vw] max-w-xs bg-white shadow-sm border border-gray-200 rounded-xl p-5 hover:shadow-md transition snap-center"
              >
                <div className="flex items-center mb-4">
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-gray-500 text-sm">
                      {/* Date is not available in the new review type, so this is commented out */}
                      {/* {new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })} */}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-800 mb-3">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  <span>{review.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            );
          })}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-1"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
            >
              <div className="flex items-center mb-4">
                <div>
                  <div className="font-medium">{review.name}</div>
                  <div className="text-gray-500 text-sm">
                    {/* Date is not available in the new review type, so this is commented out */}
                    {/* {new Date(review.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })} */}
                  </div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-800 mb-3">
                <Star size={16} className="mr-1 text-yellow-500" />
                <span>{review.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSection;
