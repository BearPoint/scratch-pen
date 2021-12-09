import Editor from "@monaco-editor/react";
import { useEffect, useState } from 'react'
import { useDebounce } from './../hooks'

export const EditorComponent = ({ lang, defaultContent, onChangedContent }) => {

    const [content, setContent] = useState(defaultContent);
    const debouncedContent = useDebounce(content, 500);
    useEffect(() => {
        console.log('rerender')
        setContent(defaultContent);
    }, [defaultContent])

    useEffect(() => {
        if (debouncedContent)
            onChangedContent(lang, debouncedContent)
    }, [debouncedContent]);

    return <Editor
        width="100%"
        height="100%"
        theme="vs-dark"
        defaultLanguage={lang}
        defaultValue={content}
        onChange={(value) => {
            setContent(value);
        }}
    />
}
