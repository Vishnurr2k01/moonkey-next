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
import SafeProvider from '@safe-global/safe-apps-react-sdk';

export const ClientContext = React.createContext<ClientProps>({
	logIn: function (): {} {
		throw new Error('Function not implemented.');
	},
	logOut: function (): {} {
		throw new Error('Function not implemented.');
	},
	newAccount: '',
	newAddress: '',
	changeAccount: function (newAccount: string): void {
		throw new Error('Function not implemented.');
	},
	changeAddress: function (newAddress: string): void {
		throw new Error('Function not implemented.');
	}
});

export interface ClientProps {
	safeAuth?: SafeAuthKit;
	safeAuthSignInResponse?: any;
	provider?: any;
	logIn: () => {};
	logOut: () => {};
	newAccount: string;
	newAddress: string;
	changeAccount: (newAccount: string) => void;
	changeAddress: (newAddress: string) => void;
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
	const [clientProps, setClientProps] = useState<ClientProps>();
	const [newAccount, setNewAccount] = useState('Account-1');
	const [newAddress, setNewAddress] = useState(
		'0x996f40e8FB99Bb0Cba3231C88186d74C27B232D2'
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
	return (<>{clientProps && (
		<ClientContext.Provider value={clientProps}>
			<SafeProvider>
				<Toaster position='bottom-center' />
				{children}
			</SafeProvider>
		</ClientContext.Provider>)}
	</>
	);
}
