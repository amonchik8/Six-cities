import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: 'main/changeCity',
  LOAD_OFFER: 'data/loadOffer',
  LOAD_OFFERS: 'data/loadOffers',
  LOAD_OFFERS_NEARBY: 'data/loadOffersNearby',
  LOAD_REVIEWS: 'reviews/loadReviews',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOAD_USER_INFO: 'user/loadUserInfo',
  SIGNOUT: 'user/signOut',
  REDIRECT_TO_ROUTE: 'main/redirectToRoute',
  LOAD_FAVORITES: 'data/loadFavorites',
  UPDATE_FAVORITES: 'data/updateFavorites',
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (payload) => ({
  payload,
}));

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (payload) => ({
  payload,
}));

export const loadOffer = createAction(ActionType.LOAD_OFFER, (payload) => ({
  payload,
}));

export const loadOffersNearby = createAction(
  ActionType.LOAD_OFFERS_NEARBY,
  (payload) => ({ payload }));

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (payload) => ({
  payload,
}));

export const requiredAuthorization = createAction(
  ActionType.REQUIRED_AUTHORIZATION,
  (payload) => ({ payload }));

export const loadUserInfo = createAction(
  ActionType.LOAD_USER_INFO,
  (payload) => ({ payload }));

export const signOut = createAction(ActionType.SIGNOUT);

export const redirectToRoute = createAction(
  ActionType.REDIRECT_TO_ROUTE,
  (payload) => ({ payload }));

export const loadFavorites = createAction(ActionType.LOAD_FAVORITES, (payload) => ({
  payload,
}));

export const updateFavorites = createAction(ActionType.UPDATE_FAVORITES, (payload) => ({
  payload,
}));
