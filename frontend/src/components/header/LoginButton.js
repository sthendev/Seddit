import { button } from '../../utils/elements.js';

const LoginButton = button({
    classes: ['button', 'button-primary'], 
    text: 'Log In',
    data: 'id-login'
});

export default LoginButton;