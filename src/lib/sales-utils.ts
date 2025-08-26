/**
 * Sales utilities for ranking, filtering, and GROC calculations
 */

import { formatNumberShort, formatCurrency, formatPct } from "./format"

export interface TenantSalesData {
  tenant: string
  category: string
  gla: number
  sales: number
  salesPerSqft: number
  yoyIndex: number
  grocPct?: number
  rentYtd?: number
  salesAmountYtd?: number
  flags?: string[]
}

export interface SalesKPIConfig {
  bottomPerformersLimit: number
  topPerformersLimit: number
  grocThresholds: {
    good: number    // <= 10%
    warning: number // 10-15%
    danger: number  // > 15%
  }
  outlierThresholds: {
    minSales: number  // $5k
    minGla: number    // 300 sqft
  }
}

export const defaultSalesKPIConfig: SalesKPIConfig = {
  bottomPerformersLimit: 15,
  topPerformersLimit: 15,
  grocThresholds: {
    good: 10,
    warning: 15,
    danger: 15
  },
  outlierThresholds: {
    minSales: 5000,
    minGla: 300
  }
}

export function calculateGROC(tenant: TenantSalesData): number | null {
  if (tenant.grocPct !== undefined) {
    return tenant.grocPct
  }
  
  if (tenant.rentYtd && tenant.salesAmountYtd && tenant.salesAmountYtd > 0) {
    return (tenant.rentYtd / tenant.salesAmountYtd) * 100
  }
  
  return null
}

export function getGROCColorClass(grocPct: number | null, config: SalesKPIConfig): string {
  if (grocPct === null) return "text-muted-foreground"
  
  if (grocPct <= config.grocThresholds.good) return "text-success"
  if (grocPct <= config.grocThresholds.warning) return "text-warning"
  return "text-destructive"
}

export function getGROCBadgeClass(grocPct: number | null, config: SalesKPIConfig): string {
  if (grocPct === null) return "bg-muted/20 text-muted-foreground"
  
  if (grocPct <= config.grocThresholds.good) return "bg-success/20 text-success"
  if (grocPct <= config.grocThresholds.warning) return "bg-warning/20 text-warning"
  return "bg-destructive/20 text-destructive"
}

export function getBottomPerformersSales(data: TenantSalesData[], config: SalesKPIConfig): TenantSalesData[] {
  const salesAmounts = data.map(t => t.salesPerSqft).sort((a, b) => a - b)
  const bottomQuartileThreshold = salesAmounts[Math.floor(salesAmounts.length * 0.25)]
  
  return data
    .map(tenant => ({
      ...tenant,
      flags: [
        ...(tenant.flags || []),
        ...(tenant.yoyIndex < 100 ? ["Low YoY"] : []),
        ...(tenant.salesPerSqft <= bottomQuartileThreshold ? ["Bottom Quartile"] : [])
      ]
    }))
    .sort((a, b) => {
      if (a.yoyIndex !== b.yoyIndex) return a.yoyIndex - b.yoyIndex
      return a.salesPerSqft - b.salesPerSqft
    })
    .slice(0, config.bottomPerformersLimit)
}

export function getLuxuryTenants(data: TenantSalesData[]): TenantSalesData[] {
  return data
    .filter(tenant => tenant.category.toLowerCase().includes("luxury"))
    .sort((a, b) => b.salesPerSqft - a.salesPerSqft)
}

export function getBottomPerformersGROC(data: TenantSalesData[], config: SalesKPIConfig): TenantSalesData[] {
  return data
    .map(tenant => ({ ...tenant, calculatedGROC: calculateGROC(tenant) }))
    .filter(tenant => tenant.calculatedGROC !== null)
    .sort((a, b) => (b.calculatedGROC || 0) - (a.calculatedGROC || 0))
    .slice(0, config.bottomPerformersLimit)
}

export function getTopPerformersGROC(data: TenantSalesData[], config: SalesKPIConfig): TenantSalesData[] {
  return data
    .map(tenant => ({ ...tenant, calculatedGROC: calculateGROC(tenant) }))
    .filter(tenant => 
      tenant.calculatedGROC !== null &&
      tenant.sales >= config.outlierThresholds.minSales &&
      tenant.gla >= config.outlierThresholds.minGla
    )
    .sort((a, b) => (a.calculatedGROC || 0) - (b.calculatedGROC || 0))
    .slice(0, config.topPerformersLimit)
}