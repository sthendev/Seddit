import { div } from '../../utils/elements.js';
import { setState } from '../../state/state.js';

const CloseButton = () => {
    const el = div({id: 'close-button', text: '\u00D7'});

    el.addEventListener('click', (event) => {
        document.getElementById('modal').remove();
        document.body.style.overflow = '';
        setState({modalOpen: false});
    });

    return el;
}

export default CloseButton;