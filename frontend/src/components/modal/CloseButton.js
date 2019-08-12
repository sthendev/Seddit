import { div } from '../../utils/elements.js';
import { setState } from '../../state/state.js';

const CloseButton = () => {
    const el = div({id: 'close-button', text: '\u00D7'});

    el.addEventListener('click', () => {
        document.getElementById('modal').remove();
        document.getElementById('main').style.overflow = '';
        setState({modalOpen: false});
    });

    return el;
}

export default CloseButton;