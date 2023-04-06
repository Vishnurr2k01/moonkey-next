import { ethers } from 'ethers';
import { fillUserOp, getUserOpHash } from './UserOp';
import { arrayify, defaultAbiCoder, hexConcat } from 'ethers/lib/utils';
import { _abi } from '../typechains/VerifyingPaymaster__factory';
import { UserOperation } from './UserOperation';

const entrypointAddress = '0x0576a174D229E3cFA37253523E645A78A0C91B57'; //EntryPoint
const paymasterAddress = '0x6D0Bc38A66DCe1Eb51D0fb087abAD151Ac49cD2F'; //VerifyingPaymaster
const accountAddress = '0x54034b9063Cb8AB49B0Cd5500Ba44cbb1405984D'; //MoonKeyGonosisAccountFactory
const VALID_UNTIL = 1777068462;
const VALID_AFTER = 0;

export async function paymaster(
	ownerAddress: string,
	provider: ethers.providers.JsonRpcProvider,
	amount: number,
	to: string,
	toContract?: string
) {
	const erc20ABI = [
		'function transfer(address to, uint amount) returns (bool)',
	];
	let callData = '0x';
	if (toContract && toContract !== '') {
		const erc20 = new ethers.utils.Interface(erc20ABI);
		callData = erc20.encodeFunctionData('transfer', [to, amount]);
		to = toContract;
	}
	//if (!toContract) toContract = '0xE097d6B3100777DC31B34dC2c58fB524C2e76921'; //ERC20 token address
	//executeTx(ownerAddress, provider, amount, toContract, callData);
	const accountFactory = new ethers.Contract(
		accountAddress,
		[
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
	// Paymaster data
	const op = {
		sender: counterfactualAddress, //The account
		callData: safe_execTxCallData,
		paymasterAndData: hexConcat([
			paymasterAddress,
			defaultAbiCoder.encode(['uint48', 'uint48'], [VALID_UNTIL, VALID_AFTER]),
			'0x' + '00'.repeat(65),
		]),
	};

	const userOp = await fillUserOp(
		op,
		entrypointAddress,
		provider as ethers.providers.Provider
	);

	console.log('UserOp', userOp);
	const chainId = await provider!.getNetwork().then((net) => net.chainId);
	const message = arrayify(getUserOpHash(userOp, entrypointAddress, chainId));

	return {
		message: message,
		userOp: userOp,
		counterfactualAddress: counterfactualAddress,
	};
}

export async function paymasterSigned(
	op: UserOperation,
	provider: ethers.providers.JsonRpcProvider
) {
	const paymaster = new ethers.Contract(paymasterAddress, _abi, provider);
	// Sign OffChain to verify as paymaster
	const hash = await paymaster.callStatic.getHash(op, VALID_UNTIL, VALID_AFTER);

	//const offchainSigner = new ethers.Wallet(
	//	process.env.NEXT_PUBLIC_PAYMASTER_OWNER_PRIVATE_KEY!,
	//	provider
	//);
	//const sig = await offchainSigner.signMessage(arrayify(hash));
	const sig = await fetch('/api/paymaster', {
		method: 'POST',
		body: JSON.stringify({ provider: provider, hash: hash }),
		cache: 'no-store',
	}).then((res) => res.json());
	console.log('Paymaster Sig: ', sig);

	// Build userOperation
	const userOp = await fillUserOp(
		{
			...op,
			paymasterAndData: hexConcat([
				paymasterAddress,
				defaultAbiCoder.encode(
					['uint48', 'uint48'],
					[VALID_UNTIL, VALID_AFTER]
				),
				sig,
			]),
		},
		entrypointAddress,
		provider as ethers.providers.Provider
	);
	console.log('UserOp', userOp);
	const chainId = await provider!.getNetwork().then((net) => net.chainId);
	const message = arrayify(getUserOpHash(userOp, entrypointAddress, chainId));

	return {
		message: message,
		userOp: userOp,
	};
}
