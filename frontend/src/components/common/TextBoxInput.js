import { div, input, p } from '../../utils/elements.js';

const TextBoxInput = ({id, placeholder, label, type, name, value, preText, disabled, validation, additionalOnBlur}) => {
    const textInput = input({
        id: id,
        placeholder: placeholder,
        type: type,
        name: name,
        disabled: disabled,
        value: value
    });
    
    const el = div({classes: ['text-input']},
        textInput,
        div({
            classes: ['label'],
            text: label
        }),
        p({
            classes: ['pre-text'],
            text: preText
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

    textInput.addEventListener('input', () => {
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
                        classes: ['error'],
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
    })

    return el;
}

export default TextBoxInput;