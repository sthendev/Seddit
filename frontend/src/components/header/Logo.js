import { h1 } from '../../utils/elements.js';

const Logo = () => {
    const el = h1({
        id: 'logo', 
        classes: ['flex-center'],
        text: 'Seddit'
    });

    return el;
}

export default Logo;