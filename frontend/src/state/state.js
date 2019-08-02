let state = {
    extendLoaders: false,
    appLoading: false,
    loginLoading: false,
    loggedInUser: null,
    postsLoading: false,
    getPostsError: false,
    posts: []
};
let subscriptions = {};

export const getState = () => {
    return state;
}

const isDescendant = (elId, parentId) => {
    console.log('parent: ', parentId)
    const descendants = [...document.getElementById(parentId).querySelectorAll('*')];

    if (descendants.find(el => el.id === elId)) {
        console.log(`isDescendant(${elId}, ${parentId})`);
        return true;
    }

    return false;
}

export const setState = (newState) => {
    console.log('setState: ', newState);
    const changed = Object.keys(newState).filter(key => newState[key] !== state[key]);
    console.log('changed: ', changed);
    state = {
        ...state,
        ...newState
    }

    const toUpdate = new Set();

    changed.forEach(key => {
        console.log(`${key}: ${newState[key]}`);
        Object.keys(subscriptions).forEach(id => {
            if (subscriptions[id].dependencies.has(key) && document.getElementById(id)) {
                toUpdate.add(id);
            }
        });
    });
    console.log('toUpdate: ', toUpdate);
    const minToUpdate = [...toUpdate].filter(elId => {
        console.log('element: ', elId);
        let keep = true;
        toUpdate.forEach(parentId => {
            if (elId === parentId || !keep) return;
            if (isDescendant(elId, parentId)) {
                console.log('deleting ', elId);
                toUpdate.delete(elId)
                keep = false;
            }
        })
        return keep;
    })
    console.log('minToUpdate: ', minToUpdate);

    minToUpdate.forEach(elId => document.getElementById(elId).replaceWith(subscriptions[elId].renderer()))
    console.log(state);
}

export const subscribe = (id, renderer, dependencies) => {
    if (!subscriptions[id]) {
        subscriptions[id] = {
            renderer: renderer,
            dependencies: new Set(dependencies)
        };
    }
    else {
        dependencies.forEach(key => {
            subscriptions[id].dependencies.add(key);
        });
    }
}