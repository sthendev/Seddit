import { button } from '../../utils/elements.js';
import Modal from '../modal/Modal.js';
import SignupForm from '../forms/LoginForm.js';

const SignupButton = button({
    classes: ['button', 'button-secondary'], 
    text: 'Sign Up', 
    data: 'id-signup'
});

SignupButton.addEventListener('click', () => {
    document.getElementById('root').appendChild(Modal(SignupForm));
    document.body.style.overflow = 'hidden';
});

export default SignupButton;