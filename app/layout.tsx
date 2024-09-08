import type { Metadata } from 'next'
import './globals.css'
import ToasterContext from './context/Toaster'
import Provider from './context/AuthContext'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'



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
      <meta name="theme-color" content="#124B6A"/>
      <meta name="msapplication-navbutton-color" content="#124B6A"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="#124B6A" />
      <body>
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
