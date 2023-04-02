'use client';
import { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import authProviderConfig from '@/lib/web3Auth';
import {
	SafeAuthKit,
	SafeAuthProviderType,
	SafeAuthSignInData,
	Web3AuthProviderConfig,
} from '@safe-global/auth-kit';
import { SafeEventEmitterProvider } from '@web3auth/base';

export const ClientContext = React.createContext<ClientProps>({});

interface ClientProps {
	safeAuth?: SafeAuthKit;
	safeAuthSignInResponse?: any;
	provider?: any;
	logIn?: () => {};
	logOut?: () => {};
	newAccount?: string;
	newAddress?: string;
	changeAccount?: (newAccount: string) => void;
	changeAddress?: (newAddress: string) => void;
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
		useState<SafeAuthSignInData | null>(null);
	const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
		null
	);
	const [safeAuth, setSafeAuth] = useState<SafeAuthKit>();
	const [clientProps, setClientProps] = useState<ClientProps>({});
	const [newAccount, setNewAccount] = useState('Account-1');
	const [newAddress, setNewAddress] = useState(
		'0xF6C465A2778b8e26bB1e18aEad588404FFFFf243'
	);
	const changeAccount = (account: string) => {
		if (!account) return;
		setNewAccount(account);
	};
	const changeAddress = (address: string) => {
		if (!address) return;
		setNewAddress(address);
	};

	useEffect(() => {
		(async () => {
			setSafeAuth(
				await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
					chainId: '0x13881',
					//txServiceUrl: 'https://safe-transaction-goerli.safe.global',
					authProviderConfig: authProviderConfig as Web3AuthProviderConfig,
				})
			);
		})();
	}, []);

	useEffect(() => {
		if (!safeAuth) return;
		setClientProps({
			safeAuth: safeAuth,
			safeAuthSignInResponse: safeAuthSignInResponse,
			provider: provider,
			logIn: login,
			logOut: logout,
			newAccount: newAccount,
			newAddress: newAddress,
			changeAccount: changeAccount,
			changeAddress: changeAddress,
		});
	}, [safeAuth, safeAuthSignInResponse, newAccount, newAddress]);

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
		</ClientContext.Provider>
	);
}
