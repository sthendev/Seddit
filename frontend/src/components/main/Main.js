import PostButton from './PostButton.js';
import Post from './Post.js';
import Loader from '../loader/Loader.js';
import { main, ul, div, h3, h4, img } from '../../utils/elements.js';
import { getState, setState, subscribe } from '../../state/state.js';
import { getPublicPosts } from '../../actions/postActions.js';
import { getFeedPosts } from '../../actions/userActions.js';

const getPosts = async () => {
    setState({postsLoading: true, getPostsError: false});

    if (getState().loggedInUser) {
        let response = {};
        try {
            response = await getFeedPosts();
        } catch(error) {
            response.hasError = true;
        }

        if (response.hasError) {
            setState({postsLoading: false, getPostsError: true});
        } else {
            setState({
                postsLoading: false,
                posts: [...getState().posts, ...response.data]
            });
        }
    } else {
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
                posts: [...getState().posts, ...response.data]
            });
        }
    }
}

const Main = () => {
    !document.getElementById('main') && getPosts();

    const posts = getState().posts.map((post, index) => {
        return Post({index: index, ...post});
    });

    const feedTitle = getState().loggedInUser ? 'Your Feed' : 'Latest Posts';
    const noPostsText = getState().getPostsError ? 'Unable to contact the seddit gods :(' : 'Nothing to see here...'

    let mainContent;
    if (getState().postsLoading) {
        mainContent = Loader();
    } else {
        if (getState().posts.length) {
            mainContent = ul({id: 'feed', data: 'id-feed'},
                div({classes: ['feed-header']},
                    h3({classes: ['feed-title', 'alt-text'], text: feedTitle}),
                    PostButton()
                ),
                ...posts
            );
        } else {
            mainContent = ul({id: 'feed', classes: ['no-posts'], data: 'id-feed'},
                div({classes: ['feed-header']},
                    h3({classes: ['feed-title', 'alt-text'], text: feedTitle})
                ),
                div({classes: ['spider-box']},
                    img({classes: ['spider-img'], src: '/assets/spider.png'}),
                    h4({classes: ['feed-title', 'alt-text'], text: noPostsText})
                )
            );
        }
    }

    const el = main({id: 'main', role: 'main'},
        mainContent
    );

    return el;
}

subscribe('main', Main, ['postsLoading', 'posts', 'getPostsError', 'loggedInUser']);

export default Main;