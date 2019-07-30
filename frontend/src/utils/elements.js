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
        el.innerText = text
    }

    if (data !== undefined) {
        el.setAttribute(`data-${ data }`, '');
    }

    if (children !== undefined) {
        el.append(...children);
    }

    return el;
}

export const header = ({id, classes}, ...children) => {
    const el = element({tag: 'header', id: id, classes: classes}, ...children);

    return el;
}

export const main = ({id, role}, ...children) => {
    const el = element({tag: 'main'}, ...children);

    el.setAttribute('role', 'main');

    return el;
}

export const ul = ({id, classes, data}, ...children) => {
    const el = element({tag: 'ul', id: id, classes: classes, data: data}, ...children);

    return el;
}

export const li = ({id, classes}, ...children) => {
    const el = element({tag: 'li', classes: classes}, ...children);

    return el;
}

export const h1 = ({id, classes, text}) => {
    const el = element({tag: 'h1', id: id, classes: classes, text: text});
    
    return el;
}

export const h3 = ({id, classes, text}) => {
    const el = element({tag: 'h3', id: id, classes: classes, text: text});
    
    return el;
}

export const h4 = ({id, classes, text}) => {
    const el = element({tag: 'h4', id: id, classes: classes, text: text});
    
    return el;
}

export const input = ({id, classes, placeholder, type, data}) => {
    const el = element({tag: 'input', id: id, classes: classes, data: data});

    el.setAttribute('type', type);
    el.setAttribute('placeholder', placeholder);

    return el;
}

export const button = ({id, classes, text, data}) => {
    const el = element({tag: 'button', classes: classes, text: text, data: data});

    return el;
}

export const p = ({id, classes, text, data}) => {
    const el = element({tag: 'p', classes: classes, text: text, data: data})

    return el;
}

export const div = ({id, classes, text, data}, ...children) => {
    const el = element({tag: 'div', id: id, classes: classes, text: text, data: data}, ...children);

    return el;
}

export const form = ({id}, ...children) => {
    const el = element({tag: 'form', id: id})
}