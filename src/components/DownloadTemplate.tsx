import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DownloadTemplate() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/templates/dashboard_complete_template.csv'
    link.download = 'dashboard_complete_template.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleDownload} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Download Complete Template
    </Button>
  )
}