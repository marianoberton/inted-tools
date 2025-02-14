import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "INTED UTILS",
  description: "Modern utilities for intelligent decision making",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-[#1B293F]`}>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center p-24">{children}</main>
      </body>
    </html>
  )
}

