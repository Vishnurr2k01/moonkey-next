// import { classNameGenerator } from '@/utils/pureFunctions';
import SwapSwitch from './SwapSwitch';

interface SwapHeaderProps {
	isLimit: boolean;
	setIsLimit: Function;
}

export const SwapHeader = ({ isLimit, setIsLimit }: SwapHeaderProps) => {
	// const marketActive = classNameGenerator({
	// 	'text-charcoal': !isLimit,
	// });

	// const limitActive = classNameGenerator({
	// 	'text-charcoal': isLimit,
	// });

	return (
		<div>
			<div className='flex justify-between items-center text-graphite text-[22px] py-16 px-20'>
				<div>
					<button
						className={`${isLimit ? '' : 'text-charcoal'}`}
						onClick={() => setIsLimit(false)}
					>
						Tokens
					</button>
					<span className='border-r b-silver mx-12' />
					<button
						className={`${isLimit ? 'text-charcoal' : ''}`}
						onClick={() => setIsLimit(true)}
					>
						NFTs
					</button>
				</div>

				<div className={'flex items-center space-x-20'}>
					<SwapSwitch />
				</div>
			</div>
		</div>
	);
};
