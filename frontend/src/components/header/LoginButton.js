import { button } from '../../utils/elements.js';
import Modal from '../modal/Modal.js';
import LoginForm from '../forms/LoginForm.js';

const LoginButton = button({
    classes: ['button', 'button-primary'], 
    text: 'Log In',
    data: 'id-login'
});

LoginButton.addEventListener('click', () => {
    document.getElementById('root').appendChild(Modal(LoginForm));
    document.body.style.overflow = 'hidden';
});

export default LoginButton;