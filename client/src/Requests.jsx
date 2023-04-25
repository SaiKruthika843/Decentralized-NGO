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
    const[requests,setRequests]=useState([{purpose:"Tree plantation",noOfValidators:0,value:100}]);
    const { state: { contract, accounts,web3 } } = useEth();
    const admin="0xa8edAb95D06106Bd5d4724850b4db506a7D596e0"
    const submit=async()=>{
      const accID=0
      console.log(desc,parseInt(amt))
      
      console.log("acc",accounts[0]);
      
      if(accounts[0]!=admin) {
        alert("Only the NGO admin can create a request")
         return
      }
      contract.methods.newRequest(desc,parseInt(amt)).send({from:accounts[0]}).then(()=>
      setRequests([...requests,{purpose:desc,noOfValidators:0,value:amt}]))
      
       
    }
    useEffect(() => {
      // action on update of movies
      
     

  }, [noOfRequests]);

    const viewreq=async()=>{
      
      
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
        <div className="form-inner requesPage">
          <b><h4></h4></b>
                <h1 className='head1'>Enter Event Details(Only NGO):</h1><br />
                <label>
                            Event Description:(in Wei):
                            
                         
                 <input
                    type="text"
                    name="wallet address"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    placeholder="Event description"
                    required
                  />
                </label><br />
                <label>
                            Receiver Wallet address:
                            
                         
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
                            Amount required for the event:(in Wei):
                            
                         
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
                        <button className="button-29" onClick={submit}> Make Request! </button>
                        
                    </div>
     </div>
     <br/>
     <br/>
     <button className='button-29' onClick={viewreq}>View Requests</button>
     <div className="abc">{
      requests.map((req)=>{
        return(<div class="req" key={req[2]}>
        <h2>{req.purpose}</h2><br/>
        {/* <h3>To:{req.donee}</h3><br/> */}
        <h3><b>Amount :</b> {req.value} Wei</h3><br/>
        <h3><b>Number of Validators :</b> {req.noOfValidators}</h3><br/>
        <h3><b>Status :</b> {req.completed}Not Completed</h3>
        <button className='button-29 ap'id={req[2]} onClick={validate}>Support the cause!</button>
        <button className='button-29 ap' id={req[2]} onClick={approve}>Check status!</button>
        </div>)
      })
     }</div>
     
     
     </>
    );
};

export default Requests;