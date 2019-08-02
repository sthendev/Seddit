import { div } from '../../utils/elements.js';
import CloseButton from './CloseButton.js';

const Modal = (form) => {
    const el = div({id: 'modal'},
        div({id: 'modal-content'},
            form,
            CloseButton()
        )
    );

    el.addEventListener('click', (event) => {
        if (event.target !== el) return;
        el.remove();
        document.body.style.overflow = '';
    });
    
    return el;
}



export default Modal;