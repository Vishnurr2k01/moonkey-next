'use client';
import { ClientContext } from '@/components/ClientProvider';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BiAddToQueue, BiImport } from 'react-icons/bi';

function CreateAccount() {
	const {
		changeAccount,
		changeAddress,
		newAccount,
		newAddress,
		safeAuthSignInResponse,
		logIn,
	} = useContext(ClientContext);

	const [showModal, setShowModal] = useState(false);
	const [accountName, setAccountName] = useState('');
	const [address, setAddress] = useState('');
	const router = useRouter();
	const accountNameChange = (event: { target: { value: string } }) => {
		setAccountName(event.target.value);
		if (changeAccount) changeAccount(event.target.value);
		console.log(newAccount);
	};
	const addressChange = (event: { target: { value: string } }) => {
		setAddress(event.target.value);
		if (changeAddress) changeAddress(event.target.value);
		console.log(newAddress);
	};
	const handleCreateAccount = async () => {
		if (!safeAuthSignInResponse) logIn;
		if (changeAddress) changeAddress(safeAuthSignInResponse.eoa);

		router.push('/moons');
	};
	const handleImportAccount = () => {
		setShowModal(true);
	};

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
