'use client';
import { useState } from 'react';

export default function SwapSwitch() {
	const [isEnabled, setIsEnabled] = useState(false);
	const labels: JSX.Element[] = [
		<img src='/icons/coins.svg' key='coin' className='w-4 h-3 m-[8px]' />,
		<img src='/icons/dollar.svg' key='dollar' className='w-4 h-3 m-[8px]' />,
	];
	const onClass = 'bg-white dark:bg-charcoal',
		offClass = 'bg-fog dark:bg-black dark:text-white-low text-black-low';
	function setToggle() {
		setIsEnabled(!isEnabled);
	}
	return (
		<div className='w-[80px] h-[40px]'>
			<div className='w-full h-full bg-fog p-[5px] rounded-[14px] flex items-center dark:bg-black'>
				{labels.map((label, index) => (
					<button
						key={label.key}
						className={`rounded-[10px] ${
							(isEnabled && index === 0) || (!isEnabled && index !== 0)
								? offClass
								: onClass
						}`}
						onClick={() => setToggle()}
					>
						{label}
					</button>
				))}
			</div>
		</div>
	);
}
