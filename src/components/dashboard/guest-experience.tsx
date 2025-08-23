import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar } from "recharts"

const guestKPIs = [
  { title: "NPS Score", value: "72", trend: 5.2, variant: "success" },
  { title: "NPS vs Target", value: "108.4", trend: 8.4, suffix: "%", variant: "success" },
  { title: "Parking App Users", value: "68.5", trend: 12.8, suffix: "%", variant: "success" },
  { title: "Parking Efficiency", value: "91.2", trend: 3.4, suffix: "%", variant: "success" },
  { title: "Gift Card Sales", value: "285K", trend: 18.7, prefix: "$", variant: "success" },
  { title: "Complaints Resolved", value: "95.7", trend: 4.2, suffix: "%", variant: "success" }
]

const npsData = [
  { month: "Jan", nps: 68, target: 65, vsTarget: 104.6 },
  { month: "Fév", nps: 70, target: 65, vsTarget: 107.7 },
  { month: "Mar", nps: 69, target: 65, vsTarget: 106.2 },
  { month: "Avr", nps: 72, target: 65, vsTarget: 110.8 },
  { month: "Mai", nps: 71, target: 65, vsTarget: 109.2 },
  { month: "Jun", nps: 72, target: 65, vsTarget: 110.8 }
]

const serviceData = [
  { month: "Jan", giftCards: 245000, personalShoppers: 85000, ambience: 8.2 },
  { month: "Fév", giftCards: 268000, personalShoppers: 92000, ambience: 8.4 },
  { month: "Mar", giftCards: 252000, personalShoppers: 88000, ambience: 8.1 },
  { month: "Avr", giftCards: 285000, personalShoppers: 98000, ambience: 8.6 },
  { month: "Mai", giftCards: 275000, personalShoppers: 95000, ambience: 8.5 },
  { month: "Jun", giftCards: 295000, personalShoppers: 102000, ambience: 8.7 }
]

const complaintsData = [
  { month: "Jan", total: 35, resolved: 92.8, categories: { service: 12, facility: 8, parking: 10, other: 5 } },
  { month: "Fév", total: 28, resolved: 94.2, categories: { service: 10, facility: 6, parking: 8, other: 4 } },
  { month: "Mar", total: 32, resolved: 93.5, categories: { service: 11, facility: 7, parking: 9, other: 5 } },
  { month: "Avr", total: 23, resolved: 95.7, categories: { service: 8, facility: 5, parking: 6, other: 4 } },
  { month: "Mai", total: 26, resolved: 94.8, categories: { service: 9, facility: 6, parking: 7, other: 4 } },
  { month: "Jun", total: 23, resolved: 95.7, categories: { service: 8, facility: 4, parking: 7, other: 4 } }
]

const parkingMetrics = [
  { metric: "App Adoption", value: 68.5, target: 70, color: "hsl(var(--primary))" },
  { metric: "Efficiency", value: 91.2, target: 85, color: "hsl(var(--success))" },
  { metric: "User Satisfaction", value: 88.4, target: 85, color: "hsl(var(--secondary))" }
]

const satisfactionBreakdown = [
  { aspect: "Customer Service", score: 8.6, target: 8.0 },
  { aspect: "Cleanliness", score: 8.8, target: 8.5 },
  { aspect: "Ambience", score: 8.7, target: 8.0 },
  { aspect: "Safety", score: 9.1, target: 8.5 },
  { aspect: "Accessibility", score: 8.9, target: 8.5 },
  { aspect: "Technology", score: 8.2, target: 7.5 }
]

export function GuestExperienceSection() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guestKPIs.map((kpi, index) => (
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
        {/* NPS Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>NPS Evolution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                nps: { label: "NPS Score", color: "hsl(var(--primary))" },
                target: { label: "Target", color: "hsl(var(--muted-foreground))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={npsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 80]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="nps" stroke="hsl(var(--primary))" strokeWidth={3} />
                  <Line type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Service Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                giftCards: { label: "Gift Cards", color: "hsl(var(--primary))" },
                personalShoppers: { label: "Personal Shoppers", color: "hsl(var(--secondary))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="giftCards" fill="hsl(var(--primary))" />
                  <Bar dataKey="personalShoppers" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Parking Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Parking Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Value", color: "hsl(var(--primary))" },
                target: { label: "Target", color: "hsl(var(--muted-foreground))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={parkingMetrics} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="metric" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                  <Bar dataKey="target" fill="hsl(var(--muted-foreground))" opacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Satisfaction Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Satisfaction Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satisfactionBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-24">{item.aspect}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(item.score / 10) * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-mono w-8">{item.score}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.score >= item.target ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                  }`}>
                    Target: {item.target}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Complaints Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Complaints Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Resolution Trend</h4>
                <ChartContainer
                  config={{
                    total: { label: "Total", color: "hsl(var(--warning))" },
                    resolved: { label: "Resolved %", color: "hsl(var(--success))" }
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={complaintsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar yAxisId="left" dataKey="total" fill="hsl(var(--warning))" />
                      <Line yAxisId="right" type="monotone" dataKey="resolved" stroke="hsl(var(--success))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Current Month Breakdown</h4>
                <div className="space-y-2">
                  {Object.entries(complaintsData[complaintsData.length - 1].categories).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{category}</span>
                      <span className="text-sm font-mono">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}