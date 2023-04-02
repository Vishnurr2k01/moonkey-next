import { ethers } from 'ethers';

const fetchFromDeploy = (ownerAddress: string) => {
	fetch('/api/deploy', {
		method: 'GET',
		body: JSON.stringify({ ownerAddress: ownerAddress }),
		cache: 'no-store',
	}).then((res) => res.json());
};
export default fetchFromDeploy;
