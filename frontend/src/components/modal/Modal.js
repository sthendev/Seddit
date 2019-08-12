import { div } from '../../utils/elements.js';
import CloseButton from './CloseButton.js';
import { setState } from '../../state/state.js';

const Modal = (form) => {
    const content = div({id: 'modal-content'},
        form,
        CloseButton()
    );

    const el = div({id: 'modal', classes: ['fade']},
        content
    );

    content.style.maxHeight = `${window.innerHeight-50}px`;
    content.style.overflow = 'hidden';
    content.style.transform = `translate(-50%, -${(window.innerHeight-50)/2}px)`;
    
    return el;
}



export default Modal;