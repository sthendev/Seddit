import { div } from '../../utils/elements.js';
import CloseButton from './CloseButton.js';
import { setState } from '../../state/state.js';

export const openModal = (content) => {
    setState({modalOpen: true});
    const modalContent = content();
    document.getElementById('app').appendChild(Modal(modalContent));
    document.getElementById('main').style.overflow = 'hidden';
    modalContent.style.maxHeight = `${window.innerHeight - 50}px`;
}

export const closeModal = () => {
    document.getElementById('modal').remove();
    document.getElementById('main').style.overflow = '';
    setState({modalOpen: false});
}

const Modal = (modalContent) => {
    const content = div({id: 'modal-content'},
        modalContent,
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