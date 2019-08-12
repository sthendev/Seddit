export const element = ({tag, id, classes, text, data}, ...children) => {
    const el = document.createElement(tag);

    if (id !== undefined) {
        el.id = id;
    }

    if (classes !== undefined) {
        classes.forEach(cssClass => {
            el.classList.add(cssClass);
        })
    }

    if (text !== undefined) {
        el.textContent = text
    }

    if (data !== undefined) {
        el.setAttribute(`data-${ data }`, '');
    }

    if (children !== undefined) {
        children.forEach(child => {
            if (child) {
                el.appendChild(child);
            }
        })
    }

    return el;
}

export const header = ({id, classes, data}, ...children) => {
    const el = element({tag: 'header', id: id, classes: classes, data: data}, ...children);

    return el;
}

export const main = ({id, classes, role, data}, ...children) => {
    const el = element({tag: 'main', id: id, classes: classes, role: role, data: data}, ...children);

    if (role !== undefined) {
        el.setAttribute('role', 'main');
    }

    return el;
}

export const ul = ({id, classes, data}, ...children) => {
    const el = element({tag: 'ul', id: id, classes: classes, data: data}, ...children);

    return el;
}

export const li = ({id, classes, data}, ...children) => {
    const el = element({tag: 'li', id: id, classes: classes, data: data}, ...children);

    return el;
}

export const h1 = ({id, classes, text, data}) => {
    const el = element({tag: 'h1', id: id, classes: classes, text: text, data: data});
    
    return el;
}

export const h3 = ({id, classes, text, data}) => {
    const el = element({tag: 'h3', id: id, classes: classes, text: text, data: data});
    
    return el;
}

export const h4 = ({id, classes, text, data}) => {
    const el = element({tag: 'h4', id: id, classes: classes, text: text, data: data});
    
    return el;
}

export const input = ({id, classes, placeholder, type, name, value, data, disabled}) => {
    const el = element({tag: 'input', id: id, classes: classes, data: data});

    if (placeholder !== undefined) {
        el.setAttribute('placeholder', placeholder);
    }

    if (type !== undefined) {
        el.setAttribute('type', type);
    }

    if (name !== undefined) {
        el.setAttribute('name', name);
    }

    if (value !== undefined) {
        el.setAttribute('value', value);
    }

    if (disabled) {
        el.setAttribute('disabled', '');
    }

    return el;
}

export const textarea = ({id, classes, placeholder, name, value, data, disabled}) => {
    const el = element({tag: 'textarea', id: id, classes: classes, data: data});

    if (placeholder !== undefined) {
        el.setAttribute('placeholder', placeholder);
    }

    if (name !== undefined) {
        el.setAttribute('name', name);
    }

    if (value !== undefined) {
        el.textContent = value;
    }

    if (disabled) {
        el.setAttribute('disabled', '');
    }

    return el;
}

export const button = ({id, classes, text, type, data}) => {
    const el = element({tag: 'button', id: id, classes: classes, text: text, data: data});

    if (type !== undefined) {
        el.setAttribute('type', type);
    }

    return el;
}

export const p = ({id, classes, text, data}) => {
    const el = element({tag: 'p', id: id, classes: classes, text: text, data: data})

    return el;
}

export const div = ({id, classes, text, data}, ...children) => {
    const el = element({tag: 'div', id: id, classes: classes, text: text, data: data}, ...children);

    return el;
}

export const form = ({id, classes, name, data}, ...children) => {
    const el = element({tag: 'form', id: id, classes: classes, data: data}, ...children);

    if (name !== undefined) {
        el.setAttribute('name', name);
    }

    return el;
}

export const img = ({id, classes, src, imgData, data}) => {
    const el = element({tag: 'img', id: id, classes: classes, data: data});

    if (imgData !== undefined) {
        el.setAttribute('src', `data:image/png;base64,${imgData}`);
    }

    if (src != undefined) {
        el.setAttribute('src', src);
    }

    return el;
}

export const hr = ({id, classes, data}) => {
    const el = element({tag: 'hr', id: id, classes: classes, data: data});

    return el;
}

export const canvas = ({id, classes, name, data}) => {
    const el = element({tag: 'canvas', id: id, classes: classes, data: data});

    if (name !== undefined) {
        el.setAttribute('name', name);
    }

    return el;
}