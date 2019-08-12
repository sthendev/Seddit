import { div, h4, p, img } from '../../utils/elements.js';
import SubLink from './SubLink.js';
import Space from '../common/Space.js';
import UserLink from './UserLink.js';
import EditLink from './EditLink.js';
import TimeLapsed from './TimeLapsed.js';
import UpvotersList from './UpvotersList.js';
import CommentSection from './CommentSection.js';
import { getState, subscribe } from '../../state/state.js';

const OpenPostContent = () => {
    const index = getState().openPostIndex;
    const {text, title, meta: {author, subseddit, published, upvotes}, image, comments} = getState().posts[index];

    const publishedTime = parseInt(published);

    const postImage = image 
        ? img({imgData: image, classes: ['post-image']}) 
        : null;

    const el = div({id: 'open-post-content', classes: ['content']},
        div({classes: ['post-info']},
            SubLink(subseddit),
            Space(),
            p({
                text: 'Posted by ',
            }),
            UserLink(author),
            Space(),
            TimeLapsed(publishedTime),
            Space(),
            EditLink(index)
        ),
        h4({
            classes: ['post-title', 'alt-text'],
            text: title,
            data: 'id-title'
        }),
        p({
            classes: ['post-text'],
            text: text,
            data: 'id-text'
        }),
        postImage,
        UpvotersList(upvotes),
        CommentSection(comments)
    )
    
    return el;
}

subscribe('open-post-content', OpenPostContent, ['posts'], ['scrollTop']);

export default OpenPostContent;