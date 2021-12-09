import { useState } from 'react'
import { htmlTemplte } from './../utils/template'
import { EditorComponent } from './editor';
import './../styles/playground.css'
export const PlayGround = (props) => {


    const [content, setContent] = useState({ html: '', css: '', js: '' });

    const changeHandler = (lang, content) => {
        setContent(value => ({
            ...value,
            [lang]: content
        }))
    };

    const editors = [{
        isVisible: true,
        lang: 'html',
        content: '<!-- write your html here. -->\n'
    },
    {
        isVisible: true,
        lang: 'javascript',
        content: '// write your javascript code here\n'
    },
    {
        isVisible: true,
        lang: 'css',
        content: '/* write your css code here*/\n'
    }]

    return (
        <div className={'playground'}>
            {editors.map((editor, id) =>
                <EditorComponent key={id} lang={editor.lang} changeHandler={changeHandler} defaultContent={editor.content} />
            )}
            <iframe srcDoc={htmlTemplte(content)} title="style"></iframe>
        </div>)
}