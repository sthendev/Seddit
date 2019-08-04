export const get = (string, obj) => {
    const keys = string.split('.');
    let val = obj;
    while (keys.length) {
        val = val[keys.shift()];
    }
    return val;
}

export const set = (string, newVal, obj) => {
    const keys = string.split('.');
    let val = obj;
    while (keys.length > 1) {
        val = val[keys.shift()];
    }
    val[keys.shift()] = newVal;
}