import './App.css';
import { SideBar, PlayGround } from './components'
import { useDefaultValues, Context } from './context';

const App = () => {

  return (
    <Context.Provider value={useDefaultValues()}>
      <div className="container">
        <SideBar />
        <PlayGround />
      </div>
    </Context.Provider>

  );
}


export default App;
