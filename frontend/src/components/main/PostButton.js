import { button } from '../../utils/elements.js';
import { openModal } from '../modal/Modal.js';
import PostForm from '../forms/post-form/PostForm.js';
import { getState } from '../../state/state.js';

const PostButton = () => {
    if (!getState().loggedInUsername || getState().searchResults) return null;

    const el = button({
        classes: ['button', 'button-secondary'],
        text: 'Post'
    });

    el.addEventListener('click', () => {
        if (getState().modalOpen) return;
        openModal(PostForm);
    });

    return el;
}

export default PostButton;