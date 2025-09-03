import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react"
import { formatNumberShort, formatPct, formatCurrency } from "@/lib/format"

interface KPICardProps {
  title: string
  value: string | number
  trend?: number
  prefix?: string
  suffix?: string
  description?: string
  className?: string
  variant?: "default" | "success" | "warning" | "destructive"
  icon?: LucideIcon
  format?: "number" | "currency" | "percentage" | "custom"
  target?: number
}

export function KPICard({ 
  title, 
  value, 
  trend, 
  prefix = "", 
  suffix = "", 
  description,
  className,
  variant = "default",
  icon: Icon,
  format = "custom",
  target
}: KPICardProps) {
  const formatValue = () => {
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString()) || 0;
    
    switch (format) {
      case "number":
        return formatNumberShort(numValue);
      case "currency":
        return formatCurrency(numValue);
      case "percentage":
        return formatPct(numValue);
      default:
        const formattedNumber = typeof value === 'number' ? value.toLocaleString() : value;
        return `${prefix || ''}${formattedNumber}${suffix || ''}`;
    }
  };

  const getTrendIcon = () => {
    if (trend === undefined || trend === 0) return <Minus className="h-4 w-4 text-muted-foreground" />
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-success" />
    return <TrendingDown className="h-4 w-4 text-destructive" />
  }

  const getTrendColor = () => {
    if (trend === undefined || trend === 0) return "text-muted-foreground"
    return trend > 0 ? "text-success" : "text-destructive"
  }

  const getVariantStyles = () => {
    const baseStyles = "rounded-2xl border-b-2 shadow-brand hover:shadow-lg transition-all duration-200 hover:scale-[1.02]";
    
    switch (variant) {
      case "success":
        return `${baseStyles} border-b-success`;
      case "warning":
        return `${baseStyles} border-b-warning`;
      case "destructive":
        return `${baseStyles} border-b-destructive`;
      default:
        return `${baseStyles} border-b-accent`;
    }
  }

  return (
    <Card className={cn(
      getVariantStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
        </div>
        {trend !== undefined && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={cn("text-xs font-semibold", getTrendColor())}>
              {trend > 0 ? "+" : ""}{trend.toFixed(1)}%
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-foreground mb-1">
          {formatValue()}
        </div>
        {target && typeof value === 'number' && (
          <div className="text-xs text-muted-foreground">
            Objectif: {format === 'currency' ? formatCurrency(target) : 
                      format === 'percentage' ? formatPct(target) : 
                      formatNumberShort(target)}
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}