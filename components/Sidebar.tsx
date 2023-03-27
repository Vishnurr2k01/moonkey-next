'use client';
import { GiTwoCoins } from 'react-icons/gi';
import { BiTransferAlt } from 'react-icons/bi';
import { TbPlanet } from 'react-icons/tb';
import { GrConfigure } from 'react-icons/gr';
import SidebarRow from './SidebarRow';

function Sidebar() {
	return (
		<div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
			<img src='/vercel.svg' className='m-3 h-10 w-10' />
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
