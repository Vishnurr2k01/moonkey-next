'use client';
import React, { useEffect, useState } from 'react';
import authProviderConfig from '@/lib/web3Auth';
import { SafeEventEmitterProvider } from '@web3auth/base';
import {
	SafeAuthKit,
	SafeAuthSignInData,
	SafeAuthProviderType,
	Web3AuthProviderConfig,
} from '@safe-global/auth-kit';

function SocialLogin() {
	const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
		useState<SafeAuthSignInData | null>(null);
	const [safeAuth, setSafeAuth] = useState<SafeAuthKit>();
	const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
		null
	);
	useEffect(() => {
		(async () => {
			setSafeAuth(
				await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
					chainId: '0x5',
					txServiceUrl: 'https://safe-transaction-goerli.safe.global',
					authProviderConfig: authProviderConfig as Web3AuthProviderConfig,
				})
			);
		})();
	}, []);
	const login = async () => {
		if (!safeAuth) return;
		const response = await safeAuth.signIn();
		console.log('SIGNIN RESPONSE: ', response);
		setSafeAuthSignInResponse(response);
		setProvider(safeAuth.getProvider() as SafeEventEmitterProvider);
	};
	const logout = async () => {
		if (!safeAuth) return;
		await safeAuth.signOut();

		setProvider(null);
		setSafeAuthSignInResponse(null);
	};
	/*	const authenticateUser = async () => {
		if (!web3auth) {
			console.log('web3Auth not initialized yet');
			return;
		}
		const idToken = await web3auth.authenticateUser();
		console.log(idToken);
	};
	const getUserInfo = async () => {
		if (!web3auth) {
			console.log('web3Auth not initialized yet');
			return;
		}
		const user = await web3auth.getUserInfo();
		console.log(user);
	};
	const getAccounts = async () => {
		if (!provider) {
			console.log('Provider not initialized yet');
			return;
		}
		const ethersProvider = new ethers.providers.Web3Provider(provider);
		const signer = ethersProvider.getSigner();
		const address = await signer.getAddress();
		console.log(address);
		return address;
	};
	const getBalance = async () => {
		if (!provider) {
			console.log('Provider not initialized yet');
			return;
		}
		const ethersProvider = new ethers.providers.Web3Provider(provider);
		const signer = ethersProvider.getSigner();
		const address = await signer.getAddress();

		const balance = ethers.utils.formatEther(
			await ethersProvider.getBalance(address)
		);
		console.log(balance);
	};
	const loggedInView = (
		<>
			<div className='p-4 border'>
				<button onClick={getUserInfo}>Get user Info</button>
			</div>
			<div className='p-4 border'>
				<button onClick={authenticateUser}>Get ID Token</button>
			</div>
			<div className='p-4 border'>
				<button onClick={getAccounts}>Get Accounts</button>
			</div>
			<div className='p-4 border'>
				<button onClick={getBalance}>Get Balance</button>
			</div>
		</>
	);
	const unlogged = <button onClick={login}>Connect</button>;
    */
	return (
		<div>
			<button className='bg-blue-600 text-white p-4 text-lg' onClick={login}>
				Connect
			</button>
			<button className='text-lg text-white bg-red-600' onClick={logout}>
				Disconnect
			</button>
			<div>
				{safeAuthSignInResponse?.eoa && (
					<div>
						<div className='flex justify-between'>
							<p>Owner account</p>
							<p>SignerAddress: ${safeAuthSignInResponse.eoa}</p>
							<p>ChainId: ${safeAuthSignInResponse.chainId} </p>
						</div>
						<div>
							<p>Availiable Safes</p>
							{safeAuthSignInResponse?.safes?.length ? (
								safeAuthSignInResponse?.safes?.map((safe, index) => (
									<div key={index} className='flex justify-between'>
										<p>Address: ${safe}</p>
									</div>
								))
							) : (
								<p>No Available Safes</p>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default SocialLogin;
