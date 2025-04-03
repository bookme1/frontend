import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="manifest" href="/manifest.json" />
            <body>{children}</body>
        </html>
    );
}
