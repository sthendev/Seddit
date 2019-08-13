import { div, p } from '../../utils/elements.js';
import { truncNum } from '../../utils/formatUtils.js';
import { getState, setState, subscribe } from '../../state/state.js';
import { upvote } from '../../actions/postActions.js';

const OpenPostVoter = () => {
    const postMetaDetails = getState().postDetails.meta;
    const loggedInUsername = getState().loggedInUsername;
    const numUpvotes = postMetaDetails.upvotes.length;

    const upvoteClasses = ['upvote-icon'];

    loggedInUsername &&
    postMetaDetails.author !== loggedInUsername &&
    upvoteClasses.push('hover-enabled');

    const existingVotes = new Set(postMetaDetails.upvotes);
    existingVotes.has(loggedInUsername) &&
    upvoteClasses.push('upvoted')

    const upvoteIcon = div({classes: upvoteClasses},
        div({classes: ['arrow-up']}),
        div({classes: ['upvote-icon-box']})
    );

    const el = div({id: 'open-post-voter', classes: ['vote']},
        div({classes: ['voter']},
            upvoteIcon,
            p({
                text: `${truncNum(numUpvotes)}`
            })
        )
    );

    upvoteIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        const postMetaDetails = getState().postDetails.meta;
        const loggedInUsername = getState().loggedInUsername;

        if (!loggedInUsername
            || postMetaDetails.author === loggedInUsername) {
            return;
        }

        const existingVotes = new Set(postMetaDetails.upvotes);
        const isUpvote = !existingVotes.has(loggedInUsername);
        const updatedPostDetails = {...getState().postDetails}
        if (isUpvote) {
            updatedPostDetails.meta.upvotes.push(loggedInUsername);
        } else {
            updatedPostDetails.meta.upvotes = updatedPostDetails.meta.upvotes.filter(username => username !== loggedInUsername);
        }
        const updatedPosts = [...getState().posts];
        const inPostsIndex = updatedPosts.findIndex(post => post.id === getState().openPostId);

        if (inPostsIndex >= 0) {
            if (isUpvote) {
                updatedPosts[inPostsIndex].meta.upvotes.push(loggedInUsername);
            } else {
                updatedPosts[inPostsIndex].meta.upvotes = updatedPosts[inPostsIndex].meta.upvotes.filter(username => username !== loggedInUsername);
            }
            setState({posts: updatedPosts, postDetails: updatedPostDetails})
        } else {
            setState({postDetails: updatedPostDetails});
        }
        upvote(getState().openPostId, isUpvote);
    });

    return el;
}

subscribe('open-post-voter', OpenPostVoter, ['postDetails']);

export default OpenPostVoter;