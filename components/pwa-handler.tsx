"use client"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PWAHandler() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.log("Service Worker registration failed:", error)
      })
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) && !window.matchMedia("(display-mode: standalone)").matches

    setIsIOS(isIOSDevice)

    // Handle beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Hide prompt if app is installed
    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setShowInstallPrompt(false)
      }
    }
  }

  if (!showInstallPrompt && !isIOS) {
    return null
  }

  return (
    <>
      {/* Android/Chrome Install Prompt */}
      {showInstallPrompt && deferredPrompt && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-5">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg shadow-lg p-4 flex items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Installer CardioPath</h3>
              <p className="text-xs text-blue-100 mt-1">Accès rapide depuis votre écran d'accueil</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleInstall} size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                <Download className="w-4 h-4 mr-1" />
                Installer
              </Button>
              <Button
                onClick={() => setShowInstallPrompt(false)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Install Guide */}
      {isIOS && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-5">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-sm mb-2">Installer sur iOS</h3>
            <ol className="text-xs text-purple-100 space-y-1">
              <li>1. Appuyez sur le bouton Partage</li>
              <li>2. Sélectionnez "Sur l'écran d'accueil"</li>
              <li>3. Confirmez l'installation</li>
            </ol>
            <Button
              onClick={() => setIsIOS(false)}
              size="sm"
              className="mt-3 w-full bg-white text-purple-600 hover:bg-purple-50"
            >
              Fermer
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
