import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'
import ToasterContext from './context/Toaster'
import Provider from './context/AuthContext'
import Head from 'next/head'



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
      <Head>
      <meta name="theme-color" content="#000000"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      </Head>
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
