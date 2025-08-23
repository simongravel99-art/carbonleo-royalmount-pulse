import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"

const opsKPIs = [
  { title: "Energy Index", value: "-8.4", trend: 12.1, suffix: "%", variant: "success" },
  { title: "Response Time", value: "2.8", trend: -15.2, suffix: "h", variant: "success" },
  { title: "SLA Compliance", value: "94.2", trend: 3.8, suffix: "%", variant: "success" },
  { title: "Safety Incidents", value: "2", trend: -50.0, variant: "success" },
  { title: "Energy Hydro", value: "485K", trend: -8.1, suffix: " kWh", variant: "success" },
  { title: "BTU/sqft", value: "125.3", trend: -5.4, variant: "success" }
]

const energyData = [
  { month: "Jan", hydro: 520000, btu: 135.2, index: -5.2 },
  { month: "Fév", hydro: 495000, btu: 128.7, index: -6.8 },
  { month: "Mar", hydro: 510000, btu: 132.1, index: -7.1 },
  { month: "Avr", hydro: 485000, btu: 125.3, index: -8.4 },
  { month: "Mai", hydro: 470000, btu: 122.8, index: -9.2 },
  { month: "Jun", hydro: 480000, btu: 124.5, index: -8.7 }
]

const maintenanceData = [
  { month: "Jan", responseTime: 3.2, slaCompliance: 91.5, workOrders: 156 },
  { month: "Fév", responseTime: 3.0, slaCompliance: 92.8, workOrders: 142 },
  { month: "Mar", responseTime: 2.9, slaCompliance: 93.2, workOrders: 138 },
  { month: "Avr", responseTime: 2.8, slaCompliance: 94.2, workOrders: 145 },
  { month: "Mai", responseTime: 2.7, slaCompliance: 94.8, workOrders: 132 },
  { month: "Jun", responseTime: 2.8, slaCompliance: 94.2, workOrders: 140 }
]

const safetyData = [
  { month: "Jan", incidents: 4, severity: "Low" },
  { month: "Fév", incidents: 2, severity: "Low" },
  { month: "Mar", incidents: 3, severity: "Medium" },
  { month: "Avr", incidents: 2, severity: "Low" },
  { month: "Mai", incidents: 1, severity: "Low" },
  { month: "Jun", incidents: 2, severity: "Low" }
]

const workOrderCategories = [
  { category: "HVAC", count: 45, avgTime: 3.2, sla: 96.5 },
  { category: "Plumbing", count: 28, avgTime: 2.1, sla: 98.2 },
  { category: "Electrical", count: 32, avgTime: 2.8, sla: 94.8 },
  { category: "Cleaning", count: 18, avgTime: 1.5, sla: 99.1 },
  { category: "Security", count: 12, avgTime: 1.8, sla: 97.3 },
  { category: "General", count: 25, avgTime: 2.5, sla: 92.7 }
]

export function OpsSection() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opsKPIs.map((kpi, index) => (
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
        {/* Energy Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hydro: { label: "Hydro (kWh)", color: "hsl(var(--primary))" },
                index: { label: "Index vs Baseline", color: "hsl(var(--success))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line yAxisId="left" type="monotone" dataKey="hydro" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="index" stroke="hsl(var(--success))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Maintenance Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                responseTime: { label: "Response Time (h)", color: "hsl(var(--warning))" },
                slaCompliance: { label: "SLA Compliance %", color: "hsl(var(--success))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `${value}h`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line yAxisId="left" type="monotone" dataKey="responseTime" stroke="hsl(var(--warning))" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="slaCompliance" stroke="hsl(var(--success))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Safety Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Safety Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                incidents: { label: "Incidents", color: "hsl(var(--destructive))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={safetyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="incidents" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Work Orders by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Work Orders by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Category</th>
                    <th className="border border-border p-3 text-center">Count</th>
                    <th className="border border-border p-3 text-center">Avg Time (h)</th>
                    <th className="border border-border p-3 text-center">SLA %</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrderCategories.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border border-border p-3 font-medium">{item.category}</td>
                      <td className="border border-border p-3 text-center">{item.count}</td>
                      <td className="border border-border p-3 text-center">{item.avgTime}</td>
                      <td className="border border-border p-3 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          item.sla >= 95 ? 'bg-success/20 text-success' : 
                          item.sla >= 90 ? 'bg-warning/20 text-warning' : 
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {item.sla}%
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