import { div, p } from '../../utils/elements.js';
import UserLink from './UserLink.js';
import Space from '../common/Space.js';
import { getState } from '../../state/state.js';

const UpvotersList = (upvoterIds) => {
    if (!getState().modalOpen || !getState().loggedInUser) return null;

    const upvoterNames = upvoterIds.map(upvoter => {
        return UserLink(upvoter);
    })

    const el = div({id: 'upvoters'},
        p({
            classes: ['upvoters-label'],
            text: 'upvoters:'
        }),
        Space(),
        div({classes: ['upvoters-list']},
            ...upvoterNames
        )
    );

    return el;
}

export default UpvotersList;