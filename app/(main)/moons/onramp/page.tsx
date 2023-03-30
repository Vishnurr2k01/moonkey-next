'use client';
import {
	SafeOnRampEvent,
	SafeOnRampKit,
	SafeOnRampProviderType,
} from '@safe-global/onramp-kit';
import { isAddress } from '@ethersproject/address';
import { useContext, useEffect, useRef, useState } from 'react';
import { ClientContext } from '@/components/ClientProvider';

const isSessionValid = (sessionId: string) => sessionId.length === 28;

function page() {
	const { newAddress } = useContext(ClientContext);
	const [walletAddress, setWalletAddress] = useState<string>('');
	if (newAddress !== undefined) setWalletAddress(newAddress);
	const [sessionId, setSessionId] = useState<string>('');
	const [onRampClient, setOnRampClient] = useState<SafeOnRampKit>();
	const stripeRootRef = useRef<HTMLDivElement>(null);

	const handleCreateSession = async () => {
		if (!isSessionValid(sessionId) && !isAddress(walletAddress)) return;

		if (stripeRootRef.current) {
			stripeRootRef.current.innerHTML = '';
		}

		const sessionData = (await onRampClient?.open({
			sessionId: sessionId,
			walletAddress,
			networks: ['ethereum'],
			element: '#stripe-root',
			events: {
				onLoaded: () => console.log('onLoaded()'),
				onPaymentSuccessful: (eventData: SafeOnRampEvent) =>
					console.log('onPaymentSuccessful(): ', eventData),
				onPaymentProcessing: (eventData: SafeOnRampEvent) =>
					console.log('onPaymentProcessing(): ', eventData),
				onPaymentError: (eventData: SafeOnRampEvent) =>
					console.log('onPaymentError(): ', eventData),
			},
		})) as any;

		setWalletAddress(sessionData.transaction_details.wallet_address);
	};

	const handleCloseSession = () => {
		if (stripeRootRef.current) {
			stripeRootRef.current.innerHTML = '';
		}
	};

	useEffect(() => {
		(async () => {
			const onRampClient = await SafeOnRampKit.init(
				SafeOnRampProviderType.Stripe,
				{
					onRampProviderConfig: {
						stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
						onRampBackendUrl:
							process.env.NEXT_PUBLIC_STRIPE_BACKEND_BASE_URL || '',
					},
				}
			);

			setOnRampClient(onRampClient);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (!newAddress) {
				console.log('No address provided');
				return;
			}
			handleCreateSession();
		})();
	});

	return (
		<div className='col-span-6 bg-[#F7F7F7] h-full'>
			<div className='relative flex items-center justify-center'>
				<div className='p-2 border-r-[#303030]'>
					<input
						id='wallet-address'
						placeholder='Enter the address you want to initialize the session with'
						value={walletAddress}
						onChange={(event) => setWalletAddress(event.target.value)}
						className='w-full'
					/>
					{/* <input
								id='session-id'
								placeholder='Enter the session id if you have one'
								value={sessionId}
								onChange={(event) => setSessionId(event.target.value)}
								className='w-full mt-2'
							/> */}
					<br />
					<div className='justify-between items-center flex'>
						<button onClick={handleCreateSession} className='mt-3'>
							Create new session
						</button>
						<button onClick={handleCloseSession} className='mt-3'>
							Close session
						</button>
					</div>
				</div>
			</div>
			<div className='p-2'>
				<div id='stripe-root' ref={stripeRootRef}></div>
			</div>
		</div>
	);
}

export default page;
