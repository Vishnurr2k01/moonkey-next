import './globals.css';
import Sidebar from '@/components/Sidebar';
import ClientProvider from '@/components/ClientProvider';

export const metadata = {
	title: {
		default: 'Moonkey app',
		template: '%s | Moonkey app',
	},
	description: 'ERC4337 wallet made by moonkey team',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='bg-slate-600/25 h-full'>
				<ClientProvider>
					{/* <main className='grid grid-cols-8'> */}
					{/* <Sidebar /> */}
					{children}
					{/* </main> */}
				</ClientProvider>
			</body>
		</html>
	);
}
