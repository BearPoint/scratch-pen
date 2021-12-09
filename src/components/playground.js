import { useEffect, useContext } from 'react';
import { base64ToUtf8, utf8ToBase64} from '../utils/encryption';
import { htmlTemplate } from './../utils/template';
import { EditorComponent } from './editor';
import { useDebounce } from '../hooks';
import './../styles/playground.css';
import { Context } from '../context';
export const PlayGround = (props) => {
    const [context, setContent] = useContext(Context);
    console.log(context);
    useEffect(() => {
        const { pathname } = window.location;
        const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C');
        setContent({
            html: rawHtml?.length ? base64ToUtf8(rawHtml) : '',
            css: rawCss?.length ? base64ToUtf8(rawCss) : '',
            javascript: rawJs?.length ? base64ToUtf8(rawJs) : ''
        });
    }, []);

    useEffect(() => {
        updateUrl()
    },[context])
    
    const onChangedContent = (lang, content) => setContent({ [lang]: content })
    const updateUrl= () => {
        console.log(context)
        const { pathname } = window.location;
        const hashedCode = `${utf8ToBase64(context.html)}|${utf8ToBase64(context.css)}|${utf8ToBase64(context.javascript)}`;
        window.history.replaceState(null, null, `/${hashedCode}`);
    }
    return (
        <div className='playground'>
            <EditorComponent lang={'html'} onChangedContent={onChangedContent} defaultContent={context.html} />
            <EditorComponent lang={'javascript'} onChangedContent={onChangedContent} defaultContent={context.javascript} />
            <EditorComponent lang={'css'} onChangedContent={onChangedContent} defaultContent={context.css} />
            <iframe srcDoc={htmlTemplate(context || {})} title="style"></iframe>
        </div>)
}