import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  trend?: number
  prefix?: string
  suffix?: string
  description?: string
  className?: string
  variant?: "default" | "success" | "warning" | "destructive"
}

export function KPICard({ 
  title, 
  value, 
  trend, 
  prefix = "", 
  suffix = "", 
  description,
  className,
  variant = "default"
}: KPICardProps) {
  const getTrendIcon = () => {
    if (!trend) return <Minus className="h-4 w-4 text-kpi-neutral" />
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-kpi-positive" />
    return <TrendingDown className="h-4 w-4 text-kpi-negative" />
  }

  const getTrendColor = () => {
    if (!trend) return "text-kpi-neutral"
    return trend > 0 ? "text-kpi-positive" : "text-kpi-negative"
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-l-4 border-l-success"
      case "warning":
        return "border-l-4 border-l-warning"
      case "destructive":
        return "border-l-4 border-l-destructive"
      default:
        return "border-l-4 border-l-primary"
    }
  }

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg",
      getVariantStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {trend !== undefined && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={cn("text-xs font-medium", getTrendColor())}>
              {trend > 0 ? "+" : ""}{trend?.toFixed(1)}%
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}