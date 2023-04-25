import React from 'react'
import {useState,useEffect} from 'react'
import { SiDungeonsanddragons } from 'react-icons/si';
import { useEth } from './contexts/EthContext'

export default function Transactions() {
    const [blocks,setBlocks]=useState([{waste:true}])
    const { state: { contract, accounts,web3 } } = useEth();
    let arr=[{waste:true}]
    
    const viewTrans=()=>{
        
        web3.eth.getBlock('latest').then((block)=>{
          arr=[{waste:true}]
            for(var i=0;i<=block.number;i++){
                web3.eth.getBlock(i).then((block)=>{
                    block.waste=false
                    arr.push(block)
                    setBlocks([...blocks,block])
                })
            }
            
        })
    }
  return (
    <div>
      <button className="button-29" onClick={viewTrans}>View</button>
      {blocks.map((b)=>{ 
        return(       
        <div className='requestPage1' style={{width:"400px"}}>
          <h3><b>block number : </b>{b.number}</h3>
          <h3><b>Transaction ids : </b>{b.transactions}</h3>
        </div>)
      })}
      
    </div>
  )
}
