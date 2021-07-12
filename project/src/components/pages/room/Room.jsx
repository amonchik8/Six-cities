import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { offersType, reviewsType } from '../../../types';
import { PlaceClass } from '../../../const';
import PlaceCard from '../../place-card/PlaceCard';
import Header from '../../header';
import Form from '../../form';
import ReviewsList from '../../reviews-list';
import Map from '../../map/Map';
import {
  fetchReviewList,
  fetchOfferNearbyList
} from '../../../store/api-actions';

function Room({
  offers = [],
  offersNearby = [],
  reviews = [],
  loadReviewList,
  loadOfferNearbyList,
  pageType,
}) {
  const location = useLocation();
  const [selectedPoint, setSelectedPoint] = useState({});
  const roomId = +location.pathname.replace(/\D+/g, '');
  const offer = offers.find((item) => item.id === roomId);
  const {
    goods,
    images,
    isFavorite,
    isPremium,
    rating,
    title,
    type,
    description,
    bedrooms,
    maxAdults,
    price,
    host,
  } = offer;
  const hotel = offers.find(
    (item) => `/offer/${item.id}` === window.location.pathname);
  const city = hotel.city.name;
  const onListItemHover = (id) => {
    const currentHotel = offers.find((item) => item.id === id);
    if (currentHotel) {
      setSelectedPoint(currentHotel);
    }
  };
  useEffect(() => {
    loadReviewList(roomId);
    loadOfferNearbyList(roomId);
  }, [roomId, loadReviewList, loadOfferNearbyList]);

  return (
    <div>
      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((item) => (
                  <div key={item} className="property__image-wrapper">
                    <img className="property__image" src={item} alt="Offer" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{title}</h1>
                  <button
                    className="property__bookmark-button button"
                    type="button"
                  >
                    <svg
                      className="property__bookmark-icon"
                      width="31"
                      height="33"
                      style={{
                        fill: `${isFavorite && '#4481c3'}`,
                        stroke: `${isFavorite ? '#4481c3' : '#979797'}`,
                      }}
                    >
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span
                      style={{ width: `calc(${Math.round(rating) * 20}%` }}
                    />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((item) => (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="property__avatar user__avatar"
                        src={host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{host.name}</span>
                    {host.isPro && (
                      <span className="property__user-status">Pro</span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">{description}</p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot;
                    <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  <ReviewsList reviews={reviews} />
                  <Form />
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                city={city}
                offers={offersNearby}
                selectedPoint={selectedPoint}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {offersNearby.map((item) => (
                  <PlaceCard
                    key={item.id}
                    title={item.title}
                    isPremium={item.isPremium}
                    price={item.price}
                    type={item.type}
                    previewImage={item.previewImage}
                    id={item.id}
                    rating={item.rating}
                    placeClass={PlaceClass[pageType]}
                    listItemHoverHandler={(id) => onListItemHover(id)}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            />
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            />
          </symbol>
        </svg>
      </div>
    </div>
  );
}

const mapStateToProps = ({ offers, offersNearby, reviews }) => ({
  offers,
  offersNearby,
  reviews,
});

const mapDispatchToProps = {
  loadReviewList: fetchReviewList,
  loadOfferNearbyList: fetchOfferNearbyList,
};

Room.propTypes = {
  reviews: PropTypes.arrayOf(reviewsType),
  offers: PropTypes.arrayOf(offersType),
  pageType: PropTypes.string,
  offersNearby: PropTypes.arrayOf(offersType).isRequired,
  loadReviewList: PropTypes.func.isRequired,
  loadOfferNearbyList: PropTypes.func.isRequired,
};

export { Room };
export default connect(mapStateToProps, mapDispatchToProps)(Room);
