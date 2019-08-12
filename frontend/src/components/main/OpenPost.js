import { div } from '../../utils/elements.js';
import OpenPostVoter from './OpenPostVoter.js';
import OpenPostContent from './OpenPostContent.js';

const OpenPost = () => {
    const el = div({id: 'open-post', classes: ['post']},
        OpenPostVoter(),
        OpenPostContent()
    );

    el.style.maxHeight = `${window.innerHeight}px`;

    return el;
}

export default OpenPost;