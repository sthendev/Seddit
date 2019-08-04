import { p } from '../../utils/elements.js';

const SubLink = (subseddit) => {
    const el = p({
        classes: ['post-subseddit'],
        text: `s/${subseddit}`
    });

    return el;
} 

export default SubLink;