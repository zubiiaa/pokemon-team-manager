import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokémon Team Builder',
  description: 'Search for your favorite Pokémon and build the ultimate team of 6! Track your team\'s type coverage and battle stats.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  )
} 