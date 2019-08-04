import { p } from '../../utils/elements.js';
import { getTimeLapsedString } from '../../utils/formatUtils.js';
import TimeInfo from './TimeInfo.js';

const TimeLapsed = (time) => {
    const timeLapsed = getTimeLapsedString(new Date(), new Date(parseInt(time)));

    const el = p({
        classes: ['time-lapsed'],
        text: ` ${timeLapsed}`
    });

    const timeInfo = TimeInfo(time);
    el.addEventListener('mouseenter', () => {
        el.appendChild(timeInfo);
    });
    el.addEventListener('mouseleave', () => {
        el.removeChild(timeInfo);
    });

    return el;
}

export default TimeLapsed;