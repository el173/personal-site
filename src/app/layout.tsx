import './globals.css'
import type { Metadata } from 'next'

import { Poppins } from 'next/font/google'

// Subsets are really important. CHECK BELOW FOR MORE INFO
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Hashith Karunarathne - EL173',
  description: 'Personal portfolio - Hashith Karunarathne EL173',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
