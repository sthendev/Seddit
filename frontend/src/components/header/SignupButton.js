import { button } from '../../utils/elements.js';
import Modal from '../modal/Modal.js';
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
        setState({modalOpen: true});
        document.getElementById('app').appendChild(Modal(SignupForm()));
        document.getElementById('main').style.overflow = 'hidden';
    });

    return el;
}



export default SignupButton;