import { getUrlValues, updateUrl,createImportStatement } from '../utils/utils';
import { base64ToUtf8, utf8ToBase64 } from './../utils/encryption'
import { useEffect, useState, useRef,useContext } from 'react';
import { getNpmModules } from './../utils/npmEndpoint';
import { useDebounce } from './../hooks'
import { Context } from '../context';
import './../styles/search.css';

export const Search = ({ isOpen }) => {
    const [, setContent] = useContext(Context);
    const [query, setQuery] = useState("");
    const InputRef = useRef(null);
    const [modules, setModules] = useState([])

    const debouncedContent = useDebounce(query, 500);
    const clickModuleHandler = (name) => {
        const [rawHtml, rawCss, rawJs] = getUrlValues();
        const addLib = createImportStatement(name) + base64ToUtf8(rawJs);
        updateUrl({html: rawHtml, css: rawCss, js: utf8ToBase64(addLib)});
        setContent({javascript: addLib})

    }

    useEffect(() => {
        if (!debouncedContent) return;
        getNpmModules(debouncedContent).then((res) => {
            console.log(res);
            if (res.results) { }
            setModules(res?.results)
        });
    }, [debouncedContent]);
    return (
        <div className={isOpen ? "extension open" : "extension"}>
            <div className="search">
                <input
                    value={query}
                    ref={InputRef}
                    onChange={(event) => setQuery(event.target.value)}
                    className={'search-input'}
                />
                <ul className="results">
                    {modules.map((module, id) => <li key={id} onClick={() => clickModuleHandler(module.name)} ><Item info={module} /></li>)}
                </ul>
            </div>
        </div>)
}

const Item = ({ info }) => {
    return (<div className="result-item">
        <div className="item-name">{info.name}</div>
        <div className="item-description">{info.description}</div>
    </div>);
}