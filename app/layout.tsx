import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'
import ToasterContext from './context/Toaster'
import Provider from './context/AuthContext'

export const metadata: Metadata = {
  title: 'NewGen Digital Media',
  description: 'Johnson City Web Design and Development. Website under construction.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <Provider>
          <Navbar />
            <ToasterContext />
            {children}
          <Footer />

        </Provider>
      </body>
    </html>
  )
}
