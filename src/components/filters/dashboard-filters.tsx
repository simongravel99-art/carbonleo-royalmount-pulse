import { useState } from "react";
import { Calendar, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/format";

interface FilterState {
  dateRange: {
    from: Date;
    to: Date;
  };
  asset: string;
  tenantCategory: string[];
  tenant: string;
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

const ASSET_OPTIONS = [
  { value: "all", label: "Tous les actifs" },
  { value: "royalmount", label: "Royalmount" },
  { value: "other", label: "Autres propriétés" },
];

const CATEGORY_OPTIONS = [
  { value: "retail", label: "Commerce de détail" },
  { value: "restaurant", label: "Restauration" },
  { value: "entertainment", label: "Divertissement" },
  { value: "service", label: "Services" },
];

export function DashboardFilters({
  filters,
  onFiltersChange,
  className,
}: DashboardFiltersProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const hasActiveFilters = () => {
    return (
      filters.asset !== "all" ||
      filters.tenantCategory.length > 0 ||
      filters.tenant !== ""
    );
  };

  const clearAllFilters = () => {
    onFiltersChange({
      ...filters,
      asset: "all",
      tenantCategory: [],
      tenant: "",
    });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.tenantCategory.includes(category)
      ? filters.tenantCategory.filter(c => c !== category)
      : [...filters.tenantCategory, category];
    
    onFiltersChange({
      ...filters,
      tenantCategory: newCategories,
    });
  };

  const removeCategoryFilter = (category: string) => {
    onFiltersChange({
      ...filters,
      tenantCategory: filters.tenantCategory.filter(c => c !== category),
    });
  };

  return (
    <div className={`sticky top-16 z-40 bg-background border-b border-border p-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        {/* Date Range Picker */}
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(filters.dateRange.from)} - {formatDate(filters.dateRange.to)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3">
              <p className="text-sm text-muted-foreground">Sélection de période</p>
              {/* Calendar implementation would go here */}
            </div>
          </PopoverContent>
        </Popover>

        {/* Asset Filter */}
        <Select
          value={filters.asset}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, asset: value })
          }
        >
          <SelectTrigger className="w-48 h-8">
            <SelectValue placeholder="Actif" />
          </SelectTrigger>
          <SelectContent>
            {ASSET_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((category) => (
            <Button
              key={category.value}
              variant={
                filters.tenantCategory.includes(category.value)
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => toggleCategory(category.value)}
              className="h-7 text-xs"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-muted-foreground">Filtres actifs:</span>
            
            {filters.asset !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {ASSET_OPTIONS.find(a => a.value === filters.asset)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => onFiltersChange({ ...filters, asset: "all" })}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {filters.tenantCategory.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {CATEGORY_OPTIONS.find(c => c.value === category)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => removeCategoryFilter(category)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-6 text-xs text-muted-foreground hover:text-foreground"
            >
              Réinitialiser
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}