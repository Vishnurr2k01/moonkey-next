'use client';
import { Button, ButtonSize, ButtonVariant } from '@/components/button/Button';
import { ModalV3 } from '@/components/modal/ModalV3';
import SwapSwitch from '@/components/widget/SwapSwitch';
import { useCallback, useContext, useRef, useState } from 'react';
import BigNumber from 'bignumber.js';
import { BigNumber as BigNumberEther } from 'ethers';
import { Image } from '@/components/image/Image';
import Transfer from './Transfer';
import { TransferETH } from './TransferETH';
import toast from 'react-hot-toast';
import { fillOp, sendToBundler } from '@/lib/scripts/deploy';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { parseEther } from 'ethers/lib/utils';
import { executeTx } from '@/lib/scripts/execute';
import { ethers } from 'ethers';
import { ClientContext } from '@/components/ClientProvider';

const toBigNumber = (
	num: BigNumberEther | string | number | BigNumber
): BigNumber => new BigNumber(num.toString());

function Assets() {
	const [receiverAddress, setReceiverAddress] = useState('');

	const [isOpen, setIsOpen] = useState(false);

	const onClose = () => {
		setIsOpen(false);
		setAmount('');
		setInputFiat('');
	};
	const [amount, setAmount] = useState('1');
	const [inputFiat, setInputFiat] = useState('');
	const [isFiat, setIsFiat] = useState(false);
	const handleClick = useCallback(() => {}, [amount, inputFiat, isFiat]);

	const token = {
		address: '0x996f40e8FB99Bb0Cba3231C88186d74C27B232D2',
		decimals: 18,
		name: 'MATIC',
		symbol: 'MATIC',
		balance: '1.22',
		balanceUsd: 1.24,
		usdPrice: '1.01',
		isExternal: false,

		logoURI: '/logos/matic-token-icon.webp',
	};

	const tokenInputField = {
		handleChange: () => null,
		inputUnit: 'ETH',
		oppositeUnit: 'USD',
		inputTkn: 'MATIC',
		setInputTkn: () => null,
		inputFiat: '1',
		setInputFiat: () => null,
		isTyping: false,
		token: token,
	};
	const inputErrorMsg = 'Insufficent balance';
	const handleChange = {
		address: (event: any) => {
			setReceiverAddress(event.target.value);
		},
	};
	const handleAmountChange = (event: any) => {
		setAmount(event.target.value);
	};

	const { newAddress, safeAuthSignInResponse, provider } =
		useContext(ClientContext);

	const sendTransaction = async (
		to: string,
		amount: number,
		callData: string
	) => {
		const notification = toast.loading(
			`Sending ${amount} to ${to.substring(0, 6)}`,
			{
				duration: 5000,
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
				(await prov.getCode(smartAccountAddress)).length <= 2 &&
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
		<>
			<div className='col-span-6 bg-[#F7F7F7] h-full'>
				{/* Header tab goes here */}
				<div className='flex flex-col items-center justify-center h-screen px-2'>
					<button
						className='flex items-center justify-center'
						onClick={() => {
							setIsOpen(true);
						}}
					>
						Transfer
					</button>
				</div>
			</div>
			<ModalV3
				title={'Transfer'}
				setIsOpen={onClose}
				isOpen={isOpen}
				titleElement={<></>}
				separator
				large
			>
				<>
					<div className='p-[30px] pb-[14px]'>
						<Transfer
							label={'Amount'}
							input={tokenInputField}
							errorMsg={inputErrorMsg}
							handleChange={handleAmountChange}
							disableSelection
							disabled
						/>

						<div className='flex flex-col gap-[20px] mt-[40px] text-black-medium dark:text-white-medium '>
							<div className='flex justify-between items-center'>
								{/* <div className='flex items-center gap-5'></div> */}
								<input
									type='text'
									value={receiverAddress}
									placeholder={'Enter receiver address'}
									className={
										'bg-white text-[20px] py-[14px] px-[20px] rounded-full w-full justify-center'
									}
									onChange={handleChange.address}
								/>
							</div>
						</div>
						<Button
							onClick={async () => {
								await sendTransaction(receiverAddress, Number(amount), '0x');
								setIsOpen(false);
							}}
							// disabled={!amount || +amount === 0}
							size={ButtonSize.Full}
							className='mt-[30px] mb-[14px] cursor-pointer'
							variant={ButtonVariant.Secondary}
						>
							Send
						</Button>
					</div>
				</>
			</ModalV3>
			{/* <TransferETH
				amount={amount}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				onConfirm={onClose}
			/> */}
		</>
	);
}

export default Assets;
