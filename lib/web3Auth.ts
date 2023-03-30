//import { Web3Auth } from '@web3auth/modal';
//import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';

const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID || '';
const infuraKey: string = process.env.NEXT_PUBLIC_INFURA_API_KEY || '';

//const web3auth = new Web3Auth({
//	clientId,
//	web3AuthNetwork: 'testnet',
//	chainConfig: {
//		chainNamespace: CHAIN_NAMESPACES.EIP155,
//		chainId: '0x1',
//		rpcTarget: `https://goerli.infura.io/v3/${infuraKey}`,
//		blockExplorer: 'https://goerli.etherscan.io/',
//	},
//	uiConfig: {
//		appLogo: '/moon.svg',
//		loginMethodsOrder: ['google', 'facebook', 'discord', 'github'],
//	},
//});
const authProviderConfig = {
	rpcTarget: `https://goerli.infura.io/v3/${infuraKey}`,
	clientId: clientId,
	network: 'testnet',
	theme: 'light',
	appLogo: '/moon.svg',
};

export default authProviderConfig;
