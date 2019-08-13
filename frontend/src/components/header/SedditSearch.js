import { input } from '../../utils/elements.js';
import { getUser, getUsernameFromId } from '../../actions/userActions.js';
import { getPostFromId } from '../../actions/postActions.js';
import { getState, setState } from '../../state/state.js';

const search = async (query) => {
    setState({postsLoading: true, getPostsError: false, publicPosts: false, searchResults: true});

    const {data: loggedInUser} = await getUser(getState().loggedInUsername);
    const following = []
    for (let userId of loggedInUser.following) {
        const username = await getUsernameFromId(userId);
        following.push(username);
    }
    loggedInUser.following = following;

    const searchResults = [];
    for (let user of loggedInUser.following) {
        const {data: { posts } } = await getUser(user);
        for (let postId of posts) {
            const post = await getPostFromId(postId);
            if (post.title.toLowerCase().includes(query.toLowerCase())) {
                searchResults.push(post);
            }
        } 
    }

    searchResults.sort((a,b) => parseInt(b.meta.published) - parseInt(a.meta.published));

    setState({
        postsLoading: false,
        posts: [...searchResults],
        noMorePosts: true
    });
}

const SedditSearch = () => {
    if (!getState().loggedInUsername) return null;

    const el = input({
        id: 'search',
        placeholder: 'Search Seddit',
        type: 'search',
        data: 'id-search'
    });
    
    el.addEventListener('change', (event) => {
        if (event.target.value) {
            search(event.target.value);
        }
    })

    return el;
}

export default SedditSearch;