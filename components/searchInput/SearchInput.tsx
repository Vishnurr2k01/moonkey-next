interface Props {
	value: string;
	setValue: (value: string) => void;
	className?: string;
}

const defaultClassName =
	'block border border-silver pl-[38px] pr-[38px] dark:placeholder-white-disabled dark:bg-charcoal dark:border-grey';

export const SearchInput = ({ value, setValue, className }: Props) => {
	return (
		<div className='relative'>
			<img
				src='/icons/search.svg'
				className='absolute w-[16px] ml-[14px] text-graphite dark:text-white-disabled'
			/>
			{value.length > 0 && (
				<button
					onClick={() => setValue('')}
					className='absolute h-full right-0 mr-14 text-graphite hover:text-error'
				>
					<img src='/icons/times.svg' className='w-[12px]' />
				</button>
			)}

			<input
				type='text'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder='Search'
				className={`${defaultClassName} ${className}`}
			/>
		</div>
	);
};
