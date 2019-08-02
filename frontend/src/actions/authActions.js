import * as api from '../api/authApi.js';
import callApi from '../utils/callApi.js';

export const login = async (payload) => {
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    const output = {};

    const [status, responseData] = await callApi(api.requestLogin, request);

    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
    } else {
        output.hasError = false;
        output.data = responseData.token;
    }

    return output;
}