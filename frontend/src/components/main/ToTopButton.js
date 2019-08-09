import { button } from '../../utils/elements.js';

const ToTopButton = () => {
    const el = button({
        id: 'to-top-button',
        classes: ['button', 'button-primary', 'fade'],
        text: 'Back to top'
    });

    const feedRight = document.getElementById('feed').getBoundingClientRect().right;
    el.style.left = `${feedRight + 10}px`;
    if (window.innerWidth < 1078) el.style.display = 'none';

    el.addEventListener('click', () => {
        document.getElementById('main').scrollTo({top: 0, behavior: 'smooth'});
    })

    return el;
}

export default ToTopButton;