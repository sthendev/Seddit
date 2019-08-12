import { p } from '../../utils/elements.js';
import PostForm from '../forms/post-form/PostForm.js';
import { getState } from '../../state/state.js';

const EditLink = (index) => {
    if (!getState().loggedInUser
        || getState().posts[index].meta.author !== getState().loggedInUser.username) {
        return null;
    }
    const el = p({
        classes: ['edit-link'],
        text: 'edit post'
    });

    el.addEventListener('click', () => {
        const modalContent = document.getElementById('modal-content');
        modalContent.firstChild.remove();
        modalContent.appendChild(PostForm(index));
        const postForm = document.getElementById('post-form');
        if (postForm.scrollHeight > window.innerHeight - 100) {
            document.getElementById('modal').querySelector('#close-button').style.paddingRight = `${25}px`;
        }
        document.getElementById('main').style.overflow = 'hidden';
    });

    return el;
}

export default EditLink;