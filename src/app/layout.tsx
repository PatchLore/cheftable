import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mise en Place — Your AI Chef",
  description: "Michelin-level recipes generated for your skill and cuisine.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}