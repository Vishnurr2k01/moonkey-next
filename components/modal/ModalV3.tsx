'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface Props {
	title?: string;
	children: JSX.Element;
	separator?: boolean;
	titleElement?: ReactNode;
	setIsOpen?: (isOpen: boolean) => void;
	isOpen: boolean;
	onBackClick?: Function;
	showBackButton?: boolean;
	onClose?: Function;
	large?: boolean;
}

export const ModalV3 = ({
	title,
	children,
	separator,
	titleElement,
	setIsOpen,
	isOpen,
	showBackButton,
	onBackClick,
	onClose,
	large,
}: Props) => {
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as='div'
					className='fixed inset-0 z-40 rounded-lg'
					onClose={() => (onClose ? onClose() : setIsOpen!(false))}
				>
					<div className='min-h-screen px-[10px] text-center'>
						{/* <Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Dialog.Overlay className='fixed inset-0 bg-black backdrop-filter backdrop-blur bg-opacity-70' />
						</Transition.Child> */}

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className='inline-block h-screen align-middle'
							aria-hidden='true'
						></span>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<div
								className={`inline-block w-full shadow-2xl ${
									large ? 'max-w-[485px]' : 'max-w-[380px]'
								} overflow-hidden align-middle transition-all transform rounded-40 bg-white dark:bg-charcoal text-left`}
							>
								<Dialog.Title className='flex items-center justify-between mb-[20px] px-[30px] text-[20px] mt-[30px]'>
									<div className='flex items-center text-[20px] ml-2'>
										{showBackButton && (
											<button onClick={() => onBackClick && onBackClick()}>
												<img
													src='/icons/chevronRight.svg'
													className='w-[24px] transform rotate-180'
												/>
											</button>
										)}
										{title && title}
									</div>
									<div className='flex items-center space-x-10'>
										{titleElement && titleElement}
										<button
											onClick={() => setIsOpen!(false)}
											className='px-[5px] py-[2px] border-none bg-transparent cursor-pointer'
										>
											<img src='/icons/times.svg' className='w-3 border-none' />
										</button>
									</div>
								</Dialog.Title>
								<div className='max-h-[80vh] overflow-auto'>
									{separator && (
										<hr className='m-0 border-t mb-[20px] -mx-[10px] border-silver dark:border-black-low' />
									)}
									{children}
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
