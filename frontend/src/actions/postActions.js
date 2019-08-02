import * as api from '../api/postApi.js';
import callApi from '../utils/callApi.js';

export const getPublicPosts = async () => {
    const request = {
        method: 'GET'
    };

    const output = {};

    const [status, responseData] = await callApi(api.requestPostsPublic, request);
    
    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
    } else {
        output.hasError = false;
        output.data = responseData.posts;
    }

    console.log('getPublicPosts: ', output);

    return output;
}