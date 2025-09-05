import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrafficBubbles } from "@/components/ui/traffic-bubbles"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { calculateWeeklyMetrics } from "@/lib/traffic-utils"
import { subWeeks } from "date-fns"
import { 
  selectTrafficParking, 
  selectHasAnyData 
} from "@/store/dashboard-store"

const trafficKPIs = [
  { title: "Monthly Mall Visitors", value: "847K", trend: 15.8, variant: "success" },
  { title: "Monthly Market Share", value: "68.2", trend: 3.4, suffix: "%", variant: "success" },
  { title: "Passerelle Traffic (%)", value: "24.5", trend: 8.7, suffix: "%", variant: "success" },
  { title: "Monthly Parking Visitors", value: "82", trend: -1.8, suffix: "K", variant: "default" },
  { title: "Monthly Parking Revenue / Employee Revenue", value: "186K/50K", trend: 12.3, prefix: "$", variant: "success" },
  { title: "Monthly Peak Occupancy %", value: "45%", trend: 5.2, prefix: "", variant: "success" },
  { title: "Weekly Parking Visitors", value: "82", trend: -1.8, suffix: "K", variant: "default" },
  { title: "Weekly Parking Revenue / Employee Revenue", value: "186K/12.5K", trend: 12.3, prefix: "$", variant: "success" },
  { title: "Weekly Peak Occupancy %", value: "80%", trend: 5.2, prefix: "", variant: "success" }
]

const trafficTrendData = [
  { month: "Jan", visitors: 650000, marketShare: 65.2, passerelle: 22.1 },
  { month: "Fév", visitors: 720000, marketShare: 66.8, passerelle: 23.4 },
  { month: "Mar", visitors: 680000, marketShare: 64.9, passerelle: 21.8 },
  { month: "Avr", visitors: 847000, marketShare: 68.2, passerelle: 24.5 },
  { month: "Mai", visitors: 790000, marketShare: 67.1, passerelle: 23.9 },
  { month: "Jun", visitors: 865000, marketShare: 69.4, passerelle: 25.2 }
]

const parkingData = [
  { month: "Jan", revenue: 165000, weekday: 74, weekend: 89, peak: 85 },
  { month: "Fév", revenue: 172000, weekday: 76, weekend: 91, peak: 87 },
  { month: "Mar", revenue: 168000, weekday: 75, weekend: 88, peak: 84 },
  { month: "Avr", revenue: 186000, weekday: 78, weekend: 94, peak: 82 },
  { month: "Mai", revenue: 180000, weekday: 77, weekend: 92, peak: 83 },
  { month: "Jun", revenue: 191000, weekday: 79, weekend: 95, peak: 82 }
]

const trafficSourcesData = [
  { name: "Direct", value: 45.2, color: "hsl(var(--chart-1))" },
  { name: "Passerelle", value: 24.5, color: "hsl(var(--chart-2))" },
  { name: "Transit", value: 18.7, color: "hsl(var(--chart-3))" },
  { name: "Résidentiel", value: 11.6, color: "hsl(var(--chart-4))" }
]

const hourlyTrafficData = [
  { hour: "9h", visitors: 25000 },
  { hour: "10h", visitors: 45000 },
  { hour: "11h", visitors: 62000 },
  { hour: "12h", visitors: 78000 },
  { hour: "13h", visitors: 85000 },
  { hour: "14h", visitors: 92000 },
  { hour: "15h", visitors: 88000 },
  { hour: "16h", visitors: 75000 },
  { hour: "17h", visitors: 68000 },
  { hour: "18h", visitors: 82000 },
  { hour: "19h", visitors: 95000 },
  { hour: "20h", visitors: 72000 },
  { hour: "21h", visitors: 45000 }
]

// Mock traffic data for weekly calculations
const mockTrafficData = [
  { date: "2024-01-15", totalVisitors: 45000, marketShareTrafficPct: 68.2 }, // Monday
  { date: "2024-01-16", totalVisitors: 52000, marketShareTrafficPct: 69.1 }, // Tuesday
  { date: "2024-01-17", totalVisitors: 48000, marketShareTrafficPct: 67.8 }, // Wednesday
  { date: "2024-01-18", totalVisitors: 55000, marketShareTrafficPct: 70.2 }, // Thursday
  { date: "2024-01-19", totalVisitors: 72000, marketShareTrafficPct: 72.5 }, // Friday
  { date: "2024-01-20", totalVisitors: 89000, marketShareTrafficPct: 75.8 }, // Saturday
  { date: "2024-01-21", totalVisitors: 67000, marketShareTrafficPct: 71.3 }, // Sunday
]

function EmptyState({ message }: { message: string }) {
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
}

export function TrafficSection() {
  const trafficData = selectTrafficParking();
  const hasAnyData = selectHasAnyData();

  // Process traffic data for KPIs
  const processedKPIs = trafficData.length > 0 ? [
    {
      title: "Monthly Mall Visitors",
      value: `${Math.round(trafficData[trafficData.length - 1]?.['Total Visitors'] / 1000)}K`,
      trend: 15.8,
      variant: "success"
    },
    {
      title: "Monthly Market Share",
      value: trafficData[trafficData.length - 1]?.['Market Share (%)']?.toFixed(1) || "0",
      trend: 3.4,
      suffix: "%",
      variant: "success"
    },
    {
      title: "Passerelle Traffic (%)",
      value: trafficData[trafficData.length - 1]?.['Passerelle Traffic (%)']?.toFixed(1) || "0",
      trend: 8.7,
      suffix: "%",
      variant: "success"
    }
  ] : trafficKPIs;

  // Process traffic data for charts
  const chartData = trafficData.map(item => ({
    month: new Date(item.Date).toLocaleDateString('en', { month: 'short' }),
    visitors: item['Total Visitors'] || 0,
    marketShare: item['Market Share (%)'] || 0,
    passerelle: item['Passerelle Traffic (%)'] || 0
  }));

  // Calculate current week metrics
  const currentDateRange = { 
    from: new Date("2024-01-15"), 
    to: new Date("2024-01-21") 
  }
  const previousDateRange = {
    from: subWeeks(currentDateRange.from, 1),
    to: subWeeks(currentDateRange.to, 1)
  }
  
  const currentWeekMetrics = calculateWeeklyMetrics(mockTrafficData, currentDateRange)
  const previousWeekMetrics = calculateWeeklyMetrics(mockTrafficData, previousDateRange)

  return (
    <div className="space-y-6">
      {/* Data Status Banner */}
      {hasAnyData && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <p className="text-success text-sm font-medium">
            ✓ Using imported data from Excel template
          </p>
        </div>
      )}

      {/* KPI Grid */}
      {processedKPIs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processedKPIs.map((kpi, index) => (
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
      ) : (
        <EmptyState message="No traffic data — import the Excel template to see traffic metrics." />
      )}

      {/* Traffic Bubbles */}
      <TrafficBubbles 
        metrics={currentWeekMetrics}
        previousMetrics={previousWeekMetrics}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Traffic Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ChartContainer
                config={{
                  visitors: { label: "Visitors", color: "hsl(var(--chart-1))" },
                  marketShare: { label: "Market Share %", color: "hsl(var(--chart-2))" }
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line yAxisId="left" type="monotone" dataKey="visitors" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-1))", r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="marketShare" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-2))", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <EmptyState message="No traffic data — import the Excel template to see visitor trends." />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Parking Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Parking Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                peak: { label: "Peak %", color: "hsl(var(--chart-3))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={parkingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-1))", r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="peak" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-3))", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                direct: { label: "Direct", color: "hsl(var(--chart-1))" },
                passerelle: { label: "Passerelle", color: "hsl(var(--chart-2))" },
                transit: { label: "Transit", color: "hsl(var(--chart-3))" },
                residential: { label: "Résidentiel", color: "hsl(var(--chart-4))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hourly Traffic Pattern */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Traffic Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                visitors: { label: "Visitors", color: "hsl(var(--chart-1))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="visitors" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
