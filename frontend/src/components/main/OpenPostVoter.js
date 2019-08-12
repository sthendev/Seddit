import { div } from '../../utils/elements.js';
import Voter from './Voter.js';
import { getState, subscribe } from '../../state/state.js';

const OpenPostVoter = () => {
    const index = getState().openPostIndex;
    const {meta: {upvotes}} = getState().posts[index];

    const el = div({id: 'open-post-voter', classes: ['vote']},
        Voter(index, upvotes.length)
    );

    return el;
}

subscribe('open-post-voter', OpenPostVoter, ['posts']);

export default OpenPostVoter;