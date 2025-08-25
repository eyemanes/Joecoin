import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from 'jotai';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Joe Solana - Retro Desktop Experience',
  description: 'Joe Solana, Hey my name is joe. Experience the nostalgia of Windows 98 with Joe 98',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
