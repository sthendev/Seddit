import { API_URL } from './initApi.js';

const USER_URL = '/user/';
const USER_FEED_URL = '/user/feed';
const USER_FOLLOW_URL = '/user/follow';
const USER_UNFOLLOW_URL = '/user/unfollow';

export const requestUser = (request, queryString) => {
    return fetch(API_URL + USER_URL + queryString, request);
}

export const requestPostsFeed = (request, queryString) => {
    return fetch(API_URL + USER_FEED_URL + queryString, request);
}