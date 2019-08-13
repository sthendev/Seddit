import { get, set } from '../utils/objectUtils.js';

let state = {
    extendLoaders: false,
    appLoading: false,
    modalOpen: false,
    loginLoading: false,
    loggedInUsername: null,
    openUsername: null,
    userLoading: false,
    userDetails: null,
    postsLoading: false,
    publicPosts: true,
    searchResults: false,
    getPostsError: false,
    noMorePosts: false,
    openPostId: null,
    postLoading: false,
    postDetails: null,
    morePostsLoading: false,
    morePostsError: false,
    sendPostLoading: false,
    posts: []
};
let subscriptions = {};

export const getState = () => {
    return state;
}

const isDescendant = (elId, parentId) => {
    const descendants = [...document.getElementById(parentId).querySelectorAll('*')];

    if (descendants.find(el => el.id === elId)) {
        return true;
    }

    return false;
}

const rerender = (elId) => {
    const original = document.getElementById(elId);
    const rerendered = subscriptions[elId].renderer();
    const retainProperties = {};

    subscriptions[elId].retainProperties.forEach(property => {
        retainProperties[property] = get(property, original);
    });

    original.replaceWith(rerendered);
    
    if (!original) return;
    Object.keys(retainProperties).forEach(property => {
        set(property, retainProperties[property], rerendered);
    });
}

export const setState = (newState) => {
    console.log('newState: ', newState);
    const changed = Object.keys(newState).filter(key => newState[key] !== state[key]);
    state = {
        ...state,
        ...newState
    }

    const toUpdate = new Set();

    changed.forEach(key => {
        Object.keys(subscriptions).forEach(id => {
            if (subscriptions[id].dependencies.has(key) && document.getElementById(id)) {
                toUpdate.add(id);
            }
        });
    });
    const minToUpdate = [...toUpdate].filter(elId => {
        let keep = true;
        toUpdate.forEach(parentId => {
            if (elId === parentId || !keep) return;
            if (isDescendant(elId, parentId)) {
                toUpdate.delete(elId)
                keep = false;
            }
        })
        return keep;
    })
    console.log('minToUpdate: ', minToUpdate);

    minToUpdate.forEach(elId => rerender(elId));
    console.log(state);
}

export const subscribe = (id, renderer, dependencies, retainProperties) => {
    if (!subscriptions[id]) {
        subscriptions[id] = {
            renderer: renderer,
            dependencies: new Set(dependencies),
            retainProperties: retainProperties ? [...retainProperties] : []
        };
    } 
}