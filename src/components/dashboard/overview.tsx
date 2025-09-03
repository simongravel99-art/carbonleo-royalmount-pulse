import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { 
  selectOverviewKPIs, 
  selectMarketShareTrend,
  selectHasAnyData 
} from "@/store/dashboard-store"

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

export function DashboardOverview() {
  const overviewKPIs = selectOverviewKPIs();
  const marketShareData = selectMarketShareTrend();
  const hasAnyData = selectHasAnyData();

  // Helper function to determine format based on metric name
  const getMetricFormat = (metric: string) => {
    const lowerMetric = metric.toLowerCase();
    if (lowerMetric.includes('noi') || lowerMetric.includes('sales') || lowerMetric.includes('revenue')) {
      return { type: 'currency', prefix: '$', suffix: undefined };
    }
    if (lowerMetric.includes('occupancy') || lowerMetric.includes('market share') || lowerMetric.includes('%')) {
      return { type: 'percentage', prefix: undefined, suffix: '%' };
    }
    if (lowerMetric.includes('traffic') || lowerMetric.includes('visitors') || lowerMetric.includes('leasing') || lowerMetric.includes('units')) {
      return { type: 'number', prefix: undefined, suffix: undefined };
    }
    if (lowerMetric.includes('per sf') || lowerMetric.includes('/sf')) {
      return { type: 'currency', prefix: '$', suffix: '/SF' };
    }
    return { type: 'number', prefix: undefined, suffix: undefined };
  };

  // Process KPIs for display
  const processedKPIs = overviewKPIs.map(kpi => {
    const format = getMetricFormat(kpi.Metric);
    let value: string;
    
    
    if (format.type === 'currency') {
      if (format.suffix === '/SF') {
        // For /SF metrics, always show full number with commas
        value = kpi['Current Value'].toLocaleString();
      } else if (kpi['Current Value'] >= 1000000) {
        value = `${(kpi['Current Value'] / 1000000).toFixed(1)}M`;
      } else if (kpi['Current Value'] >= 1000) {
        value = `${(kpi['Current Value'] / 1000).toFixed(0)}K`;
      } else {
        value = kpi['Current Value'].toLocaleString();
      }
    } else if (format.type === 'percentage') {
      value = kpi['Current Value'].toFixed(1);
    } else {
      value = kpi['Current Value'].toLocaleString();
    }

    return {
      title: kpi.Metric,
      value,
      trend: kpi['YoY Change (%)'],
      prefix: format.prefix,
      suffix: format.suffix,
      variant: kpi['YoY Change (%)'] > 0 ? 'success' as const : 
               kpi['YoY Change (%)'] < 0 ? 'warning' as const : 'default' as const
    };
  });

  // Process market share data for chart
  const chartData = marketShareData.map(item => ({
    date: new Date(item.Date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    marketShare: item['RM Market Share (%)']
  }));

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {processedKPIs.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              prefix={kpi.prefix}
              suffix={kpi.suffix}
              variant={kpi.variant}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="No KPI data — import the Excel template to see overview metrics." />
      )}

      {/* Market Share Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            RM Market Share Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
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
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
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
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <EmptyState message="No market share data — import the Excel template to see trend analysis." />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
