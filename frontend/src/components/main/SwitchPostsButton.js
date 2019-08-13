import { button } from '../../utils/elements.js';
import { getState, setState } from '../../state/state.js';
import { getPublicPosts } from '../../actions/postActions.js';
import { getFeedPosts } from '../../actions/userActions.js';
import delay from '../../utils/delay.js';

const switchPublicPosts = async () => {
    setState({postsLoading: true, getPostsError: false});
    let response = {};
    try {
        getState().extendLoaders && await delay(800);
        response = await getPublicPosts();
    } catch(error) {
        console.error(error);
        response.hasError = true;
    }

    if (response.hasError) {
        setState({postsLoading: false, getPostsError: true});
    } else {
        setState({
            postsLoading: false, 
            posts: [...response.data],
            publicPosts: true,
            searchResults: false,
            noMorePosts: true
        });
    }
}

const switchFeedPosts = async () => {
    setState({postsLoading: true, getPostsError: false});

    let response = {};
    try {
        getState().extendLoaders && await delay(800);
        response = await getFeedPosts(true);
    } catch(error) {
        console.error(error);
        response.hasError = true;
    }

    if (response.hasError) {
        setState({postsLoading: false, getPostsError: true});
    } else {
        if (response.data.length < 10) {
            setState({
                postsLoading: false,
                posts: [...response.data],
                publicPosts: false,
                noMorePosts: true
            });
        } else {
            setState({
                postsLoading: false,
                posts: [...response.data],
                publicPosts: false,
                searchResults: false,
                noMorePosts: false
            });
        }
        
    }
}

const SwitchPostsButton = () => {
    if (!getState().loggedInUsername) return null;
    
    const el = button({
        classes: ['button', 'button-secondary', 'switch-posts'],
        text: `${getState().publicPosts || getState().searchResults ? 'Back to Feed' : 'Public Posts'}`
    })

    el.addEventListener('click', () => {
        if (getState().publicPosts || getState().searchResults) {
            switchFeedPosts();
        } else {
            switchPublicPosts();
        }
    })

    return el;
}

export default SwitchPostsButton;