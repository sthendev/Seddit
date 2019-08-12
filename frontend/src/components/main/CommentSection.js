import { div, p } from '../../utils/elements.js';
import UserLink from './UserLink.js';
import Space from '../common/Space.js';
import TimeLapsed from './TimeLapsed.js';
import CommentBox from '../forms/comment-box/CommentBox.js';
import CommentButton from './CommentButton.js';
import { getState } from '../../state/state.js';

const CommentSection = (postComments) => {
    if (!getState().modalOpen) return null;

    const comments = postComments.map(comment => {
        return div({classes: ['comment']},
            div({classes: ['post-info']},
                UserLink(comment.author),
                Space(),
                TimeLapsed(comment.published)
            ),
            p({
                classes: ['comment-text'],
                text: comment.comment
            })
        )
    })

    const el = div({id: 'comment-section'},
        CommentBox(),
        CommentButton(postComments.length),
        ...comments,
        div({classes: ['space-bottom']})
    );

    return el;
}

export default CommentSection;