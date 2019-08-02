import { form, input, h3, div } from '../../../utils/elements.js';
import { login } from '../../../actions/authActions.js';
import { saveToken } from '../../../api/initApi.js';
import SubmitButton from '../../common/SubmitButton.js';
import Loader from '../../loader/Loader.js';

const LoginForm = () => {
    const el = form({id: 'login-form', name: 'loginForm'},
        div({classes: ['center-content']},
            h3({classes: ['form-title', 'alt-text'], text: 'Log In'})
        ),
        div({classes: ['center-content']},
            input({id: 'username', placeholder: 'username', type: 'text', name: 'username'})
        ),
        div({classes: ['center-content']},
            input({id: 'password', placeholder: 'password', type: 'password', name: 'password'}),
        ),
        div({classes: ['center-content']},
            div({id: 'login-error'})
        ),
        div({classes: ['center-content']},
            SubmitButton({id: 'login-form-submit', text: 'Log In'})
        )
    );

    el.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const payload = {
            username: el.username.value,
            password: el.password.value
        }
        
        const myLoader = Loader();
        myLoader.style.height = '50px';
        const originalLoginButton = el.querySelector('#login-form-submit');
        const inputs = el.getElementsByTagName('input');

        originalLoginButton.replaceWith(myLoader);
        for (let element of inputs) {
            element.setAttribute('disabled', '');
        }
        el.querySelector('#login-error').textContent = '';

        let response = {};
        
        try {
            response = await login(payload);
        } catch {
            response.hasError = true;
        }
        
        if (response.hasError) {
            myLoader.replaceWith(originalLoginButton);
            for (let element of inputs) {
                element.removeAttribute('disabled');
            }
            typeof(response.data) !== "undefined"
                ? el.querySelector('#login-error').textContent = response.data
                : el.querySelector('#login-error').textContent = 'Unable to log in at this time';
        } else {
            saveToken(response.data);
            document.getElementById('modal').remove();
            document.body.style.overflow = '';
            location.reload();
        }
    });

    return el;
}




export default LoginForm;