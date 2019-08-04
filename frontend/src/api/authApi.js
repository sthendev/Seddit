import { API_URL } from './initApi.js';

const LOGIN_URL = '/auth/login';
const SIGNUP_URL = '/auth/signup';

export const requestLogin = (request) => {
    return fetch(API_URL + LOGIN_URL, request);
}

export const requestSignup = (request) => {
    return fetch(API_URL + SIGNUP_URL, request);
}