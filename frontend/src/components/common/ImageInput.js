import { div, input } from '../../utils/elements.js';

const ImageInput = ({id, classes, name, label, placeholder, disabled}) => {
    const imgInput = input({
        id: id,
        classes: classes,
        type: 'file',
        name: name,
        placeholder: placeholder,
        disabled: disabled
    });
    imgInput.setAttribute('accept', 'image/png');

    const el = div({classes: ['text-input']},
        imgInput,
        div({
            classes: ['label'],
            text: label
        })
    );

    ['drop', 'dragenter', 'dragover'].forEach(eventType => {
        imgInput.addEventListener(eventType, (event) => {
            event.preventDefault();
            event.preventPropagation();
        })
    });

    return el;
}

export default ImageInput;