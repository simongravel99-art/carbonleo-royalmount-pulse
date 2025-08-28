import { KPICard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SalesTable } from "@/components/ui/sales-table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { TenantSalesData, getBottomPerformersSales, getLuxuryTenants, getBottomPerformersGROC, getTopPerformersGROC, defaultSalesKPIConfig } from "@/lib/sales-utils";
import { formatNumberShort, formatCurrency } from "@/lib/format";
const salesKPIs = [{
  title: "Avg CRU Forecasted Sales/SF Ann.",
  value: "1,247",
  trend: -3.2,
  prefix: "$",
  suffix: "/SF",
  variant: "warning"
}, {
  title: "Monthly CRU Sales",
  value: "18.2M",
  trend: 5.8,
  prefix: "$",
  variant: "success"
}, {
  title: "YoY Growth",
  value: "104.2",
  trend: 4.2,
  suffix: "%",
  variant: "success"
}, {
  title: "Avg Anchors Forecasted Sales/SF Ann.",
  value: "127",
  trend: 2.1,
  prefix: "$",
  suffix: "/SF",
  variant: "success"
}, {
  title: "Monthly Anchors Sales",
  value: "18.5",
  trend: -1.2,
  suffix: "M",
  prefix: "$",
  variant: "warning"
}, {
  title: "YoY Growth",
  value: "2.3",
  trend: 1.8,
  suffix: "%",
  variant: "success"
}];
const salesByCategoryData = [{
  category: "Luxury",
  salesPerSqft: 1580,
  target: 1500,
  yoyIndex: 108.2
}, {
  category: "Aspirational Luxury",
  salesPerSqft: 2240,
  target: 2000,
  yoyIndex: 112.5
}, {
  category: "Home & Decor",
  salesPerSqft: 890,
  target: 1000,
  yoyIndex: 95.8
}, {
  category: "Large Format",
  salesPerSqft: 1150,
  target: 1200,
  yoyIndex: 101.3
}, {
  category: "Health & Beauty",
  salesPerSqft: 1820,
  target: 1600,
  yoyIndex: 115.7
}, {
  category: "Specialty Food",
  salesPerSqft: 980,
  target: 1100,
  yoyIndex: 89.1
}];
const salesTrendData = [{
  month: "Jan",
  cruSalesPerSqft: 1150,
  anchorSalesPerSqft: 980
}, {
  month: "Fév",
  cruSalesPerSqft: 1210,
  anchorSalesPerSqft: 1020
}, {
  month: "Mar",
  cruSalesPerSqft: 1180,
  anchorSalesPerSqft: 1050
}, {
  month: "Avr",
  cruSalesPerSqft: 1280,
  anchorSalesPerSqft: 1100
}, {
  month: "Mai",
  cruSalesPerSqft: 1260,
  anchorSalesPerSqft: 1080
}, {
  month: "Jun",
  cruSalesPerSqft: 1247,
  anchorSalesPerSqft: 1120
}];

// Extended tenant data with GROC information
const tenantSalesData: TenantSalesData[] = [{
  tenant: "Zara",
  category: "Fashion",
  gla: 8500,
  sales: 13430000,
  salesPerSqft: 1580,
  yoyIndex: 108.2,
  grocPct: 12.5,
  rentYtd: 1679000,
  salesAmountYtd: 13430000
}, {
  tenant: "Apple Store",
  category: "Electronics",
  gla: 2800,
  sales: 2744000,
  salesPerSqft: 980,
  yoyIndex: 89.1,
  grocPct: 18.7,
  rentYtd: 513000,
  salesAmountYtd: 2744000
}, {
  tenant: "Sephora",
  category: "Beauty",
  gla: 3200,
  sales: 5824000,
  salesPerSqft: 1820,
  yoyIndex: 115.7,
  grocPct: 8.2,
  rentYtd: 477000,
  salesAmountYtd: 5824000
}, {
  tenant: "Tim Hortons",
  category: "F&B",
  gla: 1500,
  sales: 3360000,
  salesPerSqft: 2240,
  yoyIndex: 112.5,
  grocPct: 6.8,
  rentYtd: 228000,
  salesAmountYtd: 3360000
}, {
  tenant: "H&M",
  category: "Fashion",
  gla: 6800,
  sales: 10744000,
  salesPerSqft: 1580,
  yoyIndex: 108.2,
  grocPct: 11.8,
  rentYtd: 1268000,
  salesAmountYtd: 10744000
}, {
  tenant: "Cineplex",
  category: "Entertainment",
  gla: 12000,
  sales: 13800000,
  salesPerSqft: 1150,
  yoyIndex: 101.3,
  grocPct: 14.2,
  rentYtd: 1960000,
  salesAmountYtd: 13800000
}, {
  tenant: "Louis Vuitton",
  category: "Luxury",
  gla: 2400,
  sales: 8960000,
  salesPerSqft: 3733,
  yoyIndex: 125.8,
  grocPct: 5.2,
  rentYtd: 466000,
  salesAmountYtd: 8960000
}, {
  tenant: "Gucci",
  category: "Luxury",
  gla: 1800,
  sales: 6120000,
  salesPerSqft: 3400,
  yoyIndex: 118.3,
  grocPct: 6.1,
  rentYtd: 373000,
  salesAmountYtd: 6120000
}, {
  tenant: "Forever 21",
  category: "Fashion",
  gla: 5500,
  sales: 4840000,
  salesPerSqft: 880,
  yoyIndex: 78.5,
  grocPct: 16.8,
  rentYtd: 813000,
  salesAmountYtd: 4840000
}, {
  tenant: "GameStop",
  category: "Electronics",
  gla: 800,
  sales: 640000,
  salesPerSqft: 800,
  yoyIndex: 65.2,
  grocPct: 22.1,
  rentYtd: 141000,
  salesAmountYtd: 640000
}];
const topTenants = tenantSalesData.slice(0, 6);
export function SalesSection() {
  return <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesKPIs.map((kpi, index) => <KPICard key={index} title={kpi.title} value={kpi.value} trend={kpi.trend} prefix={kpi.prefix} suffix={kpi.suffix} variant={kpi.variant as any} />)}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales/SF by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
            salesPerSqft: {
              label: "Sales/sqft",
              color: "hsl(var(--primary))"
            },
            target: {
              label: "Target",
              color: "hsl(var(--muted-foreground))"
            }
          }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={value => `$${value}`} />
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
            <CardTitle>Forecasted Sales/SF Evolution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
            total: {
              label: "Total Sales",
              color: "hsl(var(--primary))"
            },
            perSqft: {
              label: "$/sqft",
              color: "hsl(var(--secondary))"
            }
          }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" tickFormatter={value => `$${(value / 1000000).toFixed(1)}M`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={value => `$${value}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line yAxisId="left" type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="perSqft" stroke="hsl(var(--secondary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Tenants Performance */}
        <Card className="lg:col-span-2 rounded-2xl">
          <CardHeader>
            <CardTitle>Top Tenants Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b border-border">
                    <th className="p-3 text-left font-medium text-muted-foreground">Tenant</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">Category</th>
                    <th className="p-3 text-right font-medium text-muted-foreground">GLA (SF)</th>
                    <th className="p-3 text-right font-medium text-muted-foreground">Total Sales</th>
                    <th className="p-3 text-right font-medium text-muted-foreground">Sales/SF</th>
                    <th className="p-3 text-right font-medium text-muted-foreground">YoY Index</th>
                  </tr>
                </thead>
                <tbody>
                  {topTenants.map((tenant, index) => <tr key={index} className={`border-b border-border hover:bg-muted/50 ${index % 2 === 1 ? 'bg-muted/25' : ''}`}>
                      <td className="p-3 font-medium">{tenant.tenant}</td>
                      <td className="p-3">{tenant.category}</td>
                      <td className="p-3 text-right font-mono">
                        {formatNumberShort(tenant.gla)}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {formatCurrency(tenant.sales)}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {formatCurrency(tenant.salesPerSqft, false)}
                      </td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-1 rounded text-sm ${tenant.yoyIndex >= 105 ? 'bg-success/20 text-success' : tenant.yoyIndex >= 95 ? 'bg-warning/20 text-warning' : 'bg-destructive/20 text-destructive'}`}>
                          {tenant.yoyIndex}%
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Sales Analysis Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bottom Performers (Sales) */}
        <SalesTable title="Bottom Performers (Sales)" data={getBottomPerformersSales(tenantSalesData, defaultSalesKPIConfig)} showFlags={true} emptyMessage="No bottom performers found" />

        {/* Luxury Tenants */}
        <SalesTable title="Luxury Tenants" data={getLuxuryTenants(tenantSalesData)} showSearch={true} emptyMessage="No luxury tenants found" />

        {/* Bottom Performers (GROC) */}
        <SalesTable title="Bottom Performers (GROC)" data={getBottomPerformersGROC(tenantSalesData, defaultSalesKPIConfig)} showGROC={true} emptyMessage="No GROC data available" bannerMessage={tenantSalesData.some(t => t.grocPct || t.rentYtd) ? undefined : "Add groc_pct or rent fields to enable GROC ranking."} />

        {/* Top Performers (GROC) */}
        <SalesTable title="Top Performers (GROC)" data={getTopPerformersGROC(tenantSalesData, defaultSalesKPIConfig)} showGROC={true} emptyMessage="No qualifying top performers found" bannerMessage={tenantSalesData.some(t => t.grocPct || t.rentYtd) ? undefined : "Add groc_pct or rent fields to enable GROC ranking."} />
      </div>
    </div>;
}