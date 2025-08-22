import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  DollarSign, 
  Building, 
  ShoppingCart, 
  Car, 
  Users, 
  Sparkles, 
  Settings,
  Upload
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  className?: string
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  {
    id: "overview",
    label: "Vue d'ensemble",
    icon: LayoutDashboard,
    description: "KPIs globaux et tendances"
  },
  {
    id: "finance",
    label: "Finance",
    icon: DollarSign,
    description: "NOI, revenus et dépenses"
  },
  {
    id: "occupancy",
    label: "Occupancy & Leasing",
    icon: Building,
    description: "Taux d'occupation et location"
  },
  {
    id: "sales",
    label: "Sales",
    icon: ShoppingCart,
    description: "Ventes par locataire et catégorie"
  },
  {
    id: "traffic",
    label: "Traffic & Parking",
    icon: Car,
    description: "Trafic visiteurs et stationnement"
  },
  {
    id: "ops",
    label: "Ops Excellence",
    icon: Settings,
    description: "Énergie, maintenance et sécurité"
  },
  {
    id: "guest",
    label: "Guest Experience",
    icon: Users,
    description: "NPS, complaints et services"
  },
  {
    id: "cleaning",
    label: "Cleaning Quality",
    icon: Sparkles,
    description: "CQS et scores de propreté"
  }
]

export function Sidebar({ className, activeTab, onTabChange }: SidebarProps) {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border", className)}>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-sidebar-primary to-sidebar-ring flex items-center justify-center">
            <LayoutDashboard className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Carbonleo</h1>
            <p className="text-xs text-sidebar-foreground/70">Royalmount KPIs</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-auto p-3 text-left transition-all duration-200",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-primary/20" 
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className={cn(
                  "mr-3 h-4 w-4 flex-shrink-0",
                  isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
                )} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-sidebar-foreground/50 mt-0.5 line-clamp-1">
                    {item.description}
                  </div>
                </div>
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Admin Section */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full justify-start bg-sidebar-accent/20 border-sidebar-border hover:bg-sidebar-accent/40"
          onClick={() => onTabChange("admin")}
        >
          <Upload className="mr-2 h-4 w-4" />
          <span className="text-sm">Admin - Données</span>
        </Button>
      </div>
    </div>
  )
}