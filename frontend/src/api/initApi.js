import { setState } from '../state/state.js';

export let API_URL = "";
export let TOKEN = "";

const initApi = (apiUrl) => {
    API_URL = apiUrl;
    TOKEN = localStorage.getItem('Token') 
        ? localStorage.getItem('Token')
        : "";
    setState({extendLoaders: true});
}

export const saveToken = (token) => {
    localStorage.setItem('Token', token);
}

export const clearToken = () => {
    TOKEN = "";
    localStorage.removeItem('Token');
}

export default initApi;