import React from 'react';
import { useState, useEffect } from 'react';
import { useEth } from './contexts/EthContext';
import Web3 from 'web3';
import "./Homepage.css"
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Requests = () => {
    const[amt,setAmt]=useState(0);
    const[noOfRequests,setNoOfReq]=useState(-1);
    const[addr,setAddr]=useState("");
    const[desc,setDesc]=useState("");
    const[requests,setRequests]=useState([]);
    const { state: { contract, accounts,web3 } } = useEth();
    const admin="0x890cfD372F2A4dA289c90789C47C15223A6DE84C"
    const submit=async()=>{
      const accID=0
      accounts.push(addr);
      accounts[1]=web3.eth.accounts.privateKeyToAccount("6c6a8b7d36d27f1e604d28e26c833c350bf832731145b499bd6f2c9258cc9292")
      console.log(accounts[1].address);
      
      const output= await contract.methods.sendRequests(desc,accounts[0],parseInt(amt)).send({
        from:accounts[0],
        value:parseInt(amt),
        gas:470000,
        gasPrice:0

       }).then((output)=>alert("Request made successfully"))
       .catch((e)=>alert("Invalid request!! Try again!! "))

      
       
    }
    useEffect(() => {
      // action on update of movies
      
     

  }, [noOfRequests]);

    const viewreq=async()=>{
      const out=await contract.methods.
      setRequests([])
      const output1= await contract.methods.numOfRequests().call().then(async(e)=>{
        console.log(e)
        for(let i=0;i<e;i++){
        const output= await contract.methods.requests(e).call().then((x)=>{
          console.log(x)
          setRequests([...requests,x])            
          
        })}
        setNoOfReq(parseInt(e))
        })
        .catch((e)=>console.log(e))
       
    }

    const validate=async(e)=>{
      if(accounts[0]==admin){
        alert("The NGO admin cannot validate a request") 
        return;
      }
      console.log(e.target.id)
       const output=await contract.methods.validateRequest(parseInt(e.target.id)).send({from:accounts[0]})
       .then((x)=>{alert("validated successfully")
       setRequests([])
       viewreq()}).catch((e)=>{
        console.log(e)
        if(e.code==-32603) alert("You must be a donor to validate the request!")
        if(e.code==-3) alert("You must be a donor to validate the request!")
       })
      
    }
    const approve=async(e)=>{
      if(accounts[0]!=admin){
        alert("Only the NGO admin can check the status of the request") 
        return;
      }
      const output=await contract.methods.validateRequest(parseInt(e.target.id)).send({from:accounts[0]})
      .then((x)=>{alert("approved successfully")
      setRequests([])
      viewreq()}).catch((e)=>console.log(e))
     
   }
    
    

    return (
      <>
        <div className="form-inner">
          <b><h4>REQUESTS</h4></b>
          <div><p>The NGO can make a request to the smart contract for withdrawal of money by adding a request below. The stakeholders(i.e only those who have made a donation till now) are allowed to vote for a particular request.</p><p>If more than 50% of the stakeholders vote for the withdrawal request, the request is approved by the smart contract and the amount is transferred to the receipient, else the request stands void</p></div>
                <h1>Enter Event Details:</h1><br />
                <label>
                            Event Description:(in ETH):
                            
                         
                 <input
                    type="text"
                    name="wallet address"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    placeholder="wallet address"
                    required
                  />
                </label><br />
                <label>
                            Receiver Wallet address:(in ETH):
                            
                         
                 <input
                    type="text"
                    name="wallet address"
                    value={addr}
                    onChange={e => setAddr(e.target.value)}
                    placeholder="wallet address"
                    required
                  />
                </label>
                    <br/>
                 <label>
                            Amount you wish to donate:(in ETH):
                            
                         
                    <input
                    type="text"
                    name="wallet address"
                    value={amt}
                    onChange={e => setAmt(e.target.value)}
                    placeholder="in Eth"
                    required
                  />
                </label>
        
                    <div>
                        <button className="addStudent" onClick={submit}> Make Request! </button>
                        
                    </div>
     </div>
     <br/>
     <br/>
     <button className='addStudent' onClick={viewreq}>View Requests</button>
     {
      requests.map((req)=>{
        return(<div class="req" key={req[2]}>
        <h2>{req.purpose}</h2><br/>
        <h3>To:{req.donee}</h3><br/>
        <h3>Amount : {req.value} ETH</h3><br/>
        <h3>Number of Validators : {req.noOfValidators}</h3>
        <h3>Completed : {req.completed}</h3>
        <button id={req[2]} onClick={validate}>Support the cause!</button>
        <button id={req[2]} onClick={approve}>Check status!</button>
        </div>)
      })
     }
     
     
     </>
    );
};

export default Requests;