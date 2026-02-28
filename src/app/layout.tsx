import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mise en Place — Your AI Chef",
  description: "Michelin-level recipes generated for your skill, occasion, and cuisine — every time unique, every time technically precise.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        {children}
        <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}