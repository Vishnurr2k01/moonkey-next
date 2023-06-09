'use client';
import { useContext, useEffect, useState } from 'react';
import { GiTwoCoins } from 'react-icons/gi';
import { BiTransferAlt, BiDollarCircle, BiCopy } from 'react-icons/bi';
import { TbPlanet } from 'react-icons/tb';
import { AiFillTool } from 'react-icons/ai';
import { MdCurrencyExchange, MdVpnKey } from 'react-icons/md';
import SidebarRow from './SidebarRow';
import { ClientContext } from './ClientProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Sidebar() {
	const {
		safeAuth,
		safeAuthSignInResponse,
		logIn,
		logOut,
		newAccount,
		newAddress,
	} = useContext(ClientContext);
	const router = useRouter();
	return (
		<div className='flex flex-col col-span-2 items-center px-4 md:items-start text-gray-300 bg-gray-800 border-gray-800'>
			<div
				className='flex items-center bg-none cursor-pointer'
				onClick={() => router.push('/')}
			>
				<img src='/moon.svg' className='m-3 h-10 w-10' />
				<p className='font-Kelly text-2xl'>MoonKey</p>
			</div>
			{/* Safe (ERC4337) account */}
			<div className='flex flex-1 flex-col mt-2 items-center bg-gray-700'>
				<div
					className={`flex flex-row items-center ${
						safeAuthSignInResponse ? 'text-green-700' : 'text-red-700'
					} `}
				>
					{/* Change text color to green when connected to signer */}
					<MdVpnKey size={25} />
					<p className='text-gray-300'>{newAccount}</p>
				</div>
				<div className='flex flex-row items-center justify-center'>
					<p className='font-bold '>mumb:</p>
					<p className='font-light '>
						{newAddress?.substring(0, 6)}
						{'...'}
						{newAddress?.substring(newAddress.length - 4)}
					</p>
					<button
						className='cursor-pointer hover:bg-gray-600 hover:text-white'
						onClick={() => navigator.clipboard.writeText(newAddress!)}
					>
						<BiCopy size={10} />
					</button>
				</div>
			</div>
			{/* Divider line */}
			<div className='inset-0 flex items-center place-content-center'>
				<div className='w-3/4 border-t border-gray-300' />
			</div>
			{/* Assets */}
			<Link href={'/moons/assets'} className='no-underline text-gray-300'>
				<SidebarRow Icon={GiTwoCoins} title='Assets' />
			</Link>
			{/* Transactions */}
			<Link href={'/moons/transactions'} className='no-underline text-gray-300'>
				<SidebarRow Icon={BiTransferAlt} title='Transactions' />
			</Link>
			{/* Mods */}
			<Link href={'/moons/mods'} className='no-underline text-gray-300'>
				<SidebarRow Icon={AiFillTool} title='Mods' />
			</Link>
			{/* Moons */}
			<Link href={'/moons'} className='no-underline text-gray-300'>
				<SidebarRow Icon={TbPlanet} title='Moons' />
			</Link>
			{/* Divider line */}
			<div className='inset-0 flex items-center place-content-center'>
				<div className='w-3/4 border-t border-gray-300' />
			</div>
			<Link href={'/moons/onramp'} className='no-underline text-gray-300'>
				<SidebarRow Icon={BiDollarCircle} title='Onramp' />
			</Link>
			<Link href={'/moons/exchange'} className='no-underline text-gray-300'>
				<SidebarRow Icon={MdCurrencyExchange} title='Exchange' />
			</Link>
			{!safeAuthSignInResponse ? (
				<button
					className='bg-blue-500 text-white space-x-2 px-4 py-3 text-lg rounded-2xl cursor-pointer hover:bg-gray-100 hover:text-[#00ADED]'
					onClick={logIn}
				>
					Connect
				</button>
			) : (
				<button
					className='bg-red-500 text-white space-x-2 px-4 py-3 text-lg rounded-2xl hover:bg-gray-100 hover:text-red-700'
					onClick={logOut}
				>
					Disconnect
				</button>
			)}
		</div>
	);
}

export default Sidebar;
