'use client';
import { Button, ButtonSize, ButtonVariant } from '@/components/button/Button';
import { ModalV3 } from '@/components/modal/ModalV3';
import { useCallback, useContext, useState } from 'react';
import BigNumber from 'bignumber.js';
import { BigNumber as BigNumberEther } from 'ethers';
import Transfer from './Transfer';
import toast from 'react-hot-toast';
import { fillOp, fillOpPaymaster, sendToBundler } from '@/lib/scripts/deploy';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { parseEther } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import { ClientContext } from '@/components/ClientProvider';
import { paymaster, paymasterSigned } from '@/lib/scripts/paymaster';
import Token from './Token';
import { DAIAddress, USDCAddress, WETHAddress } from '@/lib/constants';
import { transfer } from '@/lib/scripts/transfer';

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
	const [balance, setBalance] = useState('');
	const handleClick = useCallback(() => {}, [amount, inputFiat, isFiat]);
	const [logoURI, setLogoURI] = useState('/logos/matic-token-icon.webp');
	const [tokenSymbol, setTokenSymbol] = useState('MATIC');

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
		toContract: string
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
			const res = await transfer(
				await signer.getAddress(),
				prov,
				amount,
				to,
				toContract
			);
			//console.log('Address: ', res.counterfactualAddress);

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
				const op: UserOperation = { ...resDeploy.op2, signature: signature };
				// const res2 = await paymasterSigned(op, prov);
				// const sig2 = await signer.signMessage(res2.message);
				// const op2: UserOperation = { ...res2.userOp, signature: sig2 };
				await sendToBundler(op, prov);
				toast.success(
					`Deployed smart account at ${smartAccountAddress.substring(0, 6)}`,
					{ id: notification, duration: 5000 }
				);
			}
			const signature = await signer.signMessage(res.message);
			const op: UserOperation = { ...res.op2, signature: signature };
			// const res2 = await paymasterSigned(op, prov);
			// const sig2 = await signer.signMessage(res2.message);
			// const op2: UserOperation = { ...res2.userOp, signature: sig2 };
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

	async function clickedP() {
		// Find balance of the token provided
		if (tokenSymbol === 'MATIC') {
			setBalance('1.22');
		}
		setBalance('0.00');
		setIsOpen(true);
	}

	const handleSubmit = async () => {
		let toContract = '';
		if (tokenSymbol === 'USDC') {
			toContract = USDCAddress;
		} else if (tokenSymbol === 'WETH') {
			toContract = WETHAddress;
		} else if (tokenSymbol === 'DAI') {
			toContract = DAIAddress;
		}
		setIsOpen(false);
		console.log('To Contract: ', toContract);
		await sendTransaction(receiverAddress, Number(amount), toContract);
	};

	return (
		<>
			<div className='col-span-6 bg-[#F7F7F7] h-full'>
				<div className='flex items-center text-[20px] ml-2 mb-[20px]'>
					Assets
				</div>
				<div className='flex flex-wrap py-2'>
					<div className='w-full px-4'>
						<Token
							handleClicked={clickedP}
							name={'MATIC'}
							logo={'/logos/matic-token-icon.webp'}
							setTokenSymbol={setTokenSymbol}
							setLogoURI={setLogoURI}
						/>
						<Token
							handleClicked={clickedP}
							name={'USDC'}
							logo={'/logos/USD_Coin_icon.webp'}
							setTokenSymbol={setTokenSymbol}
							setLogoURI={setLogoURI}
						/>
						<Token
							handleClicked={clickedP}
							name={'WETH'}
							logo={'/logos/ethereum.webp'}
							setTokenSymbol={setTokenSymbol}
							setLogoURI={setLogoURI}
						/>
						<Token
							handleClicked={clickedP}
							name={'DAI'}
							logo={'/logos/dai.png'}
							setTokenSymbol={setTokenSymbol}
							setLogoURI={setLogoURI}
						/>
					</div>
				</div>
				{/* <button
						className='flex items-center justify-center'
						onClick={() => {
							setIsOpen(true);
						}}
					>
						Transfer
					</button> */}
				{/* </div> */}
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
							amount={amount}
							balance={balance}
							tokenSymbol={tokenSymbol}
							logoURI={logoURI}
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
							onClick={handleSubmit}
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
