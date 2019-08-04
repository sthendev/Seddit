import { div, p } from '../../utils/elements.js';
import { truncNum } from '../../utils/formatUtils.js';
import { getState } from '../../state/state.js';

const CommentButton = (numComments) => {
    const commentClasses = ['comment-button'];
    getState().loggedInUser && commentClasses.push('hover-enabled');

    const el = div({classes: commentClasses},
        div({classes: ['comment-icon']},
            div({classes: ['comment-icon-box']}),
            div({classes: ['arrow-down']})
        ),
        p({
            text: `${truncNum(numComments)} ${numComments === 1 ? 'Comment' : 'Comments'}`
        })
    );

    return el;
}

export default CommentButton;