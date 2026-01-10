"use client"

import { Phone, AlertCircle } from "lucide-react"
import { useState } from "react"

export function FloatingEmergencyButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleCall = () => {
    console.log("[v0] Emergency call triggered")
    window.location.href = "tel:0243784572"
  }

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 w-48 rounded-lg bg-destructive text-white p-3 text-sm shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4" />
            <span className="font-semibold">Appel d'urgence cardiaque</span>
          </div>
          <p className="text-xs opacity-90">02 43 78 45 72</p>
        </div>
      )}

      <button
        onClick={handleCall}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center justify-center h-16 w-16 rounded-full bg-destructive text-white shadow-lg hover:shadow-xl hover:shadow-destructive/50 transition-all duration-200 animate-pulse-soft hover:scale-110 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 active:scale-95"
        aria-label="Appel d'urgence cardiaque - 02 43 78 45 72"
        type="button"
      >
        <Phone className="h-7 w-7" />
      </button>
    </div>
  )
}
