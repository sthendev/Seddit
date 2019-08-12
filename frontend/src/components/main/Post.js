import { li, div, h4, p, img } from '../../utils/elements.js';
import SubLink from './SubLink.js';
import UserLink from './UserLink.js';
import TimeLapsed from './TimeLapsed.js';
import Space from '../common/Space.js';
import CommentButton from './CommentButton.js';
import Voter from './Voter.js';
import Modal from '../modal/Modal.js';
import OpenPost from './OpenPost.js';
import { getState, setState } from '../../state/state.js';

const Post = ({index, id, clickable, text, title, meta: {author, subseddit, published, upvotes}, image, comments}) => {
    const mounted = document.getElementById(`post-${id}`);
    
    const postClasses = ['post'];
    !mounted && postClasses.push('fade');
    clickable && postClasses.push('post-clickable')

    const publishedTime = parseInt(published);

    const postImage = image 
        ? img({imgData: image, classes: ['post-image']}) 
        : null;

    const el = li({id: `post-${id}`,classes: postClasses, data: 'id-post'},
        div({classes: ['vote'], data: 'id-upvotes'},
            Voter(index, upvotes.length)
        ),
        div({classes: ['content']},
            div({classes: ['post-info']},
                SubLink(subseddit),
                Space(),
                p({
                    text: 'Posted by ',
                }),
                UserLink(author),
                Space(),
                TimeLapsed(publishedTime)
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
            CommentButton(comments.length)
        )
    );

    el.addEventListener('click', () => {
        if (getState().modalOpen) return;
        setState({modalOpen: true, openPostIndex: index});
        document.getElementById('app').appendChild(Modal(OpenPost()));
        if (document.getElementById('open-post').scrollHeight > window.innerHeight - 100) {
            document.getElementById('modal').querySelector('#close-button').style.paddingRight = `${25}px`;
        }
        document.getElementById('main').style.overflow = 'hidden';
    })

    return el;
} 

export default Post;