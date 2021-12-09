export const utf8ToBase64 = (text) => {
    return window.btoa(encodeURI(text))
}

export const base64ToUtf8 = (code) => {
    return decodeURI(window.atob(code));
}