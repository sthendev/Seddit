import { div } from '../../utils/elements.js';

const CloseButton = () => {
    const el = div({id: 'close-button', text: '\u00D7'});

    el.addEventListener('click', (event) => {
        document.getElementById('modal').remove();
        document.body.style.overflow = '';
    });

    return el;
}

export default CloseButton;