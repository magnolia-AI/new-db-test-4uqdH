import Link from 'next/link';
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Next.js Template',
  description: 'A customizable template built with Next.js and Tailwind CSS',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full flex flex-col antialiased">
        <ThemeProvider defaultTheme="light" attribute="class">
          <main className="flex-1">
          <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between">
              <Link href="/" className="font-bold">Home</Link>
              <nav>
                <Link href="/todo" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Todo</Link>
              </nav>
            </div>
          </header>
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


