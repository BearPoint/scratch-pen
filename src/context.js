import { createContext, useState } from 'react'

const defaultValues = {
    html: '',
    javascript: '',
    css: '',
    imports: []
}

export const useDefaultValues = () => {
    const [state, setState] = useState(defaultValues);
    const setContent = (content) => {
        setState(val => ({
            ...val,
            ...content
        }))
    }
    return [state, setContent]
}

export const Context = createContext(
    defaultValues
);

