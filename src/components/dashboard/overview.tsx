import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock data for demonstration
const kpiData = [
  { title: "NOI Monthly", value: "2.4M", trend: 8.2, prefix: "$", variant: "success" },
  { title: "NOI YTD", value: "24.8M", trend: 12.4, prefix: "$", variant: "success" },
  { title: "Occupancy (Open)", value: "94.2", trend: 2.1, suffix: "%", variant: "success" },
  { title: "Occupancy (Lease)", value: "97.8", trend: 1.5, suffix: "%", variant: "success" },
  { title: "Sales/sqft", value: "1,247", trend: -3.2, prefix: "$", variant: "warning" },
  { title: "Foot Traffic", value: "847K", trend: 15.8, variant: "success" },
  { title: "NPS Score", value: "72", trend: 5.2, variant: "success" },
  { title: "Peak Parking", value: "82", trend: -1.8, suffix: "%", variant: "default" },
  { title: "Energy Index", value: "-8.4", trend: 12.1, suffix: "%", variant: "success" },
  { title: "CQS Score", value: "88.5", trend: 3.7, suffix: "%", variant: "success" },
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

const salesData = [
  { category: "Fashion", salesPerSqft: 1580, target: 1500 },
  { category: "F&B", salesPerSqft: 2240, target: 2000 },
  { category: "Services", salesPerSqft: 890, target: 1000 },
  { category: "Entertainment", salesPerSqft: 1150, target: 1200 }
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NOI Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Évolution NOI vs Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={noiTimeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  className="text-xs"
                />
                <Tooltip 
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, ""]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="noi" 
                  stroke="hsl(var(--chart-primary))" 
                  strokeWidth={2}
                  name="NOI Réel"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="hsl(var(--chart-secondary))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Trafic Visiteurs vs Objectif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  className="text-xs"
                />
                <Tooltip 
                  formatter={(value: number) => [`${(value / 1000).toFixed(0)}K visiteurs`, ""]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="visitors" fill="hsl(var(--chart-primary))" name="Visiteurs" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--chart-secondary))" name="Objectif" radius={[4, 4, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Sales/sqft par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" tickFormatter={(value) => `$${value}`} className="text-xs" />
                <YAxis dataKey="category" type="category" className="text-xs" />
                <Tooltip 
                  formatter={(value: number) => [`$${value}/sqft`, ""]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="salesPerSqft" fill="hsl(var(--chart-primary))" name="Réel" radius={[0, 4, 4, 0]} />
                <Bar dataKey="target" fill="hsl(var(--chart-tertiary))" name="Objectif" radius={[0, 4, 4, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* NPS Evolution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Évolution NPS Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: "Jan", nps: 68, target: 70 },
                { month: "Fév", nps: 70, target: 70 },
                { month: "Mar", nps: 69, target: 71 },
                { month: "Avr", nps: 72, target: 72 },
                { month: "Mai", nps: 71, target: 72 },
                { month: "Jun", nps: 73, target: 73 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis domain={[65, 75]} className="text-xs" />
                <Tooltip 
                  formatter={(value: number) => [value, ""]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="nps" 
                  stroke="hsl(var(--chart-primary))" 
                  strokeWidth={3}
                  name="NPS Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--chart-secondary))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Objectif"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}