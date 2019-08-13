import { div, p } from '../../utils/elements.js';
import { truncNum } from '../../utils/formatUtils.js';
import { getState, setState } from '../../state/state.js';
import { upvote } from '../../actions/postActions.js';

const Voter = (postIndex, numUpvotes) => {
    const postDetails = getState().posts[postIndex].meta;
    const loggedInUsername = getState().loggedInUsername;

    const upvoteClasses = ['upvote-icon'];

    loggedInUsername &&
    postDetails.author !== loggedInUsername &&
    upvoteClasses.push('hover-enabled');

    const existingVotes = new Set(postDetails.upvotes);
    existingVotes.has(loggedInUsername) &&
    upvoteClasses.push('upvoted')

    const upvoteIcon = div({classes: upvoteClasses},
        div({classes: ['arrow-up']}),
        div({classes: ['upvote-icon-box']})
    );

    const el = div({classes: ['voter']},
        upvoteIcon,
        p({
            text: `${truncNum(numUpvotes)}`
        })
    );

    upvoteIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        const postDetails = getState().posts[postIndex].meta;
        const loggedInUsername = getState().loggedInUsername;

        if (!loggedInUsername
            || postDetails.author === loggedInUsername) {
            return;
        }

        const existingVotes = new Set(postDetails.upvotes);

        if (existingVotes.has(loggedInUsername)) {
            const updatedPosts = [...getState().posts];
            updatedPosts[postIndex].meta.upvotes = updatedPosts[postIndex].meta.upvotes.filter(username => username !== loggedInUsername);
            upvote(getState().posts[postIndex].id, false);
            setState({posts: updatedPosts});
        } else {
            const updatedPosts = [...getState().posts];
            updatedPosts[postIndex].meta.upvotes.push(loggedInUsername);
            upvote(getState().posts[postIndex].id, true);
            setState({posts: updatedPosts});
        }
    });

    return el;
}

export default Voter;