'use client'

import { SwapWidget } from "@uniswap/widgets"
import { useContext, useEffect, useState } from "react"
import { ClientContext } from "./ClientProvider"
import { ethers } from "ethers"
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk"
import { SafeAppProvider } from "@safe-global/safe-apps-provider"

export default () => {
    const {provider} = useContext(ClientContext)
    const [prov, setProv] = useState<ethers.providers.Web3Provider>();
	const {sdk, safe} = useSafeAppsSDK();

    useEffect(()=>{
        if(!provider) return;
		console.log('SAFE INFO : \n\n',safe, sdk);
        setProv(new ethers.providers.Web3Provider(new SafeAppProvider(safe, sdk)));
    },[provider])
    
    return (<>
        <div className="Uniswap">
            <SwapWidget provider={prov} />
        </div>
    </>)
}