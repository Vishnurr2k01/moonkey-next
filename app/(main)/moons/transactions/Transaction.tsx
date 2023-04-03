'use client';

import { ClientContext } from '@/components/ClientProvider';
import { useContext, useState } from 'react';
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
	return (
		<div className='col-span-6 bg-[#F7F7F7] h-full'>
			{/* Header tab goes here */}
			<div className='flex flex-col items-center justify-center h-screen px-2'>
				<h1 className='text-2xl font-bold mb-20'>Transfer</h1>
				<div>
					<div className='flex space-x-2 text-center'>
						<div className='flex flex-col items-center justify-center mb-5'>
							{/* Send icon */}
							<BsSendFill size={25} />
							<h2>Send</h2>
						</div>
						<div className='space-y-2'>
							<button
								className='cursor-pointer p-4 bg-gray-700/50 rounded-lg max-w-[300px] text-white hover:bg-gray-700/90'
								onClick={async () =>
									await sendTransaction(newAddress!, 1, '0x')
								}
							>
								{'Send 1-wei to your smart account as first transaction'}
							</button>
							<button
								className='cursor-pointer p-4 bg-gray-700/50 rounded-lg max-w-[300px] text-white hover:bg-gray-700/90'
								onClick={async () =>
									await sendTransaction(newAddress!, sendAmount, '0x')
								}
							>
								Send specified amount to your smart account
							</button>
						</div>
					</div>
					<div>
						<div>
							<div className='flex flex-col items-center justify-center mb-5'>
								<GrSend size={25} />
								<h2>Send-To</h2>
							</div>
							<button
								className='cursor-pointer p-4 bg-gray-700/50 rounded-lg max-w-[300px] text-white hover:bg-gray-700/90'
								onClick={async () =>
									await sendTransaction(receiverAddress, sendAmount, '0x')
								}
							>
								Send {sendAmount} to beneficiary
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Transaction;
