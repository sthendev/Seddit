import { button } from '../../utils/elements.js';
import Modal from '../modal/Modal.js';
import LoginForm from '../forms/login-form/LoginForm.js';
import Loader from '../loader/Loader.js';

const LoginButton = () => {
    const el = button({
        classes: ['button', 'button-primary'], 
        text: 'Log In',
        data: 'id-login'
    });

    el.addEventListener('click', () => {
        document.getElementById('app').appendChild(Modal(LoginForm()));
        document.body.style.overflow = 'hidden';
    });

    return el;
}

export default LoginButton;