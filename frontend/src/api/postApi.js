import { API_URL } from './initApi.js';

const POST_URL = '/post/';
const POST_COMMENT_URL = '/post/comment';
const POST_PUBLIC_URL = '/post/public';
const POST_VOTE_URL = '/post/vote';

export const requestPostsPublic = (request) => {
    return fetch(API_URL + POST_PUBLIC_URL, request);
}