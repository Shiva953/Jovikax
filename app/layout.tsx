import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "./providers";
import './globals.css'
import  SessionProvider  from '../components/SessionProvider';
import { getServerSession } from 'next-auth';
import NavMenu from '@/components/NavMenu';
import Particles from '@/components/particles';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jovikax',
  description: 'A place for you to post funny programming jokes by adding the best puns to given setups.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className='purple-dark text-foreground bg-background bg-gradient-radial'>
      <body className={inter.className}>
        <SessionProvider session={session}> 
      <Providers>
        <NavMenu/>
        <Particles className="absolute inset-0 pointer-events-none" quantity={50} />
        {children}
      </Providers>
      </SessionProvider>
        </body>
    </html>
  )
}
