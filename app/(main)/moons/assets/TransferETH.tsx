import { Modal } from '@/components/modal/Modal';
import { Button, ButtonSize } from '@/components/button/Button';

interface TransferETHProps {
	amount: string;
	isOpen: boolean;
	setIsOpen: Function;
	onConfirm: Function;
}
export const TransferETH = ({
	amount,
	isOpen,
	setIsOpen,
	onConfirm,
}: TransferETHProps) => {
	return (
		<Modal
			titleElement={<div className='w-full'></div>}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className='flex flex-col items-center text-center px-[40px] pb-[40px]'>
				<img src='/icons/deposit.svg' className='w-3 h-3' />
				<div className='text-[20px] my-[20px]'>Confirm WETH transfer</div>

				<div className='text-[12px] border border-silver dark:border-grey rounded-[20px] p-[15px] w-full'>
					<div className='text-grey dark:text-graphite mb-[5px]'>
						You Will Receive
					</div>
					{amount} WETH
				</div>
				<div className='my-[15px] text-grey dark:text-graphite'>
					WETH is a token that represents ETH 1:1 and conforms to the ERC20
					token standard
				</div>
				<Button
					size={ButtonSize.Full}
					onClick={() => {
						setIsOpen(false);
						onConfirm();
					}}
				>
					Confirm
				</Button>
			</div>
		</Modal>
	);
};
