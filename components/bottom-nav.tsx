"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Map, Activity, Settings, Calculator, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Accueil",
      href: "/",
      icon: Home,
    },
    {
      label: "Parcours",
      href: "/parcours",
      icon: Map,
    },
    {
      label: "Algos",
      href: "/algorithms",
      icon: Activity,
    },
    {
      label: "Savoirs",
      href: "/recommandations",
      icon: BookOpen,
    },
    {
      label: "Calculs",
      href: "/calculator",
      icon: Calculator,
    },
  ]

  // Hide on screens that are clearly desktop (optional, but requested Mobile First)
  // For now we will show it always on small screens, maybe hide on md?
  // But user said "front page in application mode", implying it should look like an app.

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-current/20")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
