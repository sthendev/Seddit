import * as api from '../api/userApi.js';
import callApi from '../utils/callApi.js';
import { TOKEN } from '../api/initApi.js';
import { getState } from '../state/state.js';

export const getLoggedInUser = async () => {
    const request = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    };

    const output = {};

    const [status, responseData] = await callApi(api.requestUser, request);

    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
    } else {
        output.hasError = false;
        output.data = responseData;
    }

    return output;
}

export const getFeedPosts = async () => {
    const request = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    };

    const queryParams = {
        'p': `${getState().posts.length}`
    }

    const output = {};

    let status, responseData;
    try {
        [status, responseData] = await callApi(api.requestPostsFeed, request, queryParams);
    } catch(error) {
        console.log('error');
    }

    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
    } else {
        output.hasError = false;
        output.data = responseData.posts;
    }

    return output;
}

