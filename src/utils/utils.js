import { utf8ToBase64 } from './encryption'

const CDN_URL = 'https://cdn.skypack.dev';

export const updateUrl = (context) => {
    const { html, css, javascript } = context
    const hashedCode = `${utf8ToBase64(html)}|${utf8ToBase64(css)}|${utf8ToBase64(javascript)}`;
    window.history.replaceState(null, null, `/${hashedCode}`);
}

export const getUrlValues = () => {
    const { pathname } = window.location;
    return pathname.slice(1).split('%7C');
}

export const createImportStatement = (name) => {
    const url = `${CDN_URL}/${name}`;
    return `import ${capitalize(name)} from '${url}';\n`;
}
const capitalize = (str) => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
}