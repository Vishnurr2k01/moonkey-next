import { ethers } from 'ethers';
import { fillAndSign } from './UserOp';
import { getHttpRpcClient } from './getHttpRpcClient';
import {
	MoonKeyGnosisSafeAccountFactory__factory,
	EntryPoint__factory,
	MoonKeyPluginSafe__factory,
} from '../typechains';

const entrypointAddress = '0x0576a174D229E3cFA37253523E645A78A0C91B57'; //EntryPoint
const accountAddress = '0x92B0C7DA4719E9f784a663dC0DB1931221143739'; //MoonKeyGonosisAccountFactory
const safeSingletonAddress = '0x9846f4a9E0FB5Fe40c9007054a80e6239242B983'; //MoonKeyPluginSafe

export async function executeTx(
	wallet: ethers.Wallet,
	provider: ethers.providers.JsonRpcProvider,
	amount: number,
	to: string,
	callData: string
) {
	const owner = wallet.connect(provider);
	const ownerAddress = await owner.getAddress();

	const safeSingleton = new MoonKeyPluginSafe__factory(owner).attach(
		safeSingletonAddress
	);
	const safe_execTxCallData = safeSingleton.interface.encodeFunctionData(
		'executeAndRevert',
		[to, amount, callData, 0]
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
