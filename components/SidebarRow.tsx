import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
interface Props {
	Icon: IconType; // (props: IconBaseProps) => JSX.Element
	title: string;
}
function SidebarRow({ Icon, title }: Props) {
	return (
		<div className='flex max-w-fit cursor-pointer items-center space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 group'>
			<Icon size={25} />
			<p className='group-hover:text-[#00ADED] hidden md:inline-flex text-base font-light lg:text-xl'>
				{title}
			</p>
		</div>
	);
}

export default SidebarRow;
