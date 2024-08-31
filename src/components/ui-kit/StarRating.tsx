import React, {useState} from 'react';

type StarRatingProps = {
    maxStars?: number;
    rating?: number;
    onRatingChange?: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({maxStars = 5, rating = 0, onRatingChange}) => {
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    const handleMouseEnter = (index: number) => {
        setHoveredRating(index);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (index: number) => {
        if (onRatingChange) {
            onRatingChange(index);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex mb-2">
                {Array.from({length: maxStars}, (_, index) => {
                    const starIndex = index + 1;
                    return (
                        <svg
                            key={index}
                            className={`w-8 h-8 cursor-pointer ${
                                starIndex <= (hoveredRating || rating) ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            onMouseEnter={() => handleMouseEnter(starIndex)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(starIndex)}
                        >
                            <path
                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            />
                        </svg>
                    );
                })}
            </div>
            <div className="text-lg font-medium text-black">
                {rating > 0 ? `Current Rating: ${rating}/${maxStars}` : 'No rating selected'}
            </div>
        </div>
    );
};

export default StarRating;