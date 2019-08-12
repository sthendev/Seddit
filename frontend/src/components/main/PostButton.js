import { button } from '../../utils/elements.js';
import Modal from '../modal/Modal.js';
import PostForm from '../forms/post-form/PostForm.js';
import { getState, setState } from '../../state/state.js';

const PostButton = () => {
    if (!getState().loggedInUser) return null;

    const el = button({
        classes: ['button', 'button-secondary'],
        text: 'Post'
    });

    el.addEventListener('click', () => {
        if (getState().modalOpen) return;
        setState({modalOpen: true});
        document.getElementById('app').appendChild(Modal(PostForm()));
        const postForm = document.getElementById('post-form');
        if (postForm.scrollHeight > window.innerHeight - 100) {
            document.getElementById('modal').querySelector('#close-button').style.paddingRight = `${25}px`;
        }
        document.getElementById('main').style.overflow = 'hidden';
    });

    return el;
}

export default PostButton;