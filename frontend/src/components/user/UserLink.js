import { p } from '../../utils/elements.js';
import UserPage from './UserPage.js';
import { openModal, closeModal } from '../modal/Modal.js';
import { getState, setState } from '../../state/state.js';

const UserLink = (user, disabled) => {
    const userClasses = ['user'];
    disabled && userClasses.push('disabled');

    const el = p({
        classes: userClasses,
        text: `u/${user}`,
        data: 'id-author'
    });

    !disabled && el.addEventListener('click', (event) => {
        event.stopPropagation();
        getState().modalOpen && closeModal();
        setState({openUsername: user});
        openModal(UserPage);
    })

    return el;
}

export default UserLink;