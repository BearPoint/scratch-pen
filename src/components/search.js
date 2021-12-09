import { getNpmModules } from './../utils/npmEndpoint';
import { base64ToUtf8, utf8ToBase64 } from './../utils/encryption'
import { useEffect, useState, useRef,useContext } from 'react';
import { useDebounce } from './../hooks'
import './../styles/search.css';
import { Context } from '../context';

const CDN_URL = 'https://cdn.skypack.dev';
export const Search = ({ isOpen }) => {
    const [, setContent] = useContext(Context);
    const [query, setQuery] = useState("");
    const InputRef = useRef(null);
    const [modules, setModules] = useState([])

    const debouncedContent = useDebounce(query, 500);
    const clickModuleHandler = (name) => {
        const url = `${CDN_URL}/${name}`;
        const importStatement = `import ${capitalize(name)} from '${url}';\n`;
        const { pathname } = window.location;
        const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C');
        const addLib = importStatement + base64ToUtf8(rawJs);
        const hashedCode = `${rawHtml}|${rawCss}|${utf8ToBase64(addLib)}`;
        window.history.replaceState(null, null, `/${hashedCode}`);
        console.log('url',addLib)
        setContent({javascript: addLib})

    }

    const capitalize = (str) => {
        return str
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('')
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