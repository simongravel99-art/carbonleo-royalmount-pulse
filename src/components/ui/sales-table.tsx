import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Settings, Search, AlertTriangle } from "lucide-react";
import { formatNumberShort, formatCurrency, formatPct } from "@/lib/format";
import { TenantSalesData, getGROCBadgeClass, calculateGROC } from "@/lib/sales-utils";
import { cn } from "@/lib/utils";
interface SalesTableProps {
  title: string;
  data: TenantSalesData[];
  showSearch?: boolean;
  showGROC?: boolean;
  showFlags?: boolean;
  emptyMessage?: string;
  bannerMessage?: string;
}
export function SalesTable({
  title,
  data,
  showSearch = false,
  showGROC = false,
  showFlags = false,
  emptyMessage,
  bannerMessage
}: SalesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [density, setDensity] = useState<"default" | "compact">("default");
  const filteredData = data.filter(tenant => tenant.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
  const exportCSV = () => {
    const headers = ["Tenant", "Category", "GLA (sqft)", "Total Sales", "Sales/sqft", "YoY Index (%)"];
    if (showGROC) headers.push("GROC (%)");
    if (showFlags) headers.push("Flags");
    const csvContent = [headers.join(","), ...filteredData.map(tenant => {
      const row = [`"${tenant.tenant}"`, `"${tenant.category}"`, tenant.gla.toLocaleString(), formatCurrency(tenant.sales), formatCurrency(tenant.salesPerSqft, false), formatPct(tenant.yoyIndex / 100)];
      if (showGROC) {
        const groc = calculateGROC(tenant);
        row.push(groc !== null ? formatPct(groc / 100) : "—");
      }
      if (showFlags) {
        row.push(`"${(tenant.flags || []).join(", ")}"`);
      }
      return row.join(",");
    })].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "_")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return <Card className="rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {showSearch && <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search tenants..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 w-64" />
              </div>}
            <Button variant="outline" size="sm" onClick={() => setDensity(density === "default" ? "compact" : "default")}>
              <Settings className="h-4 w-4 mr-2" />
              {density === "default" ? "Compact" : "Default"}
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        {bannerMessage && <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm text-warning-foreground">{bannerMessage}</span>
          </div>}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">GLA (sqft)</TableHead>
                <TableHead className="text-right">Total Sales</TableHead>
                <TableHead className="text-right">Sales/sqft</TableHead>
                <TableHead className="text-right">YoY Index</TableHead>
                {showGROC && <TableHead className="text-right">GROC %</TableHead>}
                {showFlags}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? <TableRow>
                  <TableCell colSpan={6 + (showGROC ? 1 : 0) + (showFlags ? 1 : 0)} className="text-center py-8 text-muted-foreground">
                    {emptyMessage || "No data available"}
                  </TableCell>
                </TableRow> : filteredData.map((tenant, index) => {
              const groc = calculateGROC(tenant);
              return <TableRow key={`${tenant.tenant}-${index}`} className={cn("hover:bg-muted/50", index % 2 === 1 && "bg-muted/25", density === "compact" && "h-10")}>
                      <TableCell className={cn("font-medium", density === "compact" && "py-2")}>
                        {tenant.tenant}
                      </TableCell>
                      <TableCell className={cn(density === "compact" && "py-2")}>
                        {tenant.category}
                      </TableCell>
                      <TableCell className={cn("text-right font-mono", density === "compact" && "py-2")}>
                        {formatNumberShort(tenant.gla)}
                      </TableCell>
                      <TableCell className={cn("text-right font-mono", density === "compact" && "py-2")}>
                        {formatCurrency(tenant.sales)}
                      </TableCell>
                      <TableCell className={cn("text-right font-mono", density === "compact" && "py-2")}>
                        {formatCurrency(tenant.salesPerSqft, false)}
                      </TableCell>
                      <TableCell className={cn("text-right", density === "compact" && "py-2")}>
                        <Badge variant={tenant.yoyIndex >= 100 ? "default" : "destructive"} className={cn(tenant.yoyIndex >= 100 ? "bg-success/20 text-success border-success/30" : "bg-destructive/20 text-destructive border-destructive/30")}>
                          {formatPct(tenant.yoyIndex / 100)}
                        </Badge>
                      </TableCell>
                      {showGROC && <TableCell className={cn("text-right", density === "compact" && "py-2")}>
                          {groc !== null ? <Badge className={getGROCBadgeClass(groc, {
                    grocThresholds: {
                      good: 10,
                      warning: 15,
                      danger: 15
                    },
                    bottomPerformersLimit: 15,
                    topPerformersLimit: 15,
                    outlierThresholds: {
                      minSales: 5000,
                      minGla: 300
                    }
                  })}>
                              {formatPct(groc / 100)}
                            </Badge> : <span className="text-muted-foreground">—</span>}
                        </TableCell>}
                      {showFlags && <TableCell className={cn(density === "compact" && "py-2")}>
                          <div className="flex flex-wrap gap-1">
                            {(tenant.flags || []).map((flag, flagIndex) => (
                              <span key={flagIndex} className="text-xs">{flag}</span>
                            ))}
                          </div>
                        </TableCell>}
                    </TableRow>;
            })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>;
}