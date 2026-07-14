import type { Metadata } from 'next'
import './globals.css'
import { PublicLayout } from '@/components/layout/LayoutWrapper'
import { ThemeProvider } from '@/components/providers'
import { LanguageProvider } from '@/lib/LanguageContext'

export const metadata: Metadata = {
  title: 'MediGuide AI - AI-Powered Health Insights',
  description:
    'Get instant AI-powered health insights, emergency detection, and personalized medicine recommendations.',
  keywords: [
    'health',
    'AI',
    'symptom checker',
    'medicine',
    'healthcare',
    'Gemini API',
  ],
  authors: [{ name: 'MediGuide AI Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mediguide-ai.vercel.app',
    siteName: 'MediGuide AI',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <PublicLayout>{children}</PublicLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
