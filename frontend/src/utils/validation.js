export const required = (value) => {
    if (!value) return "required";
    return "";
}

export const allowedCharacters = (value) => {
    if (!/^[a-z0-9_-]*$/i.test(value)) return "letter, numbers, dashes and underscores only";
    return "";
}

export const minLength = (min) => {
    return (value) => {
        if (value.length < min) return `must be at least ${min} characters`;
        return "";
    }
}

export const maxLength = (max) => {
    return (value) => {
        if (value.length > max) return `must be at most ${max} characters`;
        return "";
    }
}

export const passwordMatch = (value, form) => {
    if (value !== form.password.value) return "passwords don't match";
    return "";
}

export const email = (value) => {
    if (value && !/^[a-z0-9]+(\.[a-z0-9]+)*@[a-z0-9]{2,}\.[a-z0-9]{2,}(\.[a-z0-9]{2,})*$/i.test(value)) return "invalid email";
    return "";
}

export const name = (value) => {
    if (value && !/^[a-z0-9'-]+( [a-z0-9'-]+)*$/i.test(value)) return "invalid name";
    return "";
}