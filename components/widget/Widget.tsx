import SwapSwitch from './SwapSwitch';

interface Props {
	title: string;
	subtitle?: string;
	goBack?: Function;
	children: JSX.Element | JSX.Element[];
}
export const Widget = ({ title, subtitle, children, goBack }: Props) => {
	const handleBackClick = () => {
		goBack && goBack();
	};

	return (
		<section className='bg-white w-full md:max-w-[483px] 2xl:min-w-[483px] p-[10px] md:rounded-[30px] mx-auto'>
			<div className='flex justify-between py-[16px] px-[20px]'>
				<SwapSwitch />
				<div className='flex items-center justify-center flex-col'>
					<h1 className='text-[20px] font-semibold'>{title}</h1>
					{subtitle && <h2 className='font-normal'>{subtitle}</h2>}
				</div>
				<div className='flex justify-end w-[80px]'>
					<button onClick={() => handleBackClick()}>
						<img src='/icons/times.svg' className='w-[15px]' />
					</button>
				</div>
			</div>
			<hr className='border-t mb-[20px] -mx-[10px] border-silver dark:border-black-low' />
			{children}
		</section>
	);
};
