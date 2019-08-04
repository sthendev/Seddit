import { form, input, h3, div } from '../../../utils/elements.js';
import { signup } from '../../../actions/authActions.js';
import { saveToken } from '../../../api/initApi.js';
import { getState, setState, subscribe } from '../../../state/state.js';
import * as validation from '../../../utils/validation.js';
import TextBoxInput from '../../common/TextBoxInput.js';
import SubmitButton from '../../common/SubmitButton.js';
import Loader from '../../loader/Loader.js';

const performSignup = async () => {
    const form = document.signupForm;

    const inputs = Array.from(form.getElementsByTagName('input'));
    inputs.forEach(input => input.dispatchEvent(new Event('blur')))

    if (form.querySelector('.error')) return;

    const payload = {
        username: form.username.value,
        password: form.password.value,
        email: form.email.value,
        name: form.name.value
    }
    
    setState({loginLoading: true});

    let response = {};
    try {
        response = await signup(payload);
    } catch {
        response.hasError = true;
    }
    
    if (response.hasError) {
        setState({loginLoading: false});
        if (typeof(response.data) !== 'undefined') {
            document.signupForm.querySelector('#submit-error').textContent = response.data;
        }
    } else {
        saveToken(response.data);
        document.getElementById('modal').remove();
        document.body.style.overflow = '';
        location.reload();
    }
}

const SignupForm = () => {
    let bottomContent;
    if (getState().loginLoading) {
        bottomContent = Loader();
    } else {
        bottomContent = SubmitButton({text: 'Sign Up'});
    }

    const el = form({id: 'signup-form', name: 'signupForm'},
        div({classes: ['center-content']},
            h3({classes: ['form-title', 'alt-text'], text: 'Sign Up'})
        ),
        div({classes: ['center-content']},
            TextBoxInput({
                id: 'username',
                placeholder: 'username',
                type: 'text',
                name: 'username',
                disabled: getState().loginLoading,
                validation: [
                    validation.required,
                    validation.allowedCharacters,
                    validation.minLength(3),
                    validation.maxLength(20)]
            })
        ),
        div({classes: ['center-content']},
            TextBoxInput({
                id: 'password',
                placeholder: 'password',
                type: 'password',
                name: 'password',
                disabled: getState().loginLoading,
                validation: [
                    validation.required,
                    validation.minLength(6)
                ],
                additionalOnBlur: () => el.confirmPassword.dispatchEvent(new Event('blur'))
            })
        ),
        div({classes: ['center-content']},
            TextBoxInput({
                id: 'confirm-password',
                placeholder: 'confirm password',
                type: 'password',
                name: 'confirmPassword',
                disabled: getState().loginLoading,
                validation: [validation.passwordMatch]
            })
        ),
        div({classes: ['center-content']},
            TextBoxInput({
                id: 'email',
                placeholder: 'email',
                label: 'optional',
                type: 'text',
                name: 'email',
                disabled: getState().loginLoading,
                validation: [validation.email]
            })
        ),
        div({classes: ['center-content']},
            TextBoxInput({
                id: 'name',
                placeholder: 'name',
                label: 'optional',
                type: 'text',
                name: 'name',
                disabled: getState().loginLoading,
                validation: [validation.name]
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
        performSignup();
    });

    return el;
}

subscribe('signup-form', SignupForm, ['loginLoading'], ['username.value', 'password.value', 'confirmPassword.value', 'email.value', 'name.value']);

export default SignupForm;