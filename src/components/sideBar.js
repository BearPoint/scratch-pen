import '../styles/sidebar.css';
import CodeFile from './../assets/file-code-solid.svg';
import npmLogo from './../assets/npm-brands.svg';
import clipboard from './../assets/share-solid.svg'
import { Search } from './search'
import { useToggle } from '../hooks/useToggle.js';


export const SideBar = () => {
    const [isSearchOpen, searchToggle] = useToggle(false);
    const clipboardHandler = async (clickmoduleHandler) => {
        await navigator.clipboard.writeText(document.URL)
    }

    const cLoseExtensions = () => {
        searchToggle(false)
    }

    return (
        <>
            <div className="sidebar">
                <ul>
                    <li><img src={CodeFile} className="sidebar-icon" alt="code file"  onClick={cLoseExtensions}/></li>
                    <li><img src={npmLogo} className="sidebar-icon" alt="npm dependencies" onClick={searchToggle}/></li>
                    <li><img src={clipboard} className="sidebar-icon" onClick={clipboardHandler}  alt="clipboard code"  /></li>
                </ul>
                <Search isOpen={isSearchOpen} />
            </div>
        </>)
}
