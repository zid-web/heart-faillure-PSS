import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { PWAProvider } from "@/components/pwa-context"
import { FloatingEmergencyButton } from "@/components/floating-emergency-button"
import { BottomNav } from "@/components/bottom-nav"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CardioParcours Sarthe - Insuffisance Cardiaque",
  description:
    "Plateforme de prise en charge intégrée de l'insuffisance cardiaque pour les professionnels de santé en Sarthe",
  generator: "v0.app",
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: "#6B7BE6",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CardioParcours Sarthe",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`font-sans antialiased`}>
        <PWAProvider>
          <FloatingEmergencyButton />
          <div className="pb-20 md:pb-0">
            {children}
          </div>
          <BottomNav />
        </PWAProvider>
        <Analytics />
      </body>
    </html>
  )
}
