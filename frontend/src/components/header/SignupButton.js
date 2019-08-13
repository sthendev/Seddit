import { button } from '../../utils/elements.js';
import { openModal } from '../modal/Modal.js';
import SignupForm from '../forms/signup-form/SignupForm.js';
import { getState, setState } from '../../state/state.js';

const SignupButton = () => {
    const el = button({
        classes: ['button', 'button-secondary'], 
        text: 'Sign Up', 
        data: 'id-signup'
    });

    el.addEventListener('click', () => {
        if (getState().modalOpen) return;
        openModal(SignupForm);
    });

    return el;
}



export default SignupButton;