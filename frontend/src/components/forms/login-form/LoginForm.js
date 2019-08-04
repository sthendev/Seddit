import { form, input, h3, div } from '../../../utils/elements.js';
import { login } from '../../../actions/authActions.js';
import { saveToken } from '../../../api/initApi.js';
import { getState, setState, subscribe } from '../../../state/state.js';
import * as validation from '../../../utils/validation.js';
import TextBoxInput from '../../common/TextBoxInput.js';
import SubmitButton from '../../common/SubmitButton.js';
import Loader from '../../loader/Loader.js';

const performLogin = async () => {
    const form = document.loginForm;

    const inputs = Array.from(form.getElementsByTagName('input'));
    inputs.forEach(input => input.dispatchEvent(new Event('blur')))

    if (form.querySelector('.error')) return;

    const payload = {
        username: form.username.value,
        password: form.password.value
    }
    
    setState({loginLoading: true});

    let response = {};
    try {
        response = await login(payload);
    } catch {
        response.hasError = true;
    }
    
    if (response.hasError) {
        setState({loginLoading: false});
        if (typeof(response.data) !== 'undefined') {
            document.loginForm.querySelector('#submit-error').textContent = response.data;
        }
    } else {
        saveToken(response.data);
        document.getElementById('modal').remove();
        document.body.style.overflow = '';
        location.reload();
    }
}

const LoginForm = () => {
    let bottomContent;
    if (getState().loginLoading) {
        bottomContent = Loader();
    } else {
        bottomContent = SubmitButton({text: 'Log In'});
    }

    const el = form({id: 'login-form', name: 'loginForm'},
        div({classes: ['center-content']},
            h3({classes: ['form-title', 'alt-text'], text: 'Log In'})
        ),
        div({classes: ['center-content']},
            TextBoxInput({
                id: 'username',
                placeholder: 'username',
                type: 'text',
                name: 'username',
                disabled: getState().loginLoading,
                validation: [validation.required]
            })
        ),
        div({classes: ['center-content']},
            TextBoxInput({
                id: 'password',
                placeholder: 'password',
                type: 'password',
                name: 'password',
                disabled: getState().loginLoading,
                validation: [validation.required]
            })
        ),
        div({classes: ['center-content']},
            div({
                id: 'submit-error'
            })
        ),
        div({classes: ['center-content']},
            bottomContent
        )
    );



    el.addEventListener('submit', (event) => {
        event.preventDefault();
        performLogin();
    });

    return el;
}

subscribe('login-form', LoginForm, ['loginLoading'], ['username.value', 'password.value']);

export default LoginForm;