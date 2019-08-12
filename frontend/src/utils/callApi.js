import delay from '../utils/delay.js';
import { getState } from '../state/state.js';

const callApi = async (api, request, queryParams) => {
    let queryString = '';
    if (queryParams) {
        queryString = '?' + Object.entries(queryParams).map(entry => `${entry[0]}=${entry[1]}`).join('&');
    }
    const response = await api(request, queryString);
    const status = response.status;
    const responseData = await response.json();

    return [status, responseData];
}

export default callApi;