import React from 'react';
import { useState } from 'react';
import { useEth } from './contexts/EthContext';


import "./Homepage.css"
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
    const[amt,setAmt]=useState(0);
    const[addr,setAddr]=useState("");
    const[bal,setBal]=useState(0);
    const { state: { contract, accounts,web3 } } = useEth();
console.log(contract)
    
    const submit=async()=>{
      web3.eth.getBlock('latest').then((o)=>console.log(o))
      console.log(contract)
     
       const output= await contract.methods.sendEth(1).send({
        from:accounts[0],
        value:parseInt(amt),
        gas:470000,
        gasPrice:0

       }).then(()=>{
        contract.methods.getContractBalance().call({from:accounts[0]}).then((bl)=>{
          setBal(bl)
          console.log(bl)})
       }).catch((e)=>alert("Invalid donation, kindly make sure that the amount is greater than 0"))
       
       
       
    }

    return (
      <>
      
      
      <h4 className="heading">Hope Charity Foundation</h4>
      <div className="content"><p>The NGO can make a request to the smart contract for withdrawal of money by adding a request below. The stakeholders(i.e only those who have made a donation till now) are allowed to vote for a particular request.If more than 50% of the stakeholders vote for the withdrawal request, the request is approved by the smart contract and the amount is transferred to the receipient, else the request stands void</p></div>
        <div className="form-inner ">
                <h1 className="head">Make Donation:</h1><br />
                <div>
                 <label className='cont'>   
        
                       <h1> Amount you wish to donate:(in wei):</h1>    
                            
                         
                <input
        type="text"
        name="wallet address"
        value={amt}
        onChange={e => setAmt(e.target.value)}
        placeholder="in wei"
        required
      /></label></div>
      {bal!=0 && <h1>Total contract balance:{bal}</h1>}
      
        
        
                    <div>
                        <button class="button-29" onClick={submit}> Donate! </button>
                        
                    </div>
                    </div> </>
    );
   
};

export default Home;