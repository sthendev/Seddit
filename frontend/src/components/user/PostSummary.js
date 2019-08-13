import { li, div, h4, p } from '../../utils/elements.js';
import SubLink from '../main/SubLink.js';
import UserLink from './UserLink.js';
import TimeLapsed from '../main/TimeLapsed.js';
import Space from '../common/Space.js';
import PostSummaryVoter from './PostSummaryVoter.js';
import { openModal, closeModal } from '../modal/Modal.js';
import OpenPost from '../main/OpenPost.js';
import { setState } from '../../state/state.js';

const PostSummary = ({id, title, meta: {author, subseddit, published, upvotes}}) => {
    const publishedTime = parseInt(published);

    const postSummaryClasses = ['post', 'post-clickable'];
    !document.getElementById(`post-summary-${id}`) && postSummaryClasses.push('fade');

    const el = li({id: `post-summary-${id}`, classes: postSummaryClasses},
        PostSummaryVoter(upvotes),
        div({classes: ['content']},
            div({classes: ['post-info']},
                SubLink(subseddit),
                Space(),
                p({
                    text: 'Posted by ',
                }),
                UserLink(author, true),
                Space(),
                TimeLapsed(publishedTime, true)
            ),
            h4({
                classes: ['post-title', 'alt-text'],
                text: title,
                data: 'id-title'
            })
        )
    );

    el.addEventListener('click', () => {
        closeModal();
        setState({openPostId: id});
        openModal(OpenPost);   
    })

    return el;
} 

export default PostSummary;