import { button } from '../../utils/elements.js';
import Modal from '../modal/Modal.js';
import SignupForm from '../forms/signup-form/SignupForm.js';

const SignupButton = () => {
    const el = button({
        classes: ['button', 'button-secondary'], 
        text: 'Sign Up', 
        data: 'id-signup'
    });

    el.addEventListener('click', () => {
        // document.getElementById('app').appendChild(Modal(SignupForm()));
        // document.body.style.overflow = 'hidden';
    });

    return el;
}



export default SignupButton;