"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
    title: string
    value: number | string
    icon: LucideIcon
    trend?: "up" | "down" | "neutral"
    trendValue?: string
    suffix?: string
    variant?: "default" | "primary" | "success" | "danger"
    animated?: boolean
}

const variantStyles = {
    default: "from-slate-50 to-slate-100 border-slate-200",
    primary: "from-blue-50 to-blue-100 border-blue-200",
    success: "from-emerald-50 to-emerald-100 border-emerald-200",
    danger: "from-red-50 to-red-100 border-red-200",
}

const iconVariantStyles = {
    default: "bg-slate-600",
    primary: "bg-blue-600",
    success: "bg-emerald-600",
    danger: "bg-red-600",
}

const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
}

const trendColors = {
    up: "text-emerald-600",
    down: "text-red-600",
    neutral: "text-slate-500",
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    suffix = "",
    variant = "default",
    animated = true
}: StatsCardProps) {
    const [displayValue, setDisplayValue] = useState(animated ? 0 : value)
    const TrendIcon = trend ? trendIcons[trend] : null

    useEffect(() => {
        if (!animated || typeof value !== "number") {
            setDisplayValue(value)
            return
        }

        const duration = 1500
        const steps = 60
        const increment = value / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setDisplayValue(value)
                clearInterval(timer)
            } else {
                setDisplayValue(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [value, animated])

    return (
        <Card className={cn(
            "border-2 bg-gradient-to-br transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
            variantStyles[variant],
            "animate-in fade-in-50 slide-in-from-left-4 duration-700"
        )}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                        "p-2.5 rounded-lg shadow-sm",
                        iconVariantStyles[variant]
                    )}>
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                    {trend && TrendIcon && (
                        <div className={cn("flex items-center gap-1 text-sm font-semibold", trendColors[trend])}>
                            <TrendIcon className="h-4 w-4" />
                            {trendValue && <span>{trendValue}</span>}
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
                    <p className="text-3xl font-black text-slate-900 tabular-nums">
                        {displayValue}{suffix}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
