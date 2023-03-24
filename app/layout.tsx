import './globals.css';

export const metadata = {
	title: 'Moonkey app',
	description: 'ERC4337 wallet made by moonkey team',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
