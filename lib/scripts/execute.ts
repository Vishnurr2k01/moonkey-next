import { ethers } from 'ethers';
import { fillAndSign, fillUserOp, getUserOpHash } from './UserOp';
import { getHttpRpcClient } from './getHttpRpcClient';
import {
	MoonKeyGnosisSafeAccountFactory__factory,
	EntryPoint__factory,
	MoonKeyPluginSafe__factory,
} from '../typechains';
import { arrayify } from 'ethers/lib/utils';

const entrypointAddress = '0x0576a174D229E3cFA37253523E645A78A0C91B57'; //EntryPoint
const accountAddress = '0x92B0C7DA4719E9f784a663dC0DB1931221143739'; //MoonKeyGonosisAccountFactory
//const safeSingletonAddress = '0x9846f4a9E0FB5Fe40c9007054a80e6239242B983'; //MoonKeyPluginSafe

export async function executeTx(
	ownerAddress: string,
	provider: ethers.providers.JsonRpcProvider,
	amount: number,
	to: string,
	callData: string
) {
	//const owner = wallet.connect(provider);
	//const ownerAddress = await owner.getAddress();
	//

	const accountFactory = new ethers.Contract(
		accountAddress,
		[
			'function createAccount(address owner, uint256 salt) public returns (address account)',
			'function safeSingleton() returns (address)',
			'function getAddress(address owner, uint256 salt) public returns (address account)',
		],
		provider
	);

	const safeSingleton = new ethers.Contract(
		await accountFactory.callStatic.safeSingleton(),
		[
			'function executeAndRevert(address to,uint256 value,bytes calldata data,uint8 operation) external',
		],
		provider
	);
	const safe_execTxCallData = safeSingleton.interface.encodeFunctionData(
		'executeAndRevert',
		[to, amount, callData, 0]
	);

	const counterfactualAddress = await accountFactory.callStatic.getAddress(
		ownerAddress,
		1234
	);
	const op = {
		sender: counterfactualAddress, //The account
		callData: safe_execTxCallData,
	};
	const op2 = await fillUserOp(
		op,
		entrypointAddress,
		provider as ethers.providers.Provider
	);
	// const entryPoint = new EntryPoint__factory(owner).attach(entrypointAddress);
	// const op = await fillAndSign(
	// 	{
	// 		sender: counterfactualAddress, //The account
	// 		callData: safe_execTxCallData,
	// 	},
	// 	owner,
	// 	entryPoint
	// );
	console.log('UserOp', op2);
	const chainId = await provider!.getNetwork().then((net) => net.chainId);
	const message = arrayify(getUserOpHash(op2, entrypointAddress, chainId));

	return {
		message: message,
		op2: op2,
		counterfactualAddress: counterfactualAddress,
	};
}
/*
async function main() {
	if (!process.env.PRIVATE_KEY)
		throw new Error('Missing environment: Private key');
	const provider = new ethers.providers.JsonRpcProvider(
		`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`
	);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
	const owner = wallet.connect(provider);
	const ownerAddress = await owner.getAddress();

	const safeSingleton = new MoonKeyPluginSafe__factory(owner).attach(
		safeSingletonAddress
	);
	const safe_execTxCallData = safeSingleton.interface.encodeFunctionData(
		'executeAndRevert',
		['0x109Bf5E11140772a1427162bb51e23c244d13b88', 1, '0x', 0]
	);

	const accountFactory = new MoonKeyGnosisSafeAccountFactory__factory(
		owner
	).attach(accountAddress);

	const counterfactualAddress = await accountFactory.callStatic.getAddress(
		ownerAddress,
		123
	);

	const entryPoint = new EntryPoint__factory(owner).attach(entrypointAddress);
	const op = await fillAndSign(
		{
			sender: counterfactualAddress, //The account
			callData: safe_execTxCallData,
		},
		owner,
		entryPoint
	);
	console.log('UserOp', op);

	const client = await getHttpRpcClient(
		provider,
		process.env.BUNDLER_URL!,
		entrypointAddress
	);
	const uoHash = await client.sendUserOpToBundler(op);
	console.log(`UserOpHash: ${uoHash}`);

	console.log('Waiting for transaction...');
	//   const txHash = await accountAPI.getUserOpReceipt(uoHash);
	//   console.log(`Transaction hash: ${txHash}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
*/
