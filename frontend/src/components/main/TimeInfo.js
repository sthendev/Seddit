import { div, p } from '../../utils/elements.js';

const TimeInfo = (time) => {
    const dateTime = new Date(parseInt(time)*1000);
    const el = div({classes: ['tool-tip']},
        div({classes: ['arrow-left']}),
        div({classes: ['time-info']},
            p({
                text: `${dateTime.toDateString()} ${dateTime.toTimeString()}`
            })
        )
    )

    return el;
}

export default TimeInfo;