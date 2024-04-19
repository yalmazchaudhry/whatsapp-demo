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
          src={thumbUp}
          alt="thumbUp"
          height={11}
          width={13}
          className="cursor-pointer scale-hover-150"
          onMouseEnter={() => setHover(5)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(5)}
        />
        <div className="mx-4">
          {[...Array(totalStars)].map((star, index) => {
            const currentRating = index + 1;

            return (
              <label key={index} className="mx-2">
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onChange={() => setRating(currentRating)}
                  className="d-none"
                />
                <span
                  className="cursor-pointer text-16 "
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    fill={
                      currentRating <= (hover || rating) ? '#ffc107' : 'none'
                    }
                  />
                </span>
              </label>
            );
          })}
        </div>
        <img
          src={thumbDown}
          alt="thumbDown"
          height={11}
          width={13}
          className="cursor-pointer scale-hover-150"
          onMouseEnter={() => setHover(-1)}
          onMouseLeave={() => setHover(rating)}
          onClick={() => setRating(0)}
        />
      </div>
    </>
  );
}

export default Rating;
