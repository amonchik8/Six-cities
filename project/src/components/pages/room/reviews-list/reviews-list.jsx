import React from 'react-dom';
import PropTypes from 'prop-types';
import { reviewsType } from '../../../../types';
import ReviewsItem from './reviews-item';
function ReviewsList({ reviews }) {
  reviews.sort((a, b) => b.id - a.id);

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewsItem
          key={review.id}
          comment={review.comment}
          date={review.date}
          id={review.id}
          rating={review.rating}
          user={review.user}
        />
      ))}
    </ul>
  );
}
ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewsType),
};

export default ReviewsList;