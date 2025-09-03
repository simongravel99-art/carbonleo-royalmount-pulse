import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DashboardFilters } from "@/components/filters/dashboard-filters"
import { DashboardOverview } from "@/components/dashboard/overview"
import { FinanceSection } from "@/components/dashboard/finance"
import { OccupancySection } from "@/components/dashboard/occupancy"
import { SalesSection } from "@/components/dashboard/sales"
import { TrafficSection } from "@/components/dashboard/traffic"
import { OpsSection } from "@/components/dashboard/ops"
import { GuestExperienceSection } from "@/components/dashboard/guest-experience"
import { CleaningQualitySection } from "@/components/dashboard/cleaning-quality"
import { ImportManager } from "@/components/data-import/ImportManager"
import { addDays, subWeeks } from "date-fns"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [filters, setFilters] = useState({
    dateRange: {
      from: subWeeks(new Date(), 4),
      to: new Date()
    },
    asset: "all",
    tenantCategory: [] as string[],
    tenant: ""
  })

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "finance":
        return <FinanceSection />
      case "occupancy":
        return <OccupancySection />
      case "sales":
        return <SalesSection />
      case "traffic":
        return <TrafficSection />
      case "ops":
        return <OpsSection />
      case "guest":
        return <GuestExperienceSection />
      case "cleaning":
        return <CleaningQualitySection />
      case "admin":
        return <ImportManager />
      default:
        return <DashboardOverview />
    }
  }

  const handleExport = () => {
    // Export functionality
    console.log("Exporting dashboard data...");
  };

  const handleSettings = () => {
    // Settings functionality
    console.log("Opening settings...");
  };

  const handleHelp = () => {
    // Help functionality
    console.log("Opening help...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onExport={handleExport}
        onSettings={handleSettings}
        onHelp={handleHelp}
      />
      
      <div className="flex pt-14">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
        
        <main className="flex-1 min-h-[calc(100vh-3.5rem)]">
          {/* Filters */}
          <DashboardFilters
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Content */}
          <div className="p-6 lg:p-10 space-y-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {activeTab === "overview" ? "Overview" : 
                 activeTab === "finance" ? "Finance" :
                 activeTab === "occupancy" ? "Occupancy & Leasing" :
                 activeTab === "sales" ? "Sales" :
                 activeTab === "traffic" ? "Traffic & Parking" :
                 activeTab === "ops" ? "Ops & Guest Experience" :
                 activeTab === "guest" ? "Guest Experience" :
                 activeTab === "cleaning" ? "Cleaning Quality" :
                 activeTab === "admin" ? "Admin – Data" : "Dashboard"}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === "overview" ? "Key performance indicators and global metrics" :
                 "Detailed data and specialized analytics"}
              </p>
            </div>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}