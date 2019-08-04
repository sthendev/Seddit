import { div, input } from '../../utils/elements.js';

const TextBoxInput = ({id, placeholder, label, type, name, disabled, validation, additionalOnBlur}) => {
    const textInput = input({
        id: id,
        placeholder: placeholder,
        type: type,
        name: name,
        disabled: disabled
    });
    
    const el = div({classes: ['text-input']},
        textInput,
        div({
            classes: ['label'],
            text: label
        })
    );

    textInput.addEventListener('blur', () => {
        if (type !== 'password') textInput.value = textInput.value.trim();

        let validationError = "";

        if (validation) {
            validation.forEach(validation => {
                if (validationError) return;
                validationError = validation(textInput.value, textInput.form);
            })
        }

        if (validationError) {
            const error = textInput.parentNode.querySelector('.error');
            if (error) {
                error.remove();
                textInput.parentNode.appendChild(
                    div({
                        classes: ['error', 'fade'],
                        text: validationError
                    })
                );
            } else {
                textInput.parentNode.appendChild(
                    div({
                        classes: ['error', 'fade'],
                        text: validationError
                    })
                );
            }
            textInput.classList.add('hasError');
        } else {
            const error = textInput.parentNode.querySelector('.error');
            error && textInput.parentNode.removeChild(error);
            textInput.classList.remove('hasError');
        }

        additionalOnBlur && additionalOnBlur();
    })

    return el;
}

export default TextBoxInput;