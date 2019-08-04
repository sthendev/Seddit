import { div, p } from '../../utils/elements.js';
import { truncNum } from '../../utils/formatUtils.js';
import { getState } from '../../state/state.js';

const Voter = (postIndex, numUpvotes) => {
    const upvoteClasses = ['upvote-icon'];
    getState().loggedInUser && upvoteClasses.push('hover-enabled');

    const el = div({classes: ['voter']},
        div({classes: upvoteClasses},
            div({classes: ['arrow-up']}),
            div({classes: ['upvote-icon-box']})
        ),
        p({
            text: `${truncNum(numUpvotes)}`
        })
    );

    return el;
}

export default Voter;