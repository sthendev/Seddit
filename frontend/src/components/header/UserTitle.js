import { button } from '../../utils/elements.js';
import { getState } from '../../state/state.js';

const UserTitle = () => {
    const el = button({
        id: 'user-title',
        classes: ['button', 'button-secondary'], 
        text: `${getState().loggedInUser.username}`
    });

    return el;
}

export default UserTitle;