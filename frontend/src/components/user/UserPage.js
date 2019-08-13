import { div, h3, ul, p } from '../../utils/elements.js';
import Loader from '../loader/Loader.js';
import UserList from './UserList.js';
import PostSummary from './PostSummary.js';
import FollowButton from './FollowButton.js';
import EditProfileButton from './EditProfileButtion.js';
import { getUser, getUsernameFromId } from '../../actions/userActions.js';
import { getPostFromId } from '../../actions/postActions.js';
import delay from '../../utils/delay.js';
import { getState, setState, subscribe } from '../../state/state.js';

const getUserDetails = async (user) => {
    setState({userLoading: true});

    let response = {};
    try {
        getState().extendLoaders && await delay(800);
        response = await getUser(user);
    } catch(error) {
        console.error(error);
        response.hasError = true;
    }

    if (response.hasError) {
        setState({userLoading: false});
        return;
    }

    const userDetails = response.data;

    let followed = false;
    const {data: loggedInUser} = await getUser(getState().loggedInUsername);
    const loggedInFollowing = [];
    for (let userId of loggedInUser.following) {
        const username = await getUsernameFromId(userId);
        loggedInFollowing.push(username);
    }
    const loggedInFollowingSet = new Set(loggedInFollowing);
    if (loggedInFollowingSet.has(user)) {
        followed = true;
    }
    userDetails.followed = followed;

    const following = [];
    for (let userId of userDetails.following) {
        const username = await getUsernameFromId(userId);
        following.push(username);
    }
    userDetails.following = following;

    const posts = [];
    for (let postId of userDetails.posts) {
        const post = await getPostFromId(postId);
        posts.push(post);
    }
    userDetails.posts = posts;

    let totalUpvotes = 0;
    for (let post of userDetails.posts) {
        totalUpvotes += post.meta.upvotes.length;
        const upvoters = [];
        for (let userId of post.meta.upvotes) {
            const username = await getUsernameFromId(userId);
            upvoters.push(username);
        }
        post.meta.upvotes = upvoters
    }
    userDetails.total_upvotes = totalUpvotes;

    setState({userLoading: false, userDetails: userDetails});
}

const UserPage = () => {
    const mounted = document.getElementById('user-page');

    !mounted && getUserDetails(getState().openUsername);

    if (getState().userLoading) {
        return div({id: 'user-page'},
            Loader()
        );
    }

    const userDetails = getState().userDetails;

    let posts = [...userDetails.posts];
    posts.sort((a,b) => parseInt(b.meta.published) - parseInt(a.meta.published));
    posts = posts.map(post => {
        return PostSummary(post);
    })

    if (!posts.length) {
        posts = [p({
            text: 'Nothing to see here...'
        })]
    }

    const el = div({id: 'user-page'},
        div({classes: ['center-content']},
            h3({
                classes: ['user-page-title', 'alt-text'],
                text: userDetails.username
            }),
            div({classes: ['center-content']},
                FollowButton(),
                EditProfileButton()
            ),
            div({classes: ['stats']},
                div({classes: ['stat-box']},
                    div({
                        classes: ['stat-title'],
                        text: 'followers'
                    }),
                    div({
                        classes: ['stat-info'],
                        text: `${userDetails.followed_num}`
                    })
                ),
                div({classes: ['stat-box']},
                    div({
                        classes: ['stat-title'],
                        text: 'following'
                    }),
                    div({
                        classes: ['stat-info'],
                        text: `${userDetails.following.length}`
                    })
                ),
                div({classes: ['stat-box']},
                    div({
                        classes: ['stat-title'],
                        text: 'posts'
                    }),
                    div({
                        classes: ['stat-info'],
                        text: `${userDetails.posts.length}`
                    })
                ),
                div({classes: ['stat-box']},
                    div({
                        classes: ['stat-title'],
                        text: 'upvotes'
                    }),
                    div({
                        classes: ['stat-info'],
                        text: `${userDetails.total_upvotes}`
                    })
                )
            ),
            UserList(userDetails.following, 'following'),
            h3({
                classes: ['user-posts-title', 'alt-text'],
                text: 'Posts:'
            }),
            ul({classes: ['user-posts']},
                ...posts
            )
        )
    )

    return el;
}

subscribe('user-page', UserPage, ['userLoading', 'userDetails'], ['scrollTop', 'style.maxHeight']);

export default UserPage;