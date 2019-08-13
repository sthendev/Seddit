import { div } from '../../utils/elements.js';
import { closeModal } from '../modal/Modal.js';

const CloseButton = () => {
    const el = div({id: 'close-button', text: '\u00D7'});

    el.addEventListener('click', () => {
        closeModal();
    });

    return el;
}

export default CloseButton;