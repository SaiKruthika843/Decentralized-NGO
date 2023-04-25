import React from 'react';
import { useState } from 'react';
import { useEth } from './contexts/EthContext';

import "./Homepage.css"
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
    const[amt,setAmt]=useState(0);
    const[addr,setAddr]=useState("");
    const { state: { contract, accounts } } = useEth();

    const submit=async()=>{
      console.log(contract)
       const output= await contract.methods.sendEth().send({
        from:accounts[0],
        value:parseInt(amt),
        gas:470000,
        gasPrice:0

       }).catch((e)=>alert("Invalid donation, kindly make sure that the amount is greater than 0"))
       
       if(!output){
        alert("Donation successful")
       }
       
    }

    return (
        <div className="form-inner">
                <h1>Enter your Details:</h1><br />
                
                    <br/>
        <label>
                            Amount you wish to donate:(in ETH):
                            
                         
                <input
        type="text"
        name="wallet address"
        value={amt}
        onChange={e => setAmt(e.target.value)}
        placeholder="in ETH"
        required
      />
        </label>
        
                    <div>
                        <button class="addStudent" onClick={submit}> Donate! </button>
                        
                    </div>
                    </div>
    );
};

export default Home;