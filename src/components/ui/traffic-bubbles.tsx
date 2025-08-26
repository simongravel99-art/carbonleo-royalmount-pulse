import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { formatNumberShort, formatPct } from "@/lib/format"
import { WeeklyMetrics } from "@/lib/traffic-utils"
import { cn } from "@/lib/utils"

interface TrafficBubbleProps {
  label: string
  value: string
  trend?: "up" | "down" | null
  hasData?: boolean
}

function TrafficBubble({ label, value, trend, hasData = true }: TrafficBubbleProps) {
  return (
    <Card className={cn(
      "relative w-32 h-32 lg:w-36 lg:h-36 rounded-full flex flex-col items-center justify-center",
      "bg-primary/10 border-primary/20 hover:bg-primary/15 transition-colors",
      !hasData && "opacity-60"
    )}>
      <div className="text-center">
        <div className="text-2xl lg:text-3xl font-semibold text-primary mb-1">
          {value}
        </div>
        <div className="text-xs lg:text-sm text-muted-foreground font-medium">
          {label}
        </div>
      </div>
      
      {!hasData && (
        <div className="absolute top-2 right-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
        </div>
      )}
      
      {trend && hasData && (
        <div className="absolute bottom-2 right-2">
          <Badge 
            variant="outline" 
            className={cn(
              "h-6 w-6 p-0 rounded-full border-none",
              trend === "up" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
          </Badge>
        </div>
      )}
    </Card>
  )
}

interface TrafficBubblesProps {
  metrics: WeeklyMetrics
  previousMetrics?: WeeklyMetrics | null
}

export function TrafficBubbles({ metrics, previousMetrics }: TrafficBubblesProps) {
  const getTrend = (current: number, previous: number | undefined): "up" | "down" | null => {
    if (!previous || previous === 0) return null
    return current > previous ? "up" : current < previous ? "down" : null
  }
  
  const formatBubbleValue = (visitors: number, marketShare: number, hasData: boolean): string => {
    if (!hasData) return "— (—)"
    return `${formatNumberShort(visitors)} (${formatPct(marketShare / 100)})`
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Weekly Traffic Metrics</h3>
      
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
        <TrafficBubble
          label="Weekly Visitors"
          value={formatNumberShort(metrics.weeklyVisitors)}
          trend={getTrend(metrics.weeklyVisitors, previousMetrics?.weeklyVisitors)}
        />
        
        <TrafficBubble
          label="Weekly Market Share"
          value={formatPct(metrics.weeklyMarketShare / 100)}
          trend={getTrend(metrics.weeklyMarketShare, previousMetrics?.weeklyMarketShare)}
        />
        
        <TrafficBubble
          label="Friday"
          value={formatBubbleValue(metrics.fridayVisitors, metrics.fridayMarketShare, metrics.hasData.friday)}
          trend={getTrend(metrics.fridayVisitors, previousMetrics?.fridayVisitors)}
          hasData={metrics.hasData.friday}
        />
        
        <TrafficBubble
          label="Saturday"
          value={formatBubbleValue(metrics.saturdayVisitors, metrics.saturdayMarketShare, metrics.hasData.saturday)}
          trend={getTrend(metrics.saturdayVisitors, previousMetrics?.saturdayVisitors)}
          hasData={metrics.hasData.saturday}
        />
        
        <TrafficBubble
          label="Sunday"
          value={formatBubbleValue(metrics.sundayVisitors, metrics.sundayMarketShare, metrics.hasData.sunday)}
          trend={getTrend(metrics.sundayVisitors, previousMetrics?.sundayVisitors)}
          hasData={metrics.hasData.sunday}
        />
      </div>
    </div>
  )
}