'use client';
import { useContext, useEffect, useState } from 'react';
import { GiTwoCoins } from 'react-icons/gi';
import { BiTransferAlt, BiDollarCircle } from 'react-icons/bi';
import { TbPlanet } from 'react-icons/tb';
import { AiFillTool } from 'react-icons/ai';
import { MdVpnKey } from 'react-icons/md';
import SidebarRow from './SidebarRow';
import { ClientContext } from './ClientProvider';
import Divider from './Divider';

function Sidebar() {
	const { safeAuth, safeAuthSignInResponse, logIn, logOut } =
		useContext(ClientContext);
	return (
		<div className='flex flex-col col-span-2 items-center px-4 md:items-start text-gray-300 bg-gray-800 border-gray-800'>
			<div className='flex items-center bg-none'>
				<img src='/moon.svg' className='m-3 h-10 w-10' />
				<p className='font-Kelly text-2xl'>MoonKey</p>
			</div>
			{/* Safe (ERC4337) account */}
			<div className='flex flex-1 flex-col mt-2 items-center bg-gray-700'>
				<div className='flex flex-row items-center text-red-700'>
					{/* Change text color to green when connected to signer */}
					<MdVpnKey size={25} />
					<p className='text-gray-300'>Account-1</p>
				</div>
				<div className='flex flex-row items-center justify-center'>
					<p className='font-bold '>gor:</p>
					<p className='font-light '>0x76F...DEE</p>
				</div>
			</div>
			{/* Divider line */}
			<div className='inset-0 flex items-center place-content-center'>
				<div className='w-3/4 border-t border-gray-300' />
			</div>
			{/* Assets */}
			<SidebarRow Icon={GiTwoCoins} title='Assets' />
			{/* Transactions */}
			<SidebarRow Icon={BiTransferAlt} title='Transactions' />
			{/* Mods */}
			<SidebarRow Icon={AiFillTool} title='Mods' />
			{/* Moons */}
			<SidebarRow Icon={TbPlanet} title='Moons' />
			{/* Divider line */}
			<div className='inset-0 flex items-center place-content-center'>
				<div className='w-3/4 border-t border-gray-300' />
			</div>
			<SidebarRow Icon={BiDollarCircle} title='On-ramp' />
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
