import PostButton from './PostButton.js';
import Post from './Post.js';
import Loader from '../loader/Loader.js';
import { main, ul, div, h3, h4, img, li } from '../../utils/elements.js';
import { getState, setState, subscribe } from '../../state/state.js';
import { getPublicPosts } from '../../actions/postActions.js';
import { getFeedPosts } from '../../actions/userActions.js';

const getInitialPosts = async () => {
    setState({postsLoading: true, getPostsError: false});

    let response = {hasError: false, data: []};
    if (getState().loggedInUser) {
        try {
            response = await getFeedPosts();
        } catch(error) {
            response.hasError = true;
        }
    }
    if (response.hasError || !response.data.length) {
        try {
            response = await getPublicPosts();
        } catch(error) {
            response.hasError = true;
        }
    }
    if (response.hasError) {
        setState({postsLoading: false, getPostsError: true});
    } else {
        if (response.data.length < 10 || response.data.length > 10) {
            setState({
                postsLoading: false,
                posts: [...response.data],
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

const getMorePosts = async () => {
    setState({morePostsLoading: true, morePostsError: false});

    let response = {};
    try {
        response = await getFeedPosts();
    } catch(error) {
        response.hasError = true;
    }

    if (response.hasError) {
        setState({morePostsLoading: false, morePostsError: true});
    } else {
        if (response.data.length < 10) {
            setState({
                morePostsLoading: false,
                posts: [...getState().posts, ...response.data],
                noMorePosts: true
            });
        } else {
            setState({
                morePostsLoading: false,
                posts: [...getState().posts, ...response.data]
            });
        }
        
    }
}

const Main = () => {
    const mounted = document.getElementById('main');

    !mounted && getInitialPosts();

    const mainClasses = [];
    !mounted && mainClasses.push('fade');

    const posts = getState().posts.map((post, index) => {
        return Post({index: index, ...post});
    });

    getState().morePostsLoading && posts.push(
        li({id: 'loading-placeholder',classes: ['post', 'fade']},
            Loader()
        )
    );

    (getState().noMorePosts || getState().morePostsError) && posts.push(
        li({id: 'loading-placeholder',classes: ['post', 'fade']},
            h4({
                id: 'posts-depleted-placeholder',
                classes: ['alt-text'],
                text: `${getState().morePostsError 
                    ? 'Ran into trouble getting more posts...' 
                    : "That's all folks!"}`
            })
        )
    );

    const feedTitle = getState().loggedInUser 
        ? 'Your Feed' 
        : 'Latest Posts';
    const noPostsText = getState().getPostsError 
        ? 'Unable to contact the seddit gods :(' 
        : 'Nothing to see here...';

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

    const el = main({id: 'main', classes: mainClasses, role: 'main'},
        mainContent
    );

    let scrollTimeout;
    const scrollHandler = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (el.scrollHeight - el.scrollTop < 2000 
                && getState().loggedInUser 
                && !getState().noMorePosts
                && !getState().morePostsLoading
                && !getState().morePostsError) {
                getMorePosts();
                el.removeEventListener('scroll', scrollHandler);
            }
        }, 200);
    }
    el.addEventListener('scroll', scrollHandler);

    return el;
}

subscribe('main', Main, ['postsLoading', 'posts', 'getPostsError', 'loggedInUser', 'morePostsLoading'], ['scrollTop']);

export default Main;