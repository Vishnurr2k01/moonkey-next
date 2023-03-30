'use client';

import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import fetchFromHello from '@/lib/fetchFromHello';

function InputSearch() {
	const [input, setInput] = useState('');
	const { data, error, isLoading } = useSWR('/api/hello', fetchFromHello, {
		revalidateOnFocus: false,
	});

	const submitSearch = async (useSuggestion?: boolean) => {
		const inputPrompt = input;
		console.log(inputPrompt);
		setInput('');
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await submitSearch();
	};

	const loading = true;

	return (
		<div className='m-3'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x'
			>
				<textarea
					placeholder={'Enter an Appname or QmxHash...'}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className='flex-1 p-4 outline-none rounded-md'
				/>
				<button
					className={`p-4 ${
						input
							? 'bg-violet-500 text-white transition-colors duration-200'
							: 'text-gray-300 cursor-not-allowed'
					} font-bold`}
					type='submit'
					disabled={!input}
				>
					Search
				</button>
			</form>

			{input && (
				<p className='italic pt-2 pl-2 font-light'>
					Suggestion:{' '}
					<span className='text-violet-500'>
						{loading ? 'Loading suggestion...' : null}
					</span>
				</p>
			)}
		</div>
	);
}

export default InputSearch;
