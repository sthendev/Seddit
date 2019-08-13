import { button } from '../../utils/elements.js';
import { openModal } from '../modal/Modal.js';
import LoginForm from '../forms/login-form/LoginForm.js';
import { getState } from '../../state/state.js';

const LoginButton = () => {
    const el = button({
        classes: ['button', 'button-primary'], 
        text: 'Log In',
        data: 'id-login'
    });

    el.addEventListener('click', () => {
        if (getState().modalOpen) return;
        openModal(LoginForm);
    });

    return el;
}

export default LoginButton;