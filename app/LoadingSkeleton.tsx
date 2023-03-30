'use client';

import { useState } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

function LoadingSkeleton({pagename}: any) {
    const [name, setName] = useState('')
    if(pagename !== undefined) setName(pagename)
	return (
		<div className='bg-[#091B18] min-h-screen flex flex-col items-center text-center justify-center'>
			<div className='flex flex-col items-center mb-10'>
				<div className='flex items-center space-x-2'>
					<img src='/moon.svg' className='m-4 h-20 w-20' />
					<p className='font-Kelly text-6xl'>MoonKey</p>
				</div>
				<h1 className='text-6xl text-white font-bold'>Loading {pagename}</h1>
				{/* <h2 className='text-white'>Stripe onramp</h2> */}
				<PropagateLoader color='white' size={30} />
			</div>
		</div>
	);
}

export default LoadingSkeleton;
