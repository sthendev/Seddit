import { div } from '../../utils/elements.js';

const Modal = (Form) => {
    const el = div({id: 'modal'},
        div({id: 'modal-content'},
            Form
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