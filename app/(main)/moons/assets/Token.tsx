import { Image } from '@/components/image/Image';
function Token({ name, handleClicked, logo, setTokenSymbol, setLogoURI }: any) {
	return (
		<>
			<div className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-silver rounded'>
				<div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
					<div className='w-full relative flex justify-between px-4'>
						<div className='flex items-center space-x-10 hover:text-primary transition-colors duration-300'>
							<Image
								alt={'Token Logo'}
								className={'w-[40px] h-[40px] rounded-full'}
								src={logo}
							/>
							<div className='text-[20px]'>{name}</div>
						</div>
						<button
							onClick={async () => {
								setTokenSymbol(name);
								setLogoURI(logo);
								await handleClicked();
							}}
							className='text-gray-500 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none'
						>
							Transfer
						</button>
					</div>
				</div>
			</div>
			<div className='h-0 my-2 border border-solid border-t-0 border-slate-800 opacity-25' />
		</>
	);
}

export default Token;
