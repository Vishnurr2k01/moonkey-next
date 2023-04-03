/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { PromiseOrValue } from './common';
import type {
	MoonKeyGnosisSafeAccountFactory,
	MoonKeyGnosisSafeAccountFactoryInterface,
} from './MoonKeyGnosisSafeAccountFactory';

const _abi = [
	{
		inputs: [
			{
				internalType: 'contract GnosisSafeProxyFactory',
				name: '_proxyFactory',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_safeSingleton',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'salt',
				type: 'uint256',
			},
		],
		name: 'AccountCreated',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'salt',
				type: 'uint256',
			},
		],
		name: 'createAccount',
		outputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'defaultCallback',
		outputs: [
			{
				internalType: 'contract DefaultCallbackHandler',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'salt',
				type: 'uint256',
			},
		],
		name: 'getAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'proxyFactory',
		outputs: [
			{
				internalType: 'contract GnosisSafeProxyFactory',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'safeSingleton',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
] as const;

const _bytecode =
	'0x60e060405234801561001057600080fd5b5060405161117738038061117783398101604081905261002f916100a4565b6001600160a01b03808316608052811660a05260405161004e9061007f565b604051809103906000f08015801561006a573d6000803e3d6000fd5b506001600160a01b031660c052506100de9050565b6106f880610a7f83390190565b6001600160a01b03811681146100a157600080fd5b50565b600080604083850312156100b757600080fd5b82516100c28161008c565b60208401519092506100d38161008c565b809150509250929050565b60805160a05160c05161094a6101356000396000818160ad015261053001526000818160e7015281816101a3015261039f01526000818161010e01528181610167015281816102ee0152610442015261094a6000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638cb84e18116100505780638cb84e18146100cf578063ac7d146b146100e2578063c10f1a751461010957600080fd5b80635fbfb9cf1461006c578063810153e7146100a8575b600080fd5b61007f61007a366004610601565b610130565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61007f7f000000000000000000000000000000000000000000000000000000000000000081565b61007f6100dd366004610601565b61029f565b61007f7f000000000000000000000000000000000000000000000000000000000000000081565b61007f7f000000000000000000000000000000000000000000000000000000000000000081565b60008061013d848461029f565b905073ffffffffffffffffffffffffffffffffffffffff81163b801561016557509050610299565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16631688f0b97f00000000000000000000000000000000000000000000000000000000000000006101cb886104be565b876040518463ffffffff1660e01b81526004016101ea93929190610651565b6020604051808303816000875af1158015610209573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061022d91906106c7565b92508473ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f33310a89c32d8cc00057ad6ef6274d2f8fe22389a992cf89983e09fc84f6cfff8660405161028e91815260200190565b60405180910390a350505b92915050565b6000806102ab846104be565b905060008180519060200120846040516020016102d2929190918252602082015260400190565b60405160208183030381529060405280519060200120905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166353e5d9356040518163ffffffff1660e01b8152600401600060405180830381865afa158015610357573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261039d919081019061071a565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166040516020016103e59291906107e5565b604080518083037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe001815282825280516020918201207fff00000000000000000000000000000000000000000000000000000000000000828501527f000000000000000000000000000000000000000000000000000000000000000060601b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016602185015260358401959095526055808401959095528151808403909501855260759092019052825192019190912095945050505050565b604080516001808252818301909252606091600091906020808301908036833701905050905082816000815181106104f8576104f8610807565b73ffffffffffffffffffffffffffffffffffffffff9092166020928302919091019091015260405160019061055e90839083906000907f000000000000000000000000000000000000000000000000000000000000000090829081908190602401610836565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fb63e800d00000000000000000000000000000000000000000000000000000000179052949350505050565b73ffffffffffffffffffffffffffffffffffffffff811681146105fe57600080fd5b50565b6000806040838503121561061457600080fd5b823561061f816105dc565b946020939093013593505050565b60005b83811015610648578181015183820152602001610630565b50506000910152565b73ffffffffffffffffffffffffffffffffffffffff84168152606060208201526000835180606084015261068c81608085016020880161062d565b604083019390935250601f919091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160160800192915050565b6000602082840312156106d957600080fd5b81516106e4816105dc565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561072c57600080fd5b815167ffffffffffffffff8082111561074457600080fd5b818401915084601f83011261075857600080fd5b81518181111561076a5761076a6106eb565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156107b0576107b06106eb565b816040528281528760208487010111156107c957600080fd5b6107da83602083016020880161062d565b979650505050505050565b600083516107f781846020880161062d565b9190910191825250602001919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6101008082528851908201819052600090610120830190602090818c01845b8281101561088757815173ffffffffffffffffffffffffffffffffffffffff1685529383019390830190600101610855565b505050830189905273ffffffffffffffffffffffffffffffffffffffff888116604085015283820360608501526000825287166080840152602001905073ffffffffffffffffffffffffffffffffffffffff851660a08301528360c083015261090860e083018473ffffffffffffffffffffffffffffffffffffffff169052565b9897505050505050505056fea2646970667358221220cf5102c2f564d597d14ae82c10c4f8f385c8613f6ea57bc3618b3029924ad32664736f6c63430008110033608060405234801561001057600080fd5b506106d8806100206000396000f3fe608060405234801561001057600080fd5b506004361061007c5760003560e01c8063a3f4df7e1161005b578063a3f4df7e1461012c578063bc197c8114610175578063f23a6e61146101b0578063ffa1ad74146101e957600080fd5b806223de291461008157806301ffc9a71461009b578063150b7a02146100c3575b600080fd5b61009961008f36600461037c565b5050505050505050565b005b6100ae6100a9366004610427565b610225565b60405190151581526020015b60405180910390f35b6100fb6100d1366004610470565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100ba565b6101686040518060400160405280601881526020017f44656661756c742043616c6c6261636b2048616e646c6572000000000000000081525081565b6040516100ba91906104df565b6100fb610183366004610590565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b6100fb6101be36600461062a565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b6101686040518060400160405280600581526020017f312e302e3000000000000000000000000000000000000000000000000000000081525081565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e00000000000000000000000000000000000000000000000000000000014806102b857507fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000145b8061030457507fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a700000000000000000000000000000000000000000000000000000000145b92915050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461032e57600080fd5b919050565b60008083601f84011261034557600080fd5b50813567ffffffffffffffff81111561035d57600080fd5b60208301915083602082850101111561037557600080fd5b9250929050565b60008060008060008060008060c0898b03121561039857600080fd5b6103a18961030a565b97506103af60208a0161030a565b96506103bd60408a0161030a565b955060608901359450608089013567ffffffffffffffff808211156103e157600080fd5b6103ed8c838d01610333565b909650945060a08b013591508082111561040657600080fd5b506104138b828c01610333565b999c989b5096995094979396929594505050565b60006020828403121561043957600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461046957600080fd5b9392505050565b60008060008060006080868803121561048857600080fd5b6104918661030a565b945061049f6020870161030a565b935060408601359250606086013567ffffffffffffffff8111156104c257600080fd5b6104ce88828901610333565b969995985093965092949392505050565b600060208083528351808285015260005b8181101561050c578581018301518582016040015282016104f0565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b60008083601f84011261055d57600080fd5b50813567ffffffffffffffff81111561057557600080fd5b6020830191508360208260051b850101111561037557600080fd5b60008060008060008060008060a0898b0312156105ac57600080fd5b6105b58961030a565b97506105c360208a0161030a565b9650604089013567ffffffffffffffff808211156105e057600080fd5b6105ec8c838d0161054b565b909850965060608b013591508082111561060557600080fd5b6106118c838d0161054b565b909650945060808b013591508082111561040657600080fd5b60008060008060008060a0878903121561064357600080fd5b61064c8761030a565b955061065a6020880161030a565b94506040870135935060608701359250608087013567ffffffffffffffff81111561068457600080fd5b61069089828a01610333565b979a969950949750929593949250505056fea26469706673582212204fbee96e3111f0ae5a11abf1d4f68a62c55361d6c461d39e2b7e049fdcdb608664736f6c63430008110033';

type MoonKeyGnosisSafeAccountFactoryConstructorParams =
	| [signer?: Signer]
	| ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
	xs: MoonKeyGnosisSafeAccountFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MoonKeyGnosisSafeAccountFactory__factory extends ContractFactory {
	constructor(...args: MoonKeyGnosisSafeAccountFactoryConstructorParams) {
		if (isSuperArgs(args)) {
			super(...args);
		} else {
			super(_abi, _bytecode, args[0]);
		}
	}

	override deploy(
		_proxyFactory: PromiseOrValue<string>,
		_safeSingleton: PromiseOrValue<string>,
		overrides?: Overrides & { from?: PromiseOrValue<string> }
	): Promise<MoonKeyGnosisSafeAccountFactory> {
		return super.deploy(
			_proxyFactory,
			_safeSingleton,
			overrides || {}
		) as Promise<MoonKeyGnosisSafeAccountFactory>;
	}
	override getDeployTransaction(
		_proxyFactory: PromiseOrValue<string>,
		_safeSingleton: PromiseOrValue<string>,
		overrides?: Overrides & { from?: PromiseOrValue<string> }
	): TransactionRequest {
		return super.getDeployTransaction(
			_proxyFactory,
			_safeSingleton,
			overrides || {}
		);
	}
	override attach(address: string): MoonKeyGnosisSafeAccountFactory {
		return super.attach(address) as MoonKeyGnosisSafeAccountFactory;
	}
	override connect(signer: Signer): MoonKeyGnosisSafeAccountFactory__factory {
		return super.connect(signer) as MoonKeyGnosisSafeAccountFactory__factory;
	}

	static readonly bytecode = _bytecode;
	static readonly abi = _abi;
	static createInterface(): MoonKeyGnosisSafeAccountFactoryInterface {
		return new utils.Interface(
			_abi
		) as MoonKeyGnosisSafeAccountFactoryInterface;
	}
	static connect(
		address: string,
		signerOrProvider: Signer | Provider
	): MoonKeyGnosisSafeAccountFactory {
		return new Contract(
			address,
			_abi,
			signerOrProvider
		) as MoonKeyGnosisSafeAccountFactory;
	}
}
