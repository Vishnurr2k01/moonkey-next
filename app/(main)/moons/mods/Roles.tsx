import { ethers } from 'ethers';

function Roles() {

    const setDefaultRole = () => {
		let prov = new ethers.providers.EtherscanProvider('maticmum');
	};

    return (
		<div className='col-span-6 bg-[#F7F7F7] h-full'>
			{/* Header tab goes here */}
			{/* <div className='flex flex-col items-center justify-center h-screen px-2'> */}
			<div className='flex flex-wrap py-2'>
				<div className='w-full px-4'>
					<h1 className='text-2xl font-bold mb-10'>Roles</h1>
                    <div className='flex space-x-2'>
						<div className='space-x-2 justify-between'>
                            <div className='flex'>
                                <input className='flex w-full bg-transparent text-[#091F1C] text-right mb-4'
                                    type='text'
                                    placeholder={'Enter default role'}/>
                            </div>
                            <div className='space-y-2 flex-col text-white'>
                            <button
                                className='flex items-center justify-center cursor-pointer p-4 bg-blue-700/50 rounded-lg max-w-[300px] text-white hover:bg-blue-700/90'>
                                    <span className='m-1'>Set default role</span>
                                </button>
                            </div>
                            <div className='flex'>
                                <input className='flex w-full bg-transparent text-[#091F1C] text-right mt-4 mb-4'
                                    type='text'
                                    placeholder={'Enter target'}/>
                            </div>
                            <div className='space-y-2 flex-col text-white'>
                            <button
                                className='flex items-center justify-center cursor-pointer p-4 bg-blue-700/50 rounded-lg max-w-[300px] text-white hover:bg-blue-700/90'>
                                    <span className='m-1'>Set target</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
		    </div>
        </div>
    );
}
export default Roles;