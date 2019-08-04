import { button } from '../../utils/elements.js';

const SubmitButton = ({text}) => {
    const el = button({id: 'submit-button', classes: ['button', 'button-secondary'], type: 'submit', text: text});

    return el;
}

export default SubmitButton;