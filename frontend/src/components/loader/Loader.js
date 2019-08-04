import { div } from '../../utils/elements.js';

const Loader = () => {
    const el = div({classes: ['loader', 'fade']},
        div({classes: ['dots']},
            div({classes: ['loader-dot', 'first']}),
            div({classes: ['loader-dot', 'second']}),
            div({classes: ['loader-dot', 'third']})
        )
    );

    return el;
}

export default Loader;