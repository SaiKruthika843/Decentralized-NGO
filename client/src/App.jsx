import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./Sidebar";

import "./App.css";
import Home from "./Home";
import Requests from "./Requests";
import Transactions from "./Transactions";

function App() {

  return (
    <>
    
    <EthProvider>        
      <Home />   <br/>  
      <Requests /><br />
      <Transactions />
    </EthProvider>   
        
    </>
    
  );
}

export default App;
