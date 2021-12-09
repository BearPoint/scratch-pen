import { useEffect, useContext } from 'react';
import { base64ToUtf8 } from '../utils/encryption';
import { htmlTemplate } from './../utils/template';
import { EditorComponent } from './editor';
import { getUrlValues, updateUrl } from '../utils/utils';

import './../styles/playground.css';
import { Context } from '../context';
export const PlayGround = (props) => {
    const [context, setContent] = useContext(Context);
    
    useEffect(() => {
        const [rawHtml, rawCss, rawJs] = getUrlValues();
        setContent({
            html: rawHtml?.length ? base64ToUtf8(rawHtml) : '',
            css: rawCss?.length ? base64ToUtf8(rawCss) : '',
            javascript: rawJs?.length ? base64ToUtf8(rawJs) : ''
        });
    }, []);

    useEffect(() => {
        updateUrl(context)
    }, [context])

    const onChangedContent = (lang, content) => setContent({ [lang]: content })

    return (
        <div className='playground'>
            <EditorComponent lang={'html'} onChangedContent={onChangedContent} defaultContent={context.html} />
            <EditorComponent lang={'javascript'} onChangedContent={onChangedContent} defaultContent={context.javascript} />
            <EditorComponent lang={'css'} onChangedContent={onChangedContent} defaultContent={context.css} />
            <iframe srcDoc={htmlTemplate(context || {})} title="style"></iframe>
        </div>)
}