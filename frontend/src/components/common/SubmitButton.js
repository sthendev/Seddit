import { button } from '../../utils/elements.js';

const SubmitButton = ({id, text}) => {
    const el = button({id: id, classes: ['button', 'button-secondary'], type: 'submit', text: text});

    return el;
}

export default SubmitButton;