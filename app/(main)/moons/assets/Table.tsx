'use client';
import { useState, useMemo } from 'react';
import { useTable } from 'react-table';
const assetsData = [
	{
		token: 'MATIC',
		balance: '1.22',
		address: '0x123matic',
	},
	{
		token: 'WETH',
		balance: '0',
		address: '0x123matic',
	},
	{
		token: 'DAI',
		balance: '0',
		address: '0x123matic',
	},
	{
		token: 'USDC',
		balance: '0',
		address: '0x123matic',
	},
	{
		token: 'USDT',
		balance: '0',
		address: '0x123matic',
	},
];
function Table() {
	const data = useMemo(() => assetsData, []);
	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'token',
			},
			{
				Header: 'Balance',
				accessor: 'balance',
			},
			{
				Header: 'address',
				accessor: 'address',
			},
		],
		[]
	);
	//const table = useTable({columns,data})
	return <div>Table</div>;
}

export default Table;
