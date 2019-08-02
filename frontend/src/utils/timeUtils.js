const ONE_YEAR = 31556926000;
const ONE_DAY = 86400000;
const ONE_HOUR = 3600000;
const ONE_MINUTE = 60000;

export const getTimeLapsedString = (now, then) => {
    const difference = now.getTime() - then.getTime();

    if (difference < ONE_MINUTE) {
        return 'just now';
    }
    if (difference < ONE_HOUR) {
        const minutes = Math.floor(difference/ONE_MINUTE);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (difference < ONE_DAY) {
        const hours = Math.floor(difference/ONE_HOUR);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (difference < ONE_YEAR && now.getMonth() === then.getMonth()) {
        const days = Math.floor(difference/ONE_DAY);
        if (days === 1) {
            return 'yesterday';
        } else {
            return `${days} days ago`;
        }
    }
    if (difference < ONE_YEAR && now.getMonth() !== then.getMonth()) {
        const months = now.getMonth() < then.getMonth()
            ? now.getMonth() - then.getMonth() + 11
            : now.getMonth() - then.getMonth();
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }

    const years = Math.floor(difference/ONE_YEAR);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
} 