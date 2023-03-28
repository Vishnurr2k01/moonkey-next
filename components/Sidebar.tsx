'use client';
import { GiTwoCoins } from 'react-icons/gi';
import { BiTransferAlt } from 'react-icons/bi';
import { TbPlanet } from 'react-icons/tb';
import { GrConfigure } from 'react-icons/gr';
import { MdVpnKey } from 'react-icons/md';
import SidebarRow from './SidebarRow';

function Sidebar() {
	return (
		<div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
			<div className='flex'>
				<img src='/moon.svg' className='m-3 h-10 w-10' />
				<p className='font-mono'>MoonKey</p>
			</div>
			<div className='flex flex-col'>
				<p>Account-1</p>
				<div className='flex flex-row items-center text-red-700'>
					<MdVpnKey size={25} />
					<p className='font-bold text-gray-800'>gor:</p>
					<p className='font-light text-black'>0x76F...DEE</p>
				</div>
			</div>
			{/* Assets */}
			<SidebarRow Icon={GiTwoCoins} title='Assets' />
			{/* Transactions */}
			<SidebarRow Icon={BiTransferAlt} title='Transactions' />
			{/* Mods */}
			<SidebarRow Icon={GrConfigure} title='Mods' />
			{/* Moons */}
			<SidebarRow Icon={TbPlanet} title='Moons' />
		</div>
	);
}

export default Sidebar;
