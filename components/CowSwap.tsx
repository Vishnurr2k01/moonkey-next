'use client'
import { ClientContext } from "./ClientProvider";
import { useContext, useEffect, useRef, useState } from 'react';
import  SafeAppsSDK  from '@gnosis.pm/safe-apps-sdk'

const CowSwap = () => {
  const { safeAuth, safeAuthSignInResponse } = useContext(ClientContext);
  const safeAddress = safeAuthSignInResponse?.safes[0];
  const iframeRef = useRef(null);
  const appsSDK = new SafeAppsSDK();

  useEffect(() => {
    const iframe = iframeRef.current
    console.log(appsSDK);
    // Add event listener for messages from the iframe
    window.addEventListener('message', handleIframeMessage)

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener('message', handleIframeMessage)
    }
  }, [])

  const handleIframeMessage = (event : MessageEvent) => {
    // Check if message is from the iframe
    if(!iframeRef.current) return;
    if (event.source === iframeRef.current.contentWindow) {
      // Do something with the message data
      console.log(event.data, "\n\n\n\n\n\n\n")
    }else{
      console.log(event, "\n\n\n\n\n\n\n")
    }
  }

  return (<div>
    {true && <iframe src={`https://swap.cow.fi/`} width={'100%'} height={500} ref={iframeRef} />}
  </div>)
}

export default CowSwap;