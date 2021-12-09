import Editor from "@monaco-editor/react";
import { useEffect, useState } from 'react'
import { useDebounce } from './../hooks'

export const EditorComponent = ({ lang, changeHandler, defaultContent }) => {
    const [content, setContent] = useState(defaultContent);
    const debouncedContent = useDebounce(content, 500);

    useEffect(() => {
        if (debouncedContent) 
            changeHandler(lang, content);
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
