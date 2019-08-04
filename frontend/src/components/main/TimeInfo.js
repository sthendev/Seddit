import { div, p } from '../../utils/elements.js';

const TimeInfo = (time) => {
    const dateTime = new Date(time);
    const el = div({classes: ['tool-tip']},
        div({classes: ['time-info']},
            p({
                text: `${dateTime.toDateString()} ${dateTime.toTimeString()}`
            })
        ),
        div({classes: ['arrow-down']})
    )

    return el;
}

export default TimeInfo;