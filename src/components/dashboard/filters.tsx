import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon, Filter } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"

interface FiltersProps {
  dateRange?: {
    from: Date
    to: Date
  }
  onDateRangeChange?: (range: { from: Date; to: Date } | undefined) => void
  selectedAsset?: string
  onAssetChange?: (asset: string) => void
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  selectedTenant?: string
  onTenantChange?: (tenant: string) => void
}

const assets = [
  { value: "all", label: "Tous les assets" },
  { value: "royalmount", label: "Royalmount" },
  { value: "centre", label: "Centre" },
  { value: "high_street", label: "High Street" }
]

const categories = [
  { value: "all", label: "Toutes catégories" },
  { value: "fashion", label: "Fashion" },
  { value: "food", label: "Food & Beverage" },
  { value: "services", label: "Services" },
  { value: "entertainment", label: "Entertainment" }
]

const tenants = [
  { value: "all", label: "Tous les locataires" },
  { value: "tenant1", label: "Locataire 1" },
  { value: "tenant2", label: "Locataire 2" },
  { value: "tenant3", label: "Locataire 3" }
]

export function DashboardFilters({
  dateRange,
  onDateRangeChange,
  selectedAsset = "all",
  onAssetChange,
  selectedCategory = "all",
  onCategoryChange,
  selectedTenant = "all",
  onTenantChange
}: FiltersProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card border border-card-border rounded-lg">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Filtres globaux</span>
      </div>
      
      {/* Date Range Picker */}
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd MMM yyyy", { locale: fr })} -{" "}
                  {format(dateRange.to, "dd MMM yyyy", { locale: fr })}
                </>
              ) : (
                format(dateRange.from, "dd MMM yyyy", { locale: fr })
              )
            ) : (
              <span>Sélectionner période</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              onDateRangeChange?.(range as { from: Date; to: Date })
              if (range?.from && range?.to) {
                setIsCalendarOpen(false)
              }
            }}
            numberOfMonths={2}
            locale={fr}
          />
        </PopoverContent>
      </Popover>

      {/* Asset Filter */}
      <Select value={selectedAsset} onValueChange={onAssetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sélectionner asset" />
        </SelectTrigger>
        <SelectContent>
          {assets.map((asset) => (
            <SelectItem key={asset.value} value={asset.value}>
              {asset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Tenant Filter */}
      <Select value={selectedTenant} onValueChange={onTenantChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Locataire" />
        </SelectTrigger>
        <SelectContent>
          {tenants.map((tenant) => (
            <SelectItem key={tenant.value} value={tenant.value}>
              {tenant.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}