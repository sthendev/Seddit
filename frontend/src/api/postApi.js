import { API_URL } from './initApi.js';

const POST_URL = '/post/';
const POST_COMMENT_URL = '/post/comment';
const POST_PUBLIC_URL = '/post/public';
const POST_VOTE_URL = '/post/vote';

export const requestPostsPublic = (request, queryString) => {
    return fetch(API_URL + POST_PUBLIC_URL + queryString, request);
}

export const requestPost = (request, queryString) => {
    return fetch(API_URL + POST_URL + queryString, request);
}

export const requestVote = (request, queryString) => {
    return fetch(API_URL + POST_VOTE_URL + queryString, request);
}

export const requestComment = (request, queryString) => {
    return fetch(API_URL + POST_COMMENT_URL + queryString, request);
}