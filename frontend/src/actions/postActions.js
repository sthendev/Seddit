import * as api from '../api/postApi.js';
import callApi from '../utils/callApi.js';
import { getUsernameFromId } from './userActions.js';
import { getState, setState } from '../state/state.js';
import { TOKEN } from '../api/initApi.js';

export const getPublicPosts = async () => {
    const request = {
        method: 'GET'
    };

    const output = {};

    const [status, responseData] = await callApi(api.requestPostsPublic, request);
    
    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
        return output;
    }

    if (getState().loggedInUsername) {
        for (let post of responseData.posts) {
            const usernames = [];
            for (let upvoterId of post.meta.upvotes) {
                const username = await getUsernameFromId(upvoterId);
                usernames.push(username);
            }
            post.meta.upvotes = usernames;
        }
    }

    output.hasError = false;
    output.data = responseData.posts;

    return output;
}

export const post = async (payload) => {
    const request = {
        method: 'POST',
        headers: {
            'Authorization': `Token ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    const output = {};

    const [status, responseData] = await callApi(api.requestPost, request);
    
    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
        return output;
    }

    output.hasError = false;
    output.data = responseData.post_id;

    return output;
}

export const update = async (payload, postId) => {
    const request = {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    const queryParams = {
        id: postId
    }

    const output = {};

    const [status, responseData] = await callApi(api.requestPost, request, queryParams);
    
    if (status !== 200) {
        output.hasError = true;
        output.data = responseData.message;
        return output;
    }

    output.hasError = false;
    output.data = responseData.post_id;

    return output;
}

export const deletePost = async (postId) => {
    const request = {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    }

    const queryParams = {
        id: postId
    }

    callApi(api.requestPost, request, queryParams);
}

export const upvote = async (postId, addVote) => {
    const request = {
        method: addVote ? 'PUT' : 'DELETE',
        headers: {
            'Authorization': `Token ${TOKEN}`
        }
    }

    const queryParams = {
        id: postId
    }

    callApi(api.requestVote, request, queryParams);
}

export const comment = async (comment, postId) => {
    const request = {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: comment
        })
    }

    const queryParams = {
        id: postId
    }

    callApi(api.requestComment, request, queryParams);
}

export const getPostFromId = async (id) => {
    const request = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${TOKEN}`,
            'Content-Type': 'application/json'
        }
    }

    const queryParams = {
        id: id
    }

    const [status, responseData] = await callApi(api.requestPost, request, queryParams);

    if (status === 200) {
        return responseData;
    } else {
        return null;
    }
}