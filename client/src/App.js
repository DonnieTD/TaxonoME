import React from 'react';

// CSS
import './App.css';

// COMPONENTS
import Entry from './components/Entry';

// Redux
import { Provider} from "react-redux";
import store from "./redux/store";

function App() {
  
  return (
      <Provider store={store}>              
          <div className="App">
                  <Entry/>   
          </div>        
      </Provider>
    );
  }


export default App;



