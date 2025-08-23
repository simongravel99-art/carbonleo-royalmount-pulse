import { useState } from "react"
import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileSpreadsheet, Database, Settings, Download, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const systemKPIs = [
  { title: "Data Freshness", value: "2h", trend: 0, suffix: " ago", variant: "success" },
  { title: "Records Processed", value: "12.5K", trend: 5.2, variant: "success" },
  { title: "Data Quality", value: "98.7", trend: 1.2, suffix: "%", variant: "success" },
  { title: "System Uptime", value: "99.9", trend: 0.1, suffix: "%", variant: "success" },
  { title: "Last Sync", value: "14:32", trend: 0, variant: "default" },
  { title: "Active Users", value: "24", trend: 8.3, variant: "success" }
]

const dataSourceStatus = [
  { source: "Finance Excel", lastUpdate: "2024-01-15 14:32", status: "Connected", records: 1247 },
  { source: "Occupancy Sheet", lastUpdate: "2024-01-15 14:31", status: "Connected", records: 856 },
  { source: "Sales Data", lastUpdate: "2024-01-15 14:30", status: "Connected", records: 3421 },
  { source: "Traffic Analytics", lastUpdate: "2024-01-15 14:29", status: "Connected", records: 2134 },
  { source: "Operations Data", lastUpdate: "2024-01-15 14:28", status: "Connected", records: 967 },
  { source: "Guest Experience", lastUpdate: "2024-01-15 14:27", status: "Connected", records: 789 }
]

const recentImports = [
  { filename: "royalmount_kpis_2024_w03.xlsx", date: "2024-01-15 14:32", status: "Success", user: "admin@carbonleo.com" },
  { filename: "occupancy_update_jan15.xlsx", date: "2024-01-15 10:15", status: "Success", user: "manager@carbonleo.com" },
  { filename: "sales_weekly_w02.xlsx", date: "2024-01-08 16:45", status: "Success", user: "admin@carbonleo.com" },
  { filename: "traffic_data_w02.xlsx", date: "2024-01-08 09:30", status: "Warning", user: "analyst@carbonleo.com" },
  { filename: "operations_jan01.xlsx", date: "2024-01-01 12:00", status: "Success", user: "ops@carbonleo.com" }
]

export function AdminSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsUploading(false)
    setSelectedFile(null)
    
    toast({
      title: "Import Success",
      description: `File "${selectedFile.name}" imported successfully. Dashboard data has been refreshed.`
    })
    
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleRefreshData = async () => {
    toast({
      title: "Refreshing Data",
      description: "Syncing with all data sources..."
    })
    
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast({
      title: "Data Refreshed",
      description: "All dashboard data has been updated successfully."
    })
  }

  const exportTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Excel template has been downloaded to your device."
    })
  }

  return (
    <div className="space-y-6">
      {/* System KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemKPIs.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            suffix={kpi.suffix}
            variant={kpi.variant as any}
          />
        ))}
      </div>

      {/* Data Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Import Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Select Excel File</Label>
              <Input 
                id="file-upload"
                type="file" 
                accept=".xlsx,.xls" 
                onChange={handleFileSelect}
                className="mt-1"
              />
              {selectedFile && (
                <div className="mt-2 p-2 bg-muted rounded text-sm">
                  <FileSpreadsheet className="inline h-4 w-4 mr-2" />
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleUpload} 
                disabled={!selectedFile || isUploading}
                className="flex-1"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Import File
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={exportTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Template
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>• File should contain all required sheets: finance, occupancy, sales, traffic, ops, guest_experience, cleaning_quality</p>
              <p>• Maximum file size: 50MB</p>
              <p>• Supported formats: .xlsx, .xls</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleRefreshData}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh All Data
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Current Data
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>

            <div className="pt-3 border-t">
              <h4 className="text-sm font-medium mb-2">Data Validation</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center text-success">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Schema validation: PASSED
                </div>
                <div className="flex items-center text-success">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Data integrity: PASSED
                </div>
                <div className="flex items-center text-warning">
                  <AlertCircle className="h-3 w-3 mr-2" />
                  Missing values: 12 fields
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Data Sources Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Source</th>
                    <th className="border border-border p-3 text-center">Status</th>
                    <th className="border border-border p-3 text-center">Last Update</th>
                    <th className="border border-border p-3 text-center">Records</th>
                    <th className="border border-border p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSourceStatus.map((source, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border border-border p-3 font-medium">{source.source}</td>
                      <td className="border border-border p-3 text-center">
                        <Badge variant={source.status === 'Connected' ? 'default' : 'destructive'}>
                          {source.status}
                        </Badge>
                      </td>
                      <td className="border border-border p-3 text-center font-mono text-sm">
                        {source.lastUpdate}
                      </td>
                      <td className="border border-border p-3 text-center">
                        {source.records.toLocaleString()}
                      </td>
                      <td className="border border-border p-3 text-center">
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Imports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Imports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Filename</th>
                    <th className="border border-border p-3 text-center">Date</th>
                    <th className="border border-border p-3 text-center">Status</th>
                    <th className="border border-border p-3 text-left">User</th>
                  </tr>
                </thead>
                <tbody>
                  {recentImports.map((import_, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border border-border p-3 font-mono text-sm">{import_.filename}</td>
                      <td className="border border-border p-3 text-center font-mono text-sm">
                        {import_.date}
                      </td>
                      <td className="border border-border p-3 text-center">
                        <Badge variant={
                          import_.status === 'Success' ? 'default' : 
                          import_.status === 'Warning' ? 'secondary' : 'destructive'
                        }>
                          {import_.status}
                        </Badge>
                      </td>
                      <td className="border border-border p-3 text-sm">{import_.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}