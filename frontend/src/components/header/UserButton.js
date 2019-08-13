import { button } from '../../utils/elements.js';
import UserPage from '../user/UserPage.js';
import { getState, setState } from '../../state/state.js';
import { openModal } from '../modal/Modal.js';

const UserTitle = () => {
    const el = button({
        id: 'user-button',
        classes: ['button', 'button-secondary'], 
        text: `${getState().loggedInUsername}`
    });

    el.addEventListener('click', () => {
        setState({openUsername: getState().loggedInUsername});
        openModal(UserPage);
    })

    return el;
}

export default UserTitle;