import React from 'react'
import {useState,useEffect} from 'react'
import { useEth } from './contexts/EthContext'

export default function Transactions() {
    const [trans,setTrans]=useState([{}])
    const [state={accounts,web3,contract}]=useEth();

    const viewTrans=async()=(()=>{
        const output=web3.eth.getBlock('latest').then((block)=>{
            for(let i=0;i<=block.number;i++){
                web3.eth.getBlock(i),then((block)=>{
                    block.transaction.forEach(element => {
                        web3.eth.getTransaction(ex).then((tr)=>{
                            setTrans(...trans,tr)
                            console.log(tr)
                        })
                    });
                })
            }
        })
    })
  return (
    <div>
      <button onClick={viewTrans}>View</button>
    </div>
  )
}
