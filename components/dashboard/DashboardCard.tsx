import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
    title: string
    description?: string
    icon: LucideIcon
    href?: string
    badge?: string
    variant?: "default" | "primary" | "success" | "danger"
    interactive?: boolean
    onClick?: () => void
    children?: React.ReactNode
}

const variantStyles = {
    default: "border-slate-200 hover:border-slate-300 hover:shadow-lg",
    primary: "border-blue-200 hover:border-blue-300 hover:shadow-blue-100 hover:shadow-lg",
    success: "border-emerald-200 hover:border-emerald-300 hover:shadow-emerald-100 hover:shadow-lg",
    danger: "border-red-200 hover:border-red-300 hover:shadow-red-100 hover:shadow-lg",
}

const iconVariantStyles = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-gradient-to-br from-blue-500 to-blue-700 text-white",
    success: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
    danger: "bg-gradient-to-br from-red-500 to-red-700 text-white",
}

export function DashboardCard({
    title,
    description,
    icon: Icon,
    href,
    badge,
    variant = "default",
    interactive = true,
    onClick,
    children
}: DashboardCardProps) {
    const CardWrapper = href ? "a" : "div"

    return (
        <CardWrapper
            href={href}
            onClick={onClick}
            className={cn(
                "block group",
                interactive && "cursor-pointer"
            )}
        >
            <Card className={cn(
                "h-full border-2 transition-all duration-300",
                variantStyles[variant],
                interactive && "hover:scale-[1.02] active:scale-[0.98]",
                "animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
            )}>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={cn(
                            "p-3 rounded-xl shadow-md transition-transform duration-300",
                            iconVariantStyles[variant],
                            interactive && "group-hover:scale-110 group-hover:rotate-3"
                        )}>
                            <Icon className="h-6 w-6" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-slate-900 text-base leading-tight">
                                    {title}
                                </h3>
                                {badge && (
                                    <Badge
                                        variant="secondary"
                                        className="text-[10px] px-1.5 py-0 h-5 animate-pulse-badge"
                                    >
                                        {badge}
                                    </Badge>
                                )}
                            </div>
                            {description && (
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {description}
                                </p>
                            )}
                            {children}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </CardWrapper>
    )
}
