//import { Fa } from 'react-icons/fa';
import InputSearch from '@/components/InputSearch';
export default function Home() {
	return (
		<div className='col-span-6'>
			<div className='relative flex items-center justify-center'>
				{/* <BiSearchAlt size={25} /> */}
				<InputSearch />
				{/* <h1>SearchInput</h1> */}
			</div>
		</div>
	);
}
