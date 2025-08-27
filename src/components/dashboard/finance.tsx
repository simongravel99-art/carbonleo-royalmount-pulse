import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"

const financeKPIs = [
  { title: "Base Rent", value: "450K", trend: -2.1, prefix: "$", variant: "success" },
  { title: "% Rent", value: "680K", trend: 3.4, prefix: "$", variant: "warning" },
  { title: "Other Income", value: "125K", trend: -8.5, prefix: "$", variant: "success" }
  { title: "Rec. Expenses", value: "450K", trend: -2.1, prefix: "$", variant: "success" },
  { title: "Non-Rec Expenses", value: "680K", trend: 3.4, prefix: "$", variant: "warning" },
  { title: "Current Receivables", value: "125K", trend: -8.5, prefix: "$", variant: "success" }
  { title: "NOI Monthly", value: "2.4M", trend: 8.2, prefix: "$", variant: "success" },
  { title: "NOI YTD", value: "24.8M", trend: 12.4, prefix: "$", variant: "success" },
  { title: "NOI Budget 2025", value: "28.5M", trend: 5.8, prefix: "$", variant: "success" },
 
]

const noiData = [
  { month: "Jan", monthly: 2100000, ytd: 2100000, forecast: 2200000 },
  { month: "Fév", monthly: 2300000, ytd: 4400000, forecast: 4450000 },
  { month: "Mar", monthly: 2150000, ytd: 6550000, forecast: 6750000 },
  { month: "Avr", monthly: 2400000, ytd: 8950000, forecast: 9100000 },
  { month: "Mai", monthly: 2250000, ytd: 11200000, forecast: 11500000 },
  { month: "Jun", monthly: 2500000, ytd: 13700000, forecast: 13950000 }
]

const expensesData = [
  { month: "Jan", recoverable: 380000, nonRecoverable: 620000 },
  { month: "Fév", recoverable: 420000, nonRecoverable: 580000 },
  { month: "Mar", recoverable: 395000, nonRecoverable: 655000 },
  { month: "Avr", recoverable: 450000, nonRecoverable: 680000 },
  { month: "Mai", recoverable: 435000, nonRecoverable: 720000 },
  { month: "Jun", recoverable: 480000, nonRecoverable: 690000 }
]

const receivablesData = [
  { category: "0-30 jours", current: 85000, overall: 85000 },
  { category: "31-60 jours", current: 25000, overall: 110000 },
  { category: "61-90 jours", current: 15000, overall: 125000 },
  { category: "+90 jours", current: 0, overall: 125000 }
]

export function FinanceSection() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {financeKPIs.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            prefix={kpi.prefix}
            variant={kpi.variant as any}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NOI Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>NOI Evolution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                monthly: { label: "Monthly", color: "hsl(var(--primary))" },
                ytd: { label: "YTD", color: "hsl(var(--secondary))" },
                forecast: { label: "Forecast", color: "hsl(var(--muted-foreground))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={noiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="monthly" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="forecast" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Expenses Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expenses Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                recoverable: { label: "Recoverable", color: "hsl(var(--success))" },
                nonRecoverable: { label: "Non-Recoverable", color: "hsl(var(--warning))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expensesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="recoverable" fill="hsl(var(--success))" />
                  <Bar dataKey="nonRecoverable" fill="hsl(var(--warning))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Receivables */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Receivables Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Age Range</th>
                    <th className="border border-border p-3 text-right">Current Amount</th>
                    <th className="border border-border p-3 text-right">Cumulative</th>
                    <th className="border border-border p-3 text-right">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {receivablesData.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border border-border p-3">{item.category}</td>
                      <td className="border border-border p-3 text-right font-mono">
                        ${item.current.toLocaleString()}
                      </td>
                      <td className="border border-border p-3 text-right font-mono">
                        ${item.overall.toLocaleString()}
                      </td>
                      <td className="border border-border p-3 text-right">
                        {((item.current / 125000) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
