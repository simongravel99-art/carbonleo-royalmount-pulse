import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { RadialBarChart, RadialBar, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

const cleaningKPIs = [
  { title: "CQS Score", value: "88.5", trend: 3.7, suffix: "%", variant: "success" },
  { title: "Surface Cleanliness", value: "4.2", trend: 2.4, suffix: "/5", variant: "success" },
  { title: "Washroom Hygiene", value: "4.5", trend: 4.7, suffix: "/5", variant: "success" },
  { title: "High Touch Disinfection", value: "4.1", trend: 1.2, suffix: "/5", variant: "success" },
  { title: "Waste Management", value: "4.3", trend: 3.1, suffix: "/5", variant: "success" },
  { title: "Fixtures & Furnishings", value: "4.0", trend: 0.8, suffix: "/5", variant: "warning" }
]

// CQS calculation: (0.30×surface + 0.25×washroom + 0.15×high_touch + 0.10×waste + 0.10×fixtures + 0.10×presentation) / 5 × 100
const cqsComponents = [
  { name: "Surface Cleanliness", score: 4.2, weight: 0.30, target: 4.0 },
  { name: "Washroom Hygiene", score: 4.5, weight: 0.25, target: 4.2 },
  { name: "High Touch Disinfection", score: 4.1, weight: 0.15, target: 4.0 },
  { name: "Waste Management", score: 4.3, weight: 0.10, target: 4.1 },
  { name: "Fixtures & Furnishings", score: 4.0, weight: 0.10, target: 3.8 },
  { name: "Presentation & Order", score: 4.4, weight: 0.10, target: 4.0 }
]

const cqsTrend = [
  { month: "Jan", cqs: 85.2, surface: 4.0, washroom: 4.3, highTouch: 3.9 },
  { month: "Fév", cqs: 86.8, surface: 4.1, washroom: 4.4, highTouch: 4.0 },
  { month: "Mar", cqs: 87.1, surface: 4.1, washroom: 4.4, highTouch: 4.0 },
  { month: "Avr", cqs: 88.5, surface: 4.2, washroom: 4.5, highTouch: 4.1 },
  { month: "Mai", cqs: 87.9, surface: 4.2, washroom: 4.4, highTouch: 4.1 },
  { month: "Jun", cqs: 88.5, surface: 4.2, washroom: 4.5, highTouch: 4.1 }
]

const radarData = cqsComponents.map(item => ({
  subject: item.name.split(' ')[0], // Shortened names for radar
  score: item.score,
  target: item.target,
  fullMark: 5
}))

const areaScores = [
  { area: "Food Court", cqs: 92.1, surface: 4.5, washroom: 4.8, waste: 4.6 },
  { area: "Fashion Wings", cqs: 87.3, surface: 4.1, washroom: 4.4, waste: 4.2 },
  { area: "Common Areas", cqs: 89.7, surface: 4.3, washroom: 4.6, waste: 4.4 },
  { area: "Parking", cqs: 84.2, surface: 3.9, washroom: 4.1, waste: 4.0 },
  { area: "Service Areas", cqs: 86.5, surface: 4.0, washroom: 4.3, waste: 4.1 },
  { area: "Restrooms", cqs: 91.8, surface: 4.4, washroom: 4.7, waste: 4.5 }
]

// Calculate weighted CQS score
const calculateCQS = () => {
  const weightedSum = cqsComponents.reduce((sum, component) => {
    return sum + (component.score * component.weight)
  }, 0)
  return ((weightedSum / 5) * 100).toFixed(1)
}

export function CleaningQualitySection() {
  const currentCQS = calculateCQS()

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cleaningKPIs.map((kpi, index) => (
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
        {/* CQS Score Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>CQS Score - {currentCQS}%</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cqs: { label: "CQS", color: "hsl(var(--primary))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{ name: 'CQS', value: parseFloat(currentCQS), fill: 'hsl(var(--primary))' }]}>
                  <RadialBar dataKey="value" cornerRadius={10} fill="hsl(var(--primary))" />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-foreground">
                    {currentCQS}%
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 text-center">
              <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                <span>Target: 85%</span>
                <span className={`font-medium ${parseFloat(currentCQS) >= 85 ? 'text-success' : 'text-warning'}`}>
                  {parseFloat(currentCQS) >= 85 ? '✓ Above Target' : '⚠ Below Target'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Breakdown Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Component Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                score: { label: "Current", color: "hsl(var(--primary))" },
                target: { label: "Target", color: "hsl(var(--muted-foreground))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <Radar name="Current" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="Target" dataKey="target" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.1} strokeDasharray="5 5" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* CQS Trend */}
        <Card>
          <CardHeader>
            <CardTitle>CQS Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cqs: { label: "CQS Score", color: "hsl(var(--primary))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cqsTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 95]} tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="cqs" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Detailed Component Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Component Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cqsComponents.map((component, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{component.name}</span>
                    <div className="text-right">
                      <span className="text-sm font-mono">{component.score}/5</span>
                      <span className="text-xs text-muted-foreground ml-2">({(component.weight * 100).toFixed(0)}%)</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          component.score >= component.target ? 'bg-success' : 'bg-warning'
                        }`}
                        style={{ width: `${(component.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      component.score >= component.target ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      Target: {component.target}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Area Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance by Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Area</th>
                    <th className="border border-border p-3 text-center">CQS Score</th>
                    <th className="border border-border p-3 text-center">Surface</th>
                    <th className="border border-border p-3 text-center">Washroom</th>
                    <th className="border border-border p-3 text-center">Waste Mgmt</th>
                    <th className="border border-border p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {areaScores.map((area, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border border-border p-3 font-medium">{area.area}</td>
                      <td className="border border-border p-3 text-center">
                        <span className={`px-2 py-1 rounded text-sm font-mono ${
                          area.cqs >= 90 ? 'bg-success/20 text-success' : 
                          area.cqs >= 85 ? 'bg-warning/20 text-warning' : 
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {area.cqs}%
                        </span>
                      </td>
                      <td className="border border-border p-3 text-center font-mono">{area.surface}/5</td>
                      <td className="border border-border p-3 text-center font-mono">{area.washroom}/5</td>
                      <td className="border border-border p-3 text-center font-mono">{area.waste}/5</td>
                      <td className="border border-border p-3 text-center">
                        {area.cqs >= 90 ? '🟢' : area.cqs >= 85 ? '🟡' : '🔴'}
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