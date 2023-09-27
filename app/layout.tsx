

import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import SearchModal from '@/components/SearchModal'
import React from "react"
import LayoutContext from '@/components/LayoutContext'


export const metadata: Metadata = {
  title: 'Tvflix',
  description: 'Tvflix is a pupular movie app built by newmanadesan, designed and mentored and tutored by codewithsadee',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <body>
        <LayoutContext>
          <Header />
          <main>
            <SideBar
            />
            { children }
            <SearchModal />
          </main>
        </LayoutContext>
      </body>
    </html>
  )
}
