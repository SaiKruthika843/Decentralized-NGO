import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./Sidebar";

import "./App.css";
import Home from "./Home";
import Requests from "./Requests";

function App() {

  return (
    <>
    
    <EthProvider>        
      <Home />      
      <Requests />
    </EthProvider>   
        
    </>
    
  );
}

export default App;
