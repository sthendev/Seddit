export const get = (string, obj) => {
    const keys = string.split('.');
    let val = obj;
    while (keys.length) {
        if (typeof(val) !== 'object' || val === null) {
            return undefined;
        }
        val = val[keys.shift()];
    }
    return val;
}

export const set = (string, newVal, obj) => {
    const keys = string.split('.');
    let val = obj;
    while (keys.length > 1) {
        if (typeof(val) !== 'object' || val === null) {
            return;
        }
        val = val[keys.shift()];
    }
    val[keys.shift()] = newVal;
}