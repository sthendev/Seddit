import { p } from '../../utils/elements.js';
import PostForm from '../forms/post-form/PostForm.js';
import { getState } from '../../state/state.js';

const EditLink = () => {
    if (!getState().loggedInUsername
        || getState().postDetails.meta.author !== getState().loggedInUsername) {
        return null;
    }
    const el = p({
        classes: ['edit-link'],
        text: 'edit post'
    });

    el.addEventListener('click', () => {
        const modalContent = document.getElementById('modal-content');
        modalContent.firstChild.remove();
        modalContent.prepend(PostForm(true));
        document.getElementById('main').style.overflow = 'hidden';
    });

    return el;
}

export default EditLink;