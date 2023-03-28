//import { Fa } from 'react-icons/fa';
import InputSearch from '@/components/InputSearch';
import SocialLogin from '@/components/SocialLogin';
export default function Home() {
	return (
		<div className='col-span-6'>
			<div className='relative flex items-center justify-center'>
				{/* <BiSearchAlt size={25} /> */}
				<InputSearch />
				{/* <h1>SearchInput</h1> */}
			</div>
			{/* MainApp content */}
			<div>
				<div className='p-4 border bg-slate-400'>
					Card content
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
				<SocialLogin />
			</div>
		</div>
	);
}
