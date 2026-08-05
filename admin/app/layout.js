import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'AL ADHWA Studio — Admin Panel',
  description: 'Admin panel for managing blog posts and gallery',
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
