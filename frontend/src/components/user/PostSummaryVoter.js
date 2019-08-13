import { div, p } from '../../utils/elements.js';
import { truncNum } from '../../utils/formatUtils.js';
import { getState } from '../../state/state.js';

const PostSummaryVoter = (upvotes) => {
    const loggedInUsername = getState().loggedInUsername;
    const numUpvotes = upvotes.length;

    const upvoteClasses = ['upvote-icon'];

    const existingVotes = new Set(upvotes);
    existingVotes.has(loggedInUsername) &&
    upvoteClasses.push('upvoted')

    const upvoteIcon = div({classes: upvoteClasses},
        div({classes: ['arrow-up']}),
        div({classes: ['upvote-icon-box']})
    );

    const el = div({classes: ['vote']},
        div({classes: ['voter']},
            upvoteIcon,
            p({
                text: `${truncNum(numUpvotes)}`
            })
        )
    );

    return el;
}

export default PostSummaryVoter;