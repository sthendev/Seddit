import * as api from '../api/userApi.js';
import callApi from '../utils/callApi.js';
import { TOKEN } from '../api/initApi.js';
import { getState } from '../state/state.js';

export const getLoggedInUsername = async () => {
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

    output.hasError = false;
    output.data = responseData.username;

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

    for (let post of responseData.posts) {
        const usernames = [];
        for (let upvoterId of post.meta.upvotes) {
            const username = await getUsernameFromId(upvoterId);
            usernames.push(username);
        }
        post.meta.upvotes = usernames;
    }

    output.hasError = false;
    output.data = responseData.posts;

    return output;
}

export const getUsernameFromId = async (id) => {
    const request = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    };

    const queryParams = {
        id: id
    }

    const [status, responseData] = await callApi(api.requestUser, request, queryParams);

    if (status === 200) {
        return responseData.username;
    } else {
        return undefined;
    }
}

export const getUser = async (username) => {
    const request = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    };

    const queryParams = {
        username: username
    }

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

export const follow = async (username, isFollow) => {
    const request = {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    }

    const queryParams = {
        username: username
    }

    if (isFollow) {
        callApi(api.requestFollow, request, queryParams);
    } else {
        callApi(api.requestUnfollow, request, queryParams);
    }
}

export const editProfile = async (payload) => {
    const request = {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    callApi(api.requestUser, request);
}

