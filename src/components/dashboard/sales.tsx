import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"

const salesKPIs = [
  { title: "Sales/sqft Monthly", value: "1,247", trend: -3.2, prefix: "$", variant: "warning" },
  { title: "Total Sales", value: "18.2M", trend: 5.8, prefix: "$", variant: "success" },
  { title: "YoY Index", value: "104.2", trend: 4.2, suffix: "%", variant: "success" },
  { title: "Avg Ticket", value: "127", trend: 2.1, prefix: "$", variant: "success" },
  { title: "Conversion Rate", value: "18.5", trend: -1.2, suffix: "%", variant: "warning" },
  { title: "Units/Transaction", value: "2.3", trend: 1.8, variant: "success" }
]

const salesByCategoryData = [
  { category: "Fashion", salesPerSqft: 1580, target: 1500, yoyIndex: 108.2 },
  { category: "F&B", salesPerSqft: 2240, target: 2000, yoyIndex: 112.5 },
  { category: "Services", salesPerSqft: 890, target: 1000, yoyIndex: 95.8 },
  { category: "Entertainment", salesPerSqft: 1150, target: 1200, yoyIndex: 101.3 },
  { category: "Beauty", salesPerSqft: 1820, target: 1600, yoyIndex: 115.7 },
  { category: "Electronics", salesPerSqft: 980, target: 1100, yoyIndex: 89.1 }
]

const salesTrendData = [
  { month: "Jan", total: 16800000, perSqft: 1180 },
  { month: "Fév", total: 17200000, perSqft: 1210 },
  { month: "Mar", total: 17800000, perSqft: 1250 },
  { month: "Avr", total: 18200000, perSqft: 1280 },
  { month: "Mai", total: 17900000, perSqft: 1260 },
  { month: "Jun", total: 18200000, perSqft: 1247 }
]

const topTenants = [
  { tenant: "Zara", category: "Fashion", gla: 8500, sales: 13430000, salesPerSqft: 1580, yoyIndex: 108.2 },
  { tenant: "Apple Store", category: "Electronics", gla: 2800, sales: 2744000, salesPerSqft: 980, yoyIndex: 89.1 },
  { tenant: "Sephora", category: "Beauty", gla: 3200, sales: 5824000, salesPerSqft: 1820, yoyIndex: 115.7 },
  { tenant: "Tim Hortons", category: "F&B", gla: 1500, sales: 3360000, salesPerSqft: 2240, yoyIndex: 112.5 },
  { tenant: "H&M", category: "Fashion", gla: 6800, sales: 10744000, salesPerSqft: 1580, yoyIndex: 108.2 },
  { tenant: "Cineplex", category: "Entertainment", gla: 12000, sales: 13800000, salesPerSqft: 1150, yoyIndex: 101.3 }
]

export function SalesSection() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesKPIs.map((kpi, index) => (
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales/sqft by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                salesPerSqft: { label: "Sales/sqft", color: "hsl(var(--primary))" },
                target: { label: "Target", color: "hsl(var(--muted-foreground))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="salesPerSqft" fill="hsl(var(--primary))" />
                  <Bar dataKey="target" fill="hsl(var(--muted-foreground))" opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Evolution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: { label: "Total Sales", color: "hsl(var(--primary))" },
                perSqft: { label: "$/sqft", color: "hsl(var(--secondary))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line yAxisId="left" type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="perSqft" stroke="hsl(var(--secondary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Tenants Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Tenants Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Tenant</th>
                    <th className="border border-border p-3 text-left">Category</th>
                    <th className="border border-border p-3 text-right">GLA (sqft)</th>
                    <th className="border border-border p-3 text-right">Total Sales</th>
                    <th className="border border-border p-3 text-right">Sales/sqft</th>
                    <th className="border border-border p-3 text-right">YoY Index</th>
                  </tr>
                </thead>
                <tbody>
                  {topTenants.map((tenant, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border border-border p-3 font-medium">{tenant.tenant}</td>
                      <td className="border border-border p-3">{tenant.category}</td>
                      <td className="border border-border p-3 text-right font-mono">
                        {tenant.gla.toLocaleString()}
                      </td>
                      <td className="border border-border p-3 text-right font-mono">
                        ${(tenant.sales / 1000000).toFixed(1)}M
                      </td>
                      <td className="border border-border p-3 text-right font-mono">
                        ${tenant.salesPerSqft}
                      </td>
                      <td className="border border-border p-3 text-right">
                        <span className={`px-2 py-1 rounded text-sm ${
                          tenant.yoyIndex >= 105 ? 'bg-success/20 text-success' : 
                          tenant.yoyIndex >= 95 ? 'bg-warning/20 text-warning' : 
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {tenant.yoyIndex}%
                        </span>
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