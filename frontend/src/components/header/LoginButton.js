import { button } from '../../utils/elements.js';
import Modal from '../modal/Modal.js';
import LoginForm from '../forms/login-form/LoginForm.js';
import { getState, setState } from '../../state/state.js';

const LoginButton = () => {
    const el = button({
        classes: ['button', 'button-primary'], 
        text: 'Log In',
        data: 'id-login'
    });

    el.addEventListener('click', () => {
        if (getState().modalOpen) return;
        document.getElementById('app').appendChild(Modal(LoginForm()));
        document.body.style.overflow = 'hidden';
        setState({modalOpen: true});

    });

    return el;
}

export default LoginButton;