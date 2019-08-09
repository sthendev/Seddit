import { button } from '../../utils/elements.js';
import { getState, setState } from '../../state/state.js';
import { getPublicPosts } from '../../actions/postActions.js';
import { getFeedPosts } from '../../actions/userActions.js';

const switchPublicPosts = async () => {
    setState({postsLoading: true, getPostsError: false});
    let response = {};
    try {
        response = await getPublicPosts();
    } catch(error) {
        response.hasError = true;
    }

    if (response.hasError) {
        setState({postsLoading: false, getPostsError: true});
    } else {
        setState({
            postsLoading: false, 
            posts: [...response.data],
            publicPosts: true,
            noMorePosts: true
        });
    }
}

const switchFeedPosts = async () => {
    setState({postsLoading: true, getPostsError: false});

    let response = {};
    try {
        response = await getFeedPosts();
    } catch(error) {
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
                posts: [...response.data]
            });
        }
        
    }
}

const SwitchPostsButton = () => {
    if (!getState().loggedInUser) return null;
    
    const el = button({
        classes: ['button', 'button-secondary', 'switch-posts'],
        text: `${getState().publicPosts ? 'Back to Feed' : 'Public Posts'}`
    })

    el.addEventListener('click', () => {
        if (getState().publicPosts) {
            switchFeedPosts();
        } else {
            switchPublicPosts();
        }
    })

    return el;
}

export default SwitchPostsButton;