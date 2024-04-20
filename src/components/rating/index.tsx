import { useState } from 'react';
import './index.scss';
import Star from '../icons/star.tsx';
import thumbUp from '../../assets/icons/thumb-up.png';
import thumbDown from '../../assets/icons/thumb-down.png';
function Rating() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const totalStars: number = 5;

  return (
    <>
      <div className="flex items-center">
        <img
          src={thumbDown}
          alt="thumbDown"
          height={18}
          width={20}
          className="cursor-pointer scale-hover-150"
          onMouseEnter={() => setHover(-1)}
          onMouseLeave={() => setHover(rating)}
          onClick={() => setRating(0)}
        />
        <div className="mx-4">
          {[...Array(totalStars)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <span
                key={currentRating}
                className="cursor-pointer text-16 mx-2"
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  fill={currentRating <= (hover || rating) ? '#ffc107' : 'none'}
                />
              </span>
            );
          })}
        </div>
        <img
          src={thumbUp}
          alt="thumbUp"
          height={18}
          width={20}
          className="cursor-pointer scale-hover-150"
          onMouseEnter={() => setHover(5)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(5)}
        />
      </div>
    </>
  );
}

export default Rating;
