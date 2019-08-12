import { p } from '../../utils/elements.js';

const UserLink = (author) => {
    const el = p({
        classes: ['author'],
        text: `u/${author}`,
        data: 'id-author'
    });

    return el;
}

export default UserLink;