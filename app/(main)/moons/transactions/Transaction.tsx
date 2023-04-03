'use client';

import { ClientContext } from '@/components/ClientProvider';
import { SetStateAction, useContext, useState } from 'react';
import { fillOp, sendToBundler } from '@/lib/scripts/deploy';
import { executeTx } from '@/lib/scripts/execute';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { parseEther } from 'ethers/lib/utils';
import { BsSendFill } from 'react-icons/bs';
import { GrSend } from 'react-icons/gr';

function Transaction() {
	const [sendAmount, setSendAmount] = useState(0);
	const [receiverAddress, setReceiverAddress] = useState('');
	const { newAccount, newAddress, safeAuthSignInResponse, safeAuth, provider } =
		useContext(ClientContext);

	const sendTransaction = async (
		to: string,
		amount: number,
		callData: string
	) => {
		const notification = toast.loading(
			`Sending ${amount} to ${to.substring(0, 6)}`,
			{
				duration: 2000,
			}
		);
		try {
			if (!safeAuthSignInResponse) {
				toast.error(`Please connect signer for the smart account!`, {
					id: notification,
					duration: 5000,
				});
				return;
			}
			const prov = new ethers.providers.Web3Provider(
				provider as ethers.providers.ExternalProvider
			);
			const signer: ethers.providers.JsonRpcSigner = prov.getSigner();
			const res = await executeTx(
				await signer.getAddress(),
				prov,
				amount,
				to,
				callData
			);

			const smartAccountAddress = res.counterfactualAddress;
			if (
				(await prov.getCode(smartAccountAddress)) === '0x' &&
				smartAccountAddress === newAddress
			) {
				toast.loading(
					`Deploying a Smart Account ${smartAccountAddress.substring(0, 6)}`,
					{ id: notification, duration: 5000 }
				);
				const balance = await prov.getBalance(smartAccountAddress);
				if (balance.lte(parseEther('0.001'))) {
					toast.error(
						`No paymaster found! And not enough balance to deploy ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					return;
				}
				const resDeploy = await fillOp(await signer.getAddress(), prov);
				if (resDeploy.counterfactualAddress !== smartAccountAddress) {
					toast.error(
						`Found conflicting address, confirm that the signer is connected to the address ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					return;
				}
				const signature = await signer.signMessage(resDeploy.message);
				const op: UserOperation = { ...res.op2, signature: signature };
				await sendToBundler(op, prov);
				toast.success(
					`Deployed smart account at ${smartAccountAddress.substring(0, 6)}`,
					{ id: notification, duration: 5000 }
				);
			}
			const signature = await signer.signMessage(res.message);
			const op: UserOperation = { ...res.op2, signature: signature };
			await sendToBundler(op, prov);
			toast.success(`Sent ${amount} to ${to.substring(0, 6)}`, {
				id: notification,
				duration: 5000,
			});
		} catch (error) {
			toast.error(`Whoops... Something went wrong! Check console`, {
				id: notification,
				duration: 5000,
			});
			console.error(error);
		}
	};
	const handleChange = {
		amount: (event: any) => {
			setSendAmount(event.target.value);
		},
		address: (event: any) => {
			setReceiverAddress(event.target.value);
		},
	};
	return (
		<div className='col-span-6 bg-[#F7F7F7] h-full'>
			{/* Header tab goes here */}
			<div className='flex flex-col items-center justify-center h-screen px-2'>
				<h1 className='text-2xl font-bold mb-10'>Transfer</h1>
				<div className='flex space-x-2'>
					<div className='space-x-2 justify-between'>
						{/* <div className='flex items-center justify-center mb-2'>
							<BsSendFill size={15} />
							<h2 className='m-1'>Send</h2>
						</div> */}
						<div className='space-y-2 flex-col text-white'>
							<div className='flex flex-col space-y-2 justify-between'>
								<input
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									type='number'
									placeholder='Enter amount to transfer'
									onChange={handleChange.amount}
								/>
								<input
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									type='number'
									placeholder='Enter receiver address'
									onChange={handleChange.address}
								/>
							</div>
							<button
								className='flex items-center justify-center cursor-pointer p-4 bg-blue-700/50 rounded-lg max-w-[300px] text-white hover:bg-blue-700/90'
								onClick={async () =>
									await sendTransaction(receiverAddress, sendAmount, '0x')
								}
							>
								<BsSendFill size={15} />
								<span className='m-1'>Send</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Transaction;
