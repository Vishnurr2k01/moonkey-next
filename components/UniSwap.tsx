'use client'

import { SwapWidget } from "@uniswap/widgets"
import { useContext, useEffect, useState } from "react"
import { ClientContext } from "./ClientProvider"
import { ethers } from "ethers"

export default () => {
    const {provider} = useContext(ClientContext)
    const [prov, setProv] = useState<ethers.providers.Web3Provider>();

    useEffect(()=>{
        if(!provider) return;
        setProv( new ethers.providers.Web3Provider(
            provider as ethers.providers.ExternalProvider
        ));
    },[provider])
    
    return (<>
        <div className="Uniswap">
            <SwapWidget provider={prov} />
        </div>
    </>)
}