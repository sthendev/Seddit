import { button } from '../../utils/elements.js';
import { getState } from '../../state/state.js';
import { clearToken } from '../../api/initApi.js';

const LogoutButton = () => {
    if (getState().openUsername !== getState().loggedInUsername) return null;

    const el = button({
        id: 'logout',
        classes: ['button', 'button-secondary'],
        text: 'Log Out'
    })

    el.addEventListener('click', () => {
        clearToken();
        location.reload();
    });

    return el;
}

export default LogoutButton;