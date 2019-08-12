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
        return output;
    }

    const usernames = [];
    for (let userId of responseData.following) {
        const {data: {username}} = await getUser({id: userId});
        usernames.push(username);
    }
    responseData.following = usernames;

    output.hasError = false;
    output.data = responseData;

    return output;
}

export const getFeedPosts = async (startBeginning) => {
    const request = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    };

    const queryParams = {
        p: `${startBeginning ? 0 : getState().posts.length}`
    }

    const output = {};

    let status, responseData;
    try {
        [status, responseData] = await callApi(api.requestPostsFeed, request, queryParams);
    } catch(error) {
        console.error(error)
        output.hasError = true;
    }

    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
        return output;
    }

    if (getState().loggedInUser) {
        for (let post of responseData.posts) {
            const usernames = [];
            for (let upvoterId of post.meta.upvotes) {
                const {data: {username}} = await getUser({id: upvoterId});
                usernames.push(username);
            }
            post.meta.upvotes = usernames;
        }
    }

    output.hasError = false;
    output.data = responseData.posts;

    return output;
}

export const getUser = async ({id, username}) => {
    const request = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    };

    const queryParams = {}
    if (id) queryParams.id = id;
    if (username) queryParams.username = username;

    const output = {};

    const [status, responseData] = await callApi(api.requestUser, request, queryParams);

    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
    } else {
        output.hasError = false;
        output.data = responseData;
    }

    return output;
}

