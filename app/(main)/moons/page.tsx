import { AiFillStar } from 'react-icons/ai';
import InputSearch from '@/components/InputSearch';
import CowSwap from '@/components/CowSwap';

export default function Home() {
	return (
		<div className='col-span-6 bg-[#F7F7F7]'>
			<div className='relative flex items-center justify-center'>
				{/* <BiSearchAlt size={25} /> */}
				<InputSearch />
				{/* <h1>SearchInput</h1> */}
			</div>
			{/* MainApp content */}
			<div>
				{/* Moons as a card list */}
				<div className='ml-2 w-1/2 p-4 rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5'>
					<div className='flex justify-between'>
						<div>
							<iframe
								title='Cow Swap logo'
								srcDoc='
					<body style="margin: 0; overflow: hidden;">
					<img src="https://swap.cow.fi/favicon.png" alt="App logo" width="90" height="90" />
					<script>
					document.querySelector("img").onerror = (e) => {
						e.target.onerror = null
						e.target.src = "/images/apps/app-placeholder.svg"
					}
					</script>
					</body>'
								sandbox='allow-scripts'
								referrerPolicy='strict-origin'
								width={90}
								height={90}
								tabIndex={-1}
								loading='lazy'
								style={{ border: 0 }}
							></iframe>
						</div>
						<AiFillStar size={12} className='text-yellow-600' />
					</div>
					<div>
						<h5 className='font-bold'>CoW Swap</h5>
						<p className='truncate break-normal'>
							CoW Swap finds the lowest prices from all decentralized exchanges
							and DEX aggregators & saves you more with p2p trading and
							protection from MEV
						</p>
					</div>
					<div>
						<CowSwap />
					</div>
				</div>
			</div>
		</div>
	);
}
