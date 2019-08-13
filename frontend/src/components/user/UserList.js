import { div, p } from '../../utils/elements.js';
import UserLink from './UserLink.js';
import Space from '../common/Space.js';
import { getState } from '../../state/state.js';

const UserList = (users, label) => {
    if (!getState().modalOpen || !getState().loggedInUsername) return null;
    
    const userLinks = users.map(user => {
        return UserLink(user);
    });

    const el = div({classes: ['users']},
        p({
            classes: ['users-label'],
            text: `${label}:`
        }),
        Space(),
        div({classes: ['users-list']},
            ...userLinks
        )
    );

    return el;
}

export default UserList;