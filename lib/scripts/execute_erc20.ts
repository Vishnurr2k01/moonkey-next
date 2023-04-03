import { ethers } from 'ethers';
import { executeTx } from './execute';

export async function executeErc20(
	ownerAddress: string,
	provider: ethers.providers.JsonRpcProvider,
	amount: number,
	to: string,
	toContract?: string
) {
	const erc20ABI = [
		'function transfer(address to, uint amount) returns (bool)',
	];

	if (!toContract) toContract = '0xE097d6B3100777DC31B34dC2c58fB524C2e76921'; //ERC20 token address
	const erc20 = new ethers.utils.Interface(erc20ABI);
	const callData = erc20.encodeFunctionData('transfer', [to, amount]);
	executeTx(ownerAddress, provider, amount, toContract, callData);
}
