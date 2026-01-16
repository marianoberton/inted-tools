import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "INTED Tools",
  description: "Modern utilities for intelligent decision making",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} font-sans bg-white text-[#1B293F]`}>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center p-24">{children}</main>
      </body>
    </html>
  )
}

