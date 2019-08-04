import { div } from '../../utils/elements.js';
import CloseButton from './CloseButton.js';
import { setState } from '../../state/state.js';

const Modal = (form) => {
    const el = div({id: 'modal', classes: ['fade']},
        div({id: 'modal-content'},
            form,
            CloseButton()
        )
    );

    el.addEventListener('click', (event) => {
        if (event.target !== el) return;
        el.remove();
        document.body.style.overflow = '';
        setState({modalOpen: false});
    });
    
    return el;
}



export default Modal;