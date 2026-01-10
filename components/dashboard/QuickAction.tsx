import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface QuickActionProps {
    title: string
    description: string
    icon: LucideIcon
    href: string
    gradient: string
    badge?: string
    disabled?: boolean
}

export function QuickAction({
    title,
    description,
    icon: Icon,
    href,
    gradient,
    badge,
    disabled = false
}: QuickActionProps) {
    const Component = disabled ? "div" : Link

    return (
        <Component
            href={disabled ? undefined : href}
            className={cn(
                "group relative block overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300",
                !disabled && "hover:border-slate-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                disabled && "opacity-50 cursor-not-allowed",
                "animate-in fade-in-50 zoom-in-95 duration-500"
            )}
        >
            {/* Background gradient (visible on hover) */}
            <div className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-300",
                gradient,
                !disabled && "group-hover:opacity-100"
            )} />

            {/* Content */}
            <div className="relative bg-white p-6 transition-all duration-300 group-hover:bg-white/95">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={cn(
                        "flex-shrink-0 p-3 rounded-xl shadow-md transition-all duration-300",
                        gradient,
                        !disabled && "group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg"
                    )}>
                        <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className={cn(
                                "font-black text-base text-slate-900 leading-tight transition-colors duration-300",
                                !disabled && "group-hover:text-slate-700"
                            )}>
                                {title}
                            </h3>
                            {badge && (
                                <Badge
                                    variant="secondary"
                                    className="animate-pulse-badge text-[10px] px-2 py-0 h-5"
                                >
                                    {badge}
                                </Badge>
                            )}
                        </div>
                        <p className={cn(
                            "text-sm text-slate-600 leading-relaxed transition-colors duration-300",
                            !disabled && "group-hover:text-slate-500"
                        )}>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Component>
    )
}
