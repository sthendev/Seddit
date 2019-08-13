import { p } from '../../utils/elements.js';
import { getTimeLapsedString } from '../../utils/formatUtils.js';
import TimeInfo from './TimeInfo.js';

const TimeLapsed = (time, disabled) => {
    const timeLapsed = getTimeLapsedString(new Date(), new Date(parseInt(time)*1000));

    const timeClasses = ['time-lapsed'];
    disabled && timeClasses.push('disabled');

    const el = p({
        classes: timeClasses,
        text: ` ${timeLapsed}`
    });

    if (!disabled) {
        const timeInfo = TimeInfo(time);
        el.addEventListener('mouseenter', () => {
            el.appendChild(timeInfo);
        });
        el.addEventListener('mouseleave', () => {
            el.removeChild(timeInfo);
        });
    }

    return el;
}

export default TimeLapsed;