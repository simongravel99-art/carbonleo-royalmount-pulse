import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { DashboardFilters } from "@/components/dashboard/filters"
import { DashboardOverview } from "@/components/dashboard/overview"
import { addDays, subWeeks } from "date-fns"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subWeeks(new Date(), 4),
    to: new Date()
  })
  const [selectedAsset, setSelectedAsset] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTenant, setSelectedTenant] = useState("all")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "finance":
        return (
          <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
            <p className="text-muted-foreground">Section Finance - En développement</p>
          </div>
        )
      case "occupancy":
        return (
          <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
            <p className="text-muted-foreground">Section Occupancy & Leasing - En développement</p>
          </div>
        )
      case "sales":
        return (
          <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
            <p className="text-muted-foreground">Section Sales - En développement</p>
          </div>
        )
      case "traffic":
        return (
          <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
            <p className="text-muted-foreground">Section Traffic & Parking - En développement</p>
          </div>
        )
      case "ops":
        return (
          <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
            <p className="text-muted-foreground">Section Ops Excellence - En développement</p>
          </div>
        )
      case "guest":
        return (
          <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
            <p className="text-muted-foreground">Section Guest Experience - En développement</p>
          </div>
        )
      case "cleaning":
        return (
          <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
            <p className="text-muted-foreground">Section Cleaning Quality - En développement</p>
          </div>
        )
      case "admin":
        return (
          <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-card-border">
            <p className="text-muted-foreground">Section Admin - Données - En développement</p>
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {activeTab === "overview" ? "Vue d'ensemble" : 
                 activeTab === "finance" ? "Finance" :
                 activeTab === "occupancy" ? "Occupancy & Leasing" :
                 activeTab === "sales" ? "Sales" :
                 activeTab === "traffic" ? "Traffic & Parking" :
                 activeTab === "ops" ? "Ops Excellence" :
                 activeTab === "guest" ? "Guest Experience" :
                 activeTab === "cleaning" ? "Cleaning Quality" :
                 activeTab === "admin" ? "Admin - Données" : "Dashboard"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {activeTab === "overview" ? "KPIs globaux et indicateurs clés de performance" :
                 "Données détaillées et analyses spécialisées"}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Filters */}
            <DashboardFilters
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              selectedAsset={selectedAsset}
              onAssetChange={setSelectedAsset}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTenant={selectedTenant}
              onTenantChange={setSelectedTenant}
            />

            {/* Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}