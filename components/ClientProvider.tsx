'use client';
import { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import authProviderConfig from '@/lib/web3Auth';
import { SafeAuthKit, SafeAuthProviderType, SafeAuthSignInData, Web3AuthProviderConfig } from '@safe-global/auth-kit';
import { SafeEventEmitterProvider } from '@web3auth/base';

export const ClientContext = React.createContext<ClientProps>({});

interface ClientProps {
	safeAuth?: SafeAuthKit;
	safeAuthSignInResponse?: any;
	logIn?: ()=>{};
	logOut?: ()=>{};
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<SafeAuthSignInData | null>(null);
	const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
	const [safeAuth, setSafeAuth] = useState<SafeAuthKit>()
	const [clientProps, setClientProps] = useState<ClientProps>({});

	useEffect(() => {
		; (async () => {
			console.log(authProviderConfig);
			setSafeAuth(await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
				chainId: '0x5',
				txServiceUrl: 'https://safe-transaction-goerli.safe.global',
				authProviderConfig: authProviderConfig as Web3AuthProviderConfig,
			}));
		})();
	}, []);

	useEffect(() => {
		if (!safeAuth) return;
		setClientProps({
			safeAuth: safeAuth,
			safeAuthSignInResponse: safeAuthSignInResponse,
			logIn: login,
			logOut: logout,
		})

	}, [safeAuth, safeAuthSignInResponse])

	const login = async () => {
		console.log(safeAuth);

		if (!safeAuth) return;
		const response = await safeAuth.signIn();
		console.log('SIGNIN RESPONSE: ', response);
		setSafeAuthSignInResponse(response);
		setProvider(safeAuth.getProvider() as SafeEventEmitterProvider);
	};
	const logout = async () => {
		if (!safeAuth || !provider) return;
		await safeAuth.signOut();
		setProvider(null);
		setSafeAuthSignInResponse(null);
	};
	return (
		<ClientContext.Provider value={clientProps}>
			<Toaster position='bottom-center' />
			{children}
		</ ClientContext.Provider>
	);
}
