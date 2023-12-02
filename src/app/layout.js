import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Navbar'
import SessionProvider from '@/app/context/SessionProvider'
import { ChatBox } from '@/app/components/chatbot/chatBox'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DriveGreen - find your next electric vehicle here',
  description: 'DriveGreen is a web store for electric vehicles.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative h-full`}>
        <SessionProvider>
          <Navbar />
          <ChatBox />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
