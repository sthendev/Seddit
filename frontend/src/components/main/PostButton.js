import { button } from '../../utils/elements.js';

const PostButton = () => {
    const el = button({
        classes: ['button', 'button-secondary'],
        text: 'Post'
    });

    return el;
}

export default PostButton;