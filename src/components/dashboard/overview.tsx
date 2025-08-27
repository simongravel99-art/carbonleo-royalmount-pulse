import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data for demonstration
const kpiData = [
  { title: "NOI Monthly", value: "2.4M", trend: 8.2, prefix: "$", variant: "success" },
  { title: "NOI YTD", value: "24.8M", trend: 12.4, prefix: "$", variant: "success" },
  { title: "Occupancy (Open)", value: "94.2", trend: 2.1, suffix: "%", variant: "success" },
  { title: "Occupancy (Lease)", value: "97.8", trend: 1.5, suffix: "%", variant: "success" },
  { title: "CRU Forecasted Sales/sqft", value: "1,247", trend: -3.2, prefix: "$", variant: "warning" },
  { title: "Mall Traffic", value: "847K", trend: 15.8, variant: "success" },
  { title: "Market Share", value: "72", trend: 5.2, variant: "success" },
  { title: "CQS Score", value: "88.5", trend: 3.7, suffix: "%", variant: "success" },
  
  { title: "Parking Traffic", value: "-8.4", trend: 12.1, suffix: "%", variant: "success" },
  { title: "Peak Parking Occupancy", value: "82", trend: -1.8, suffix: "%", variant: "default" },

  { title: "Complaints", value: "23", trend: -15.4, variant: "success" },
  { title: "Complaints Resolved", value: "95.7", trend: 4.2, suffix: "%", variant: "success" }
]

const noiTimeSeriesData = [
  { month: "Jan", noi: 2100000, forecast: 2200000 },
  { month: "Fév", noi: 2300000, forecast: 2250000 },
  { month: "Mar", noi: 2150000, forecast: 2300000 },
  { month: "Avr", noi: 2400000, forecast: 2350000 },
  { month: "Mai", noi: 2250000, forecast: 2400000 },
  { month: "Jun", noi: 2500000, forecast: 2450000 }
]

const trafficData = [
  { month: "Jan", visitors: 650000, target: 700000 },
  { month: "Fév", visitors: 720000, target: 750000 },
  { month: "Mar", visitors: 680000, target: 720000 },
  { month: "Avr", visitors: 847000, target: 800000 },
  { month: "Mai", visitors: 790000, target: 820000 },
  { month: "Jun", visitors: 865000, target: 850000 }
]

const marketShareData = [
  { month: "Jan", marketShare: 24.5 },
  { month: "Fév", marketShare: 25.1 },
  { month: "Mar", marketShare: 24.8 },
  { month: "Avr", marketShare: 26.2 },
  { month: "Mai", marketShare: 25.7 },
  { month: "Jun", marketShare: 26.8 }
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            prefix={kpi.prefix}
            suffix={kpi.suffix}
            variant={kpi.variant as any}
          />
        ))}
      </div>

      {/* Market Share Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            RM Market Share
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              marketShare: {
                label: "Market Share",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketShareData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value) => [`${value}%`, "Market Share"]}
                    labelFormatter={(label) => `${label}`}
                  />} 
                />
                <Line
                  type="monotone"
                  dataKey="marketShare"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
