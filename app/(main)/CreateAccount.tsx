'use client';
import { ClientContext } from '@/components/ClientProvider';
import fetchFromDeploy from '@/lib/fetchFromDeploy';
import { UserOperation } from '@/lib/scripts/UserOperation';
import { fillOp, sendToBundler } from '@/lib/scripts/deploy';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BiAddToQueue, BiImport } from 'react-icons/bi';
//import useSWR from 'swr';

function CreateAccount() {
	const {
		changeAccount,
		changeAddress,
		newAccount,
		newAddress,
		safeAuthSignInResponse,
		logIn,
		safeAuth,
		provider,
	} = useContext(ClientContext);

	//const { data, error, isLoading } = useSWR('/api/deploy', fetchFromDeploy(ownerAddress), {
	//	revalidateOnFocus: false,
	//});
	const [showModal, setShowModal] = useState(false);
	const [accountsList, setAccountsList] = useState([] as Array<string>);

	const router = useRouter();
	const accountNameChange = (event: { target: { value: string } }) => {
		if (changeAccount) changeAccount(event.target.value);
		console.log(newAccount);
	};
	const addressChange = (event: { target: { value: string } }) => {
		if (changeAddress) changeAddress(event.target.value);
		console.log(newAddress);
	};
	const handleCreateAccount = async () => {
		const notification = toast.loading(`SigningIn...`, { duration: 2000 });
		try {
			if (!safeAuthSignInResponse) logIn!();

			if (changeAddress && provider) {
				const prov = new ethers.providers.Web3Provider(
					provider as ethers.providers.ExternalProvider
				);
				const signer: ethers.providers.JsonRpcSigner = prov.getSigner();

				const res = await fillOp(await signer.getAddress(), prov);
				const smartAccountAddress = res.counterfactualAddress;
				changeAddress(smartAccountAddress);
				setAccountsList((prevState) => [
					...prevState,
					smartAccountAddress as string,
				]);

				if ((await prov.getCode(smartAccountAddress)).length > 2) {
					toast.success(
						`SmartAccount already exist at ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					router.push('/moons');
					return;
				}
				const balance = await prov.getBalance(smartAccountAddress);
				if (balance.lte(parseEther('0.09'))) {
					toast.error(
						`No paymaster found! And not enough balance on ${smartAccountAddress.substring(
							0,
							6
						)}`,
						{ id: notification, duration: 5000 }
					);
					router.push('/moons/transactions');
					return;
				}
				const signature = await signer.signMessage(res.message);
				const op: UserOperation = { ...res.op2, signature: signature };
				await sendToBundler(op, prov);
				toast.success(
					`Deployed smart account at ${smartAccountAddress.substring(0, 6)}`,
					{ id: notification, duration: 5000 }
				);

				router.push('/moons');
				return;
			}
			toast.error(`Whoops... Unexpected exit! Click-again`, {
				id: notification,
				duration: 2000,
			});
		} catch (error) {
			toast.error(`Whoops... Something went wrong! Check console`, {
				id: notification,
				duration: 5000,
			});
			console.error(error);
		}
	};
	const handleImportAccount = () => {
		setShowModal(true);
	};

	useEffect(() => {
		const list = window.localStorage.getItem('userAccountList');
		if (list) setAccountsList(JSON.parse(list));
	}, []);
	useEffect(() => {
		window.localStorage.setItem(
			'userAccountList',
			JSON.stringify(
				accountsList.filter(
					(item, index) => accountsList.indexOf(item) === index
				)
			)
		);
	}, [accountsList]);

	return (
		<>
			<div className='min-h-full flex space-x-4 items-center justify-center mt-4'>
				<div
					onClick={handleCreateAccount}
					className='cursor-pointer hover:shadow ml-2 w-96 p-4 rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5'
				>
					<div className='flex justify-between'>
						<BiAddToQueue size={50} className='text-green-400' />
					</div>
					<div>
						<h2 className='font-bold'>Create an account</h2>
						<p className='truncate break-normal'>
							Two clicks away from having your web3 Smart wallet
						</p>
					</div>
				</div>
				<div
					onClick={handleImportAccount}
					className='cursor-pointer hover:shadow ml-2 w-96 p-4 rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5'
				>
					<div className='flex justify-between'>
						<BiImport size={50} className='text-green-400' />
					</div>
					<div>
						<h2 className='font-bold '>Import existing account</h2>
						<p className='truncate break-normal'>Migrate your smart wallet.</p>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center mt-5 px-2'>
				{accountsList.length > 0 &&
					accountsList.map((account, index) => (
						<div key={index} className='flex items-center justify-center'>
							<button
								onClick={() => {
									changeAddress!(account);
									router.push('/moons');
								}}
								className='cursor-pointer bg-transparent border-none p-2 mb-2'
							>
								<span className=' text-[20px]'>Account-{index + 1}: </span>
								<span className='font-bold hover:text-blue-700'>{account}</span>
							</button>
						</div>
					))}
			</div>
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							{/* Content */}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/* modal header */}
								<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
									<h3 className='text-3xl text-slate-500 font-semibold'>
										Import account
									</h3>
									<button
										className='text-black p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										onClick={() => setShowModal(false)}
									>
										<AiFillCloseSquare size={25} />
									</button>
								</div>

								{/* body */}
								<div className='relative p-6 flex-auto'>
									<div className='flex text-[#091B18] items-center space-x-1 bg-white border-[#004337] border p-2'>
										<p>Account</p>
										<input
											className='flex w-full bg-transparent text-[#091F1C] text-right'
											type='text'
											placeholder={'Account name'}
											onChange={accountNameChange}
										/>
									</div>
									<div className='flex text-[#091B18] items-center space-x-1 bg-white border-[#004337] border p-2'>
										<p>Address</p>
										<input
											className='flex w-full bg-transparent text-[#091F1C] text-right'
											type='text'
											placeholder={'Enter account address'}
											onChange={addressChange}
										/>
									</div>
								</div>
								{/* footer */}
								<div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
									<button
										className='bg-gray-900 text-white hover:text-gray-600 hover:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										onClick={() => {
											router.push('/moons');
											setShowModal(false);
										}}
									>
										Import
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
}

export default CreateAccount;
