import { h1 } from '../../utils/elements.js';

const Logo = () => {
    const el = h1({
        id: 'logo', 
        classes: ['flex-center'],
        text: 'Seddit'
    });

    el.addEventListener('click', () => {
        document.getElementById('main').scrollTo({top: 0, behavior: 'smooth'});
    })

    return el;
}

export default Logo;