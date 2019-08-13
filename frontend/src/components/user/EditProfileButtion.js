import { button } from '../../utils/elements.js';
import SignupForm from '../forms/signup-form/SignupForm.js';
import { getState } from '../../state/state.js';

const EditProfileButton = () => {
    if (getState().openUsername !== getState().loggedInUsername) return null;

    const el = button({
        classes: ['button', 'button-secondary'],
        text: 'Edit Profile'
    })

    el.addEventListener('click', () => {
        const modalContent = document.getElementById('modal-content');
        modalContent.firstChild.remove();
        modalContent.prepend(SignupForm(true));
        document.getElementById('main').style.overflow = 'hidden';
    });

    return el;
}

export default EditProfileButton;