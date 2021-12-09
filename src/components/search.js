import { getNpmModules } from './../utils/npmEndpoint';
import { useEffect, useState, useRef } from 'react';
import './../styles/search.css';


export const Search = ({isOpen}) => {
    const [query, setQuery] = useState("");
    const InputRef = useRef(null);
    const [modules, setModules] = useState([])

    const clickmoduleHandler = (name) => {

    }
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (query === "") return;
            getNpmModules(query).then((response) => {
                console.log(response);
                setModules(response)
            });
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [query]);
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
                    {modules.map((module, id) => <li key={id} onClick={() => clickmoduleHandler(module.package.name)} ><Item info={module.package} /></li>)}
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