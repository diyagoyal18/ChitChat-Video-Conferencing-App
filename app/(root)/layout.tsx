import StreamVideoProvider from '@/providers/streamClientProvider'
import { Metadata } from 'next';
import React, { Children, ReactNode } from 'react'

export const metadata: Metadata = {
  title: "ChitChat",
  description: "A Video Conferencing App",
  icons:{
    icon: '/images/video.png'
  }
};
const RootLayout = ({children}: {children : ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>

        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout
