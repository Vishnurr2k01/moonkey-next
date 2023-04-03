import { hexConcat, parseEther, arrayify } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import { fillAndSign, fillUserOp } from './UserOp';
import {
	MoonKeyGnosisSafeAccountFactory__factory,
	EntryPoint__factory,
} from '../typechains';
//import { _abi } from '../typechains/MoonKeyGnosisSafeAccountFactory__factory';
import { getUserOpHash } from './UserOp';
import { UserOperation } from './UserOperation';
import { getHttpRpcClient } from './getHttpRpcClient';

const entrypointAddress = '0x0576a174D229E3cFA37253523E645A78A0C91B57'; //EntryPoint
const accountAddress = '0x92B0C7DA4719E9f784a663dC0DB1931221143739'; //MoonKeyGonosisAccountFactory
const provider = new ethers.providers.JsonRpcProvider(
	`https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
);
export async function deploy(ownerAddress: string) {
	//const ownerAddress = await signer.getAddress();

	const accountFactory = new ethers.Contract(
		accountAddress,
		[
			'function createAccount(address owner, uint256 salt) public returns (address account)',
			'function safeSingleton() returns (address)',
			'function getAddress(address owner, uint256 salt) public returns (address account)',
		],
		provider
	);

	const counterfactualAddress: string =
		await accountFactory.callStatic.getAddress(ownerAddress, 123);

	console.log('safeSingletonAddress', await accountFactory.safeSingleton());
	const initCode = hexConcat([
		accountFactory.address,
		accountFactory.interface.encodeFunctionData('createAccount', [
			ownerAddress,
			123,
		]),
	]);
	console.log('initCode', initCode);

	console.log('counterfactualAddress', counterfactualAddress);
	return { initCode, counterfactualAddress };
}

export async function fillOp(ownerAddress: string) {
	const { initCode, counterfactualAddress } = await deploy(ownerAddress);
	const op = {
		sender: counterfactualAddress,
		initCode,
		verificationGasLimit: 400000,
	};
	const op2 = await fillUserOp(
		op,
		entrypointAddress,
		provider as ethers.providers.Provider
	);
	const chainId = await provider!.getNetwork().then((net) => net.chainId);
	const message = getUserOpHash(op2, entrypointAddress, chainId);
	console.log('UserOpUnsigned: ', op);
	return {
		message: message,
		op2: op2,
		counterfactualAddress: counterfactualAddress,
	};
}

export async function createWallet(op: UserOperation) {
	console.log('UserOperation: ', op);
	const client = await getHttpRpcClient(
		provider,
		process.env.NEXT_PUBLIC_BUNDLER_URL!,
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

	const entryPoint = new EntryPoint__factory(owner).attach(entrypointAddress);

	const accountFactory = new MoonKeyGnosisSafeAccountFactory__factory(
		owner
	).attach(accountAddress);
	console.log('safeSingletonAddress', await accountFactory.safeSingleton());

	const initCode = hexConcat([
		accountFactory.address,
		accountFactory.interface.encodeFunctionData('createAccount', [
			ownerAddress,
			123,
		]),
	]);
	console.log('initCode', initCode);

	const counterfactualAddress = await accountFactory.callStatic.getAddress(
		ownerAddress,
		123
	);
	console.log('counterfactualAddress', counterfactualAddress);

	await owner.sendTransaction({
		to: counterfactualAddress,
		value: parseEther('0.1'),
	});

	const op = await fillAndSign(
		{
			sender: counterfactualAddress,
			initCode,
			verificationGasLimit: 400000,
		},
		owner,
		entryPoint
	);
	const client = await getHttpRpcClient(
		provider,
		process.env.BUNDLER_URL!,
		entrypointAddress
	);
	const uoHash = await client.sendUserOpToBundler(op);
	console.log(`UserOpHash: ${uoHash}`);

	console.log('Waiting for transaction...');
}
const signer = provider.getSigner();
	const af = new ethers.Contract(accountAddress, _abi, signer);

	const erc20ABI = _abi;

	const toContract = '0xE097d6B3100777DC31B34dC2c58fB524C2e76921'; //ERC20 token address
	const accountInterface = new ethers.utils.Interface(erc20ABI);
	const unsignedHash = accountInterface.encodeFunctionData('createAccount', [
		ownerAddress,
		123,
	]);
	const cfa = af.callStatic.getAddress(ownerAddress,
		123)
*/
