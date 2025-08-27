import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"

const occupancyKPIs = [
  { title: "RM Open %", value: "94.2", trend: 2.1, suffix: "%", variant: "success" },
  { title: "RM Leased %", value: "97.8", trend: 1.5, suffix: "%", variant: "success" },
  { title: "RM Vacant %", value: "96.1", trend: 1.8, suffix: "%", variant: "success" },
  { title: "Mall Open %", value: "98.5", trend: 0.9, suffix: "%", variant: "success" },
  { title: "Mall Leased %", value: "89.7", trend: 3.2, suffix: "%", variant: "success" },
  { title: "Mall Vacant %", value: "3.6", trend: -0.6, suffix: "%", variant: "success" },  
  { title: "HSE Open %", value: "98.5", trend: 0.9, suffix: "%", variant: "success" },
  { title: "HSE Leased %", value: "89.7", trend: 3.2, suffix: "%", variant: "success" },
  { title: "HSE Vacant %", value: "3.6", trend: -0.6, suffix: "%", variant: "success" }
]

const occupancyTrend = [
  { month: "Jan", open: 92.5, lease: 96.8 },
  { month: "Fév", open: 93.1, lease: 97.2 },
  { month: "Mar", open: 93.8, lease: 97.5 },
  { month: "Avr", open: 94.2, lease: 97.8 },
  { month: "Mai", open: 94.5, lease: 98.1 },
  { month: "Jun", open: 94.2, lease: 97.8 }
]

const segmentData = [
  { segment: "Royalmount", open: 94.2, lease: 97.8, gap: 3.6 },
  { segment: "Mall", open: 96.1, lease: 98.5, gap: 2.4 },
  { segment: "High Street East", open: 89.7, lease: 96.2, gap: 6.5 }
]

const tenantMix = [
  { category: "Fashion", units: 45, occupancy: 96.2, lease: 98.1 },
  { category: "F&B", units: 28, occupancy: 92.8, lease: 97.5 },
  { category: "Services", units: 18, occupancy: 94.1, lease: 96.8 },
  { category: "Entertainment", units: 12, occupancy: 91.7, lease: 95.2 },
  { category: "Beauty", units: 15, occupancy: 97.3, lease: 99.1 },
  { category: "Electronics", units: 8, occupancy: 88.9, lease: 94.4 }
]

export function OccupancySection() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {occupancyKPIs.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            suffix={kpi.suffix}
            variant={kpi.variant as any}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                open: { label: "Open %", color: "hsl(var(--primary))" },
                lease: { label: "Lease %", color: "hsl(var(--success))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[85, 100]} tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="open" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="lease" stroke="hsl(var(--success))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Segment Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy by Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                open: { label: "Open %", color: "hsl(var(--primary))" },
                lease: { label: "Lease %", color: "hsl(var(--success))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={segmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis domain={[80, 100]} tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="open" fill="hsl(var(--primary))" />
                  <Bar dataKey="lease" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tenant Mix Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tenant Mix & Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Category</th>
                    <th className="border border-border p-3 text-center">Units</th>
                    <th className="border border-border p-3 text-center">Open %</th>
                    <th className="border border-border p-3 text-center">Lease %</th>
                    <th className="border border-border p-3 text-center">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {tenantMix.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border border-border p-3 font-medium">{item.category}</td>
                      <td className="border border-border p-3 text-center">{item.units}</td>
                      <td className="border border-border p-3 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          item.occupancy >= 95 ? 'bg-success/20 text-success' : 
                          item.occupancy >= 90 ? 'bg-warning/20 text-warning' : 
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {item.occupancy}%
                        </span>
                      </td>
                      <td className="border border-border p-3 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          item.lease >= 97 ? 'bg-success/20 text-success' : 
                          item.lease >= 95 ? 'bg-warning/20 text-warning' : 
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {item.lease}%
                        </span>
                      </td>
                      <td className="border border-border p-3 text-center">
                        {(item.lease - item.occupancy).toFixed(1)}%
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
