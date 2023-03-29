import Sidebar from '@/components/Sidebar';
import ClientProvider from '@/components/ClientProvider';

export const metadata = {
	title: 'Safe',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='bg-slate-600'>
				<ClientProvider>
					<main className='grid grid-cols-8'>
						<Sidebar />
						{children}
					</main>
				</ClientProvider>
			</body>
		</html>
	);
}
