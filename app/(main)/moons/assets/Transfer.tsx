'use client';
import { useMemo, useRef, useState } from 'react';
import BigNumber from 'bignumber.js';
import { BigNumber as BigNumberEther } from 'ethers';
import { Image } from '@/components/image/Image';

interface useTokenInputV3Return {
	handleChange: (val: string) => void;
	inputUnit: string;
	oppositeUnit: string;
	inputTkn: string;
	setInputTkn?: (val: string) => void;
	inputFiat: string;
	setInputFiat?: (val: string) => void;
	isTyping: boolean;
	token: TokenMinimal;
}
interface TokenMinimal {
	address: string;
	decimals: number;
	logoURI?: string;
	name?: string;
	symbol: string;
	balance?: string;
	balanceUsd?: number;
	usdPrice?: string;
	isExternal?: boolean;
}
interface Props {
	input?: useTokenInputV3Return;
	isLoading?: boolean;
	onFocus?: () => void;
	handleChange?: (e: any) => void;
	label?: string;
	tokens?: TokenMinimal[];
	disabled?: boolean;
	errorMsg?: string;
	excludedTokens?: string[];
	includedTokens?: string[];
	disableSelection?: boolean;
	readOnly?: boolean;
	balance?: string;
	amount?: string;
	logoURI: string;
	tokenSymbol: string;
}
export const toBigNumber = (
	num: BigNumberEther | string | number | BigNumber
): BigNumber => new BigNumber(num.toString());

function Transfer({
	input,
	isLoading,
	onFocus,
	label,
	tokens,
	disabled,
	errorMsg,
	disableSelection,
	readOnly,
	handleChange,
	logoURI,
	tokenSymbol,
	amount,
	balance,
}: Props) {
	const [isFiat, setIsFiat] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const value = useMemo(() => {
		if (!input) return '';
		return isFiat ? input.inputFiat : input.inputTkn;
	}, [input, isFiat]);
	const handleFocusChange = (state: boolean) => {
		if (state) {
			onFocus && onFocus();
			inputRef.current?.focus();
		} else {
			inputRef.current?.blur();
		}
		setIsFocused(state);
	};
	return (
		<div>
			<div className='flex justify-between px-[10px] mb-[10px] text-charcoal text-opacity-50 dark:text-light dark:text-opacity-50'>
				{label && <div>{label}</div>}
				{balance && Number(balance) > 0 && (
					<button
						onClick={() => {
							if (!disabled && input)
								if (input.token.balanceUsd && isFiat)
									handleChange!(input.token.balanceUsd.toString());
								else if (input.token.balance && !isFiat)
									handleChange!(input.token.balance.toString());
						}}
						className={`flex items-center bg-transparent border-none ${
							disabled
								? 'cursor-text'
								: 'hover:text-primary transition-colors duration-300'
						}`}
					>
						Balance: {balance}
						{!disabled && (
							<span
								className={
									'bg-primary/20 text-primary ml-[5px] px-[6px] py-[2px] rounded-full text-[10px]'
								}
							>
								Max
							</span>
						)}
					</button>
				)}
			</div>
			<div
				className={`border-2 ${
					isFocused ? 'border-primary' : 'border-fog dark:border-grey'
				} ${
					errorMsg ? 'border-error dark:border-error' : ''
				} rounded-full px-[20px] h-[75px] flex items-center bg-white dark:bg-charcoal space-x-[20px]`}
			>
				{tokens && !tokens.length && (
					<div className='flex items-center space-x-10'>
						<div className='bg-silver bg-opacity-30 animate-pulse h-[40px] w-[40px] !rounded-full' />
						<div className='bg-silver bg-opacity-30 animate-pulse rounded-[10px] h-[20px] w-[80px]' />
					</div>
				)}
				<div className='flex-none'>
					{tokenSymbol && (
						<button
							className={`cursor-pointer bg-transparent border-none outline-none flex items-center space-x-10 hover:text-primary transition-colors duration-300`}
							onClick={(e) => {
								if (!disableSelection) {
									e.preventDefault();
									setIsOpen(true);
								}
							}}
						>
							<Image
								alt={'Token Logo'}
								className={'w-[40px] h-[40px] rounded-full'}
								src={logoURI}
							/>
							<div className='text-[20px]'>{tokenSymbol}</div>
						</button>
					)}
				</div>
				{
					<div
						onClick={() => {
							if (!readOnly) handleFocusChange(true);
						}}
						className='flex flex-col border-none justify-center flex-grow h-full text-right cursor-text'
					>
						{!isLoading ? (
							<>
								<input
									ref={inputRef}
									type='number'
									//value={isFocused ? value : ''}
									className='w-full text-right bg-white outline-none text-[20px] dark:bg-charcoal'
									onChange={handleChange}
									placeholder={'0.00'}
									onFocus={() => {
										if (!readOnly) handleFocusChange(true);
									}}
								/>
								{/* {toBigNumber(input.inputTkn).plus(input.inputFiat).gt(0) && (
									<div className='text-charcoal text-opacity-50 dark:text-light dark:text-opacity-50 text-[12px]'>
										{(!isFiat ? input.inputFiat : input.inputTkn, !isFiat)}{' '}
										{input.oppositeUnit}
									</div>
								)} */}
							</>
						) : (
							tokens &&
							(!tokens.length || (isLoading && input)) && (
								<div className='flex flex-col items-end'>
									<div className='w-3/4 mb-[4px] bg-silver bg-opacity-30 animate-pulse rounded-[10px] h-[20px]' />
									<div className='w-1/2 h-[12px] bg-silver bg-opacity-30 animate-pulse rounded-[10px]' />
								</div>
							)
						)}
					</div>
				}
			</div>
		</div>
	);
}

export default Transfer;
