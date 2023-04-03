'use client';

import { ClientContext } from '@/components/ClientProvider';
import { useContext } from 'react';
import { fillOp, sendToBundler } from '@/lib/scripts/deploy';
import { executeTx } from '@/lib/scripts/execute';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { parseEther } from 'ethers/lib/utils';

function page() {
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
			Transactions
			<button onClick={async () => await sendTransaction(newAddress!, 1, '0x')}>
				Send 1-Wei to Self
			</button>
		</div>
	);
}

export default page;
