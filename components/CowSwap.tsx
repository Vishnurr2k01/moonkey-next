'use client'
import { ClientContext } from "./ClientProvider";
import {useContext, useEffect, useState} from 'react';
import { Wallet } from 'ethers';

const CowSwap = () =>{
    const {safeAuth} = useContext(ClientContext)

    useEffect(() => {
      if(!safeAuth) return;
      
    }, [safeAuth])
    
    return(<div>
        <iframe src="https://swap.cow.fi/" />
    </div>)
}

export default CowSwap;