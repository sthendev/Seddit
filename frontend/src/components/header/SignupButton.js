import { button } from '../../utils/elements.js';

const SignupButton = button({
    classes: ['button', 'button-secondary'], 
    text: 'Sign Up', 
    data: 'id-signup'
});

export default SignupButton;