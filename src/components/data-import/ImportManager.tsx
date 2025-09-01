import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { DataImportService, validateImportedData } from '@/lib/data-import';
import { useToast } from '@/hooks/use-toast';

interface ImportResult {
  isSuccess: boolean;
  message: string;
  recordsProcessed?: number;
  errors?: string[];
}

export function ImportManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [importResults, setImportResults] = useState<ImportResult | null>(null);
  const { toast } = useToast();

  const handleFileImport = async (file: File, dataType: string) => {
    setIsLoading(true);
    setImportResults(null);

    try {
      const text = await file.text();
      let result: ImportResult;

      switch (dataType) {
        case 'kpis':
          const kpiData = DataImportService.parseKPIData(text);
          const kpiValidation = validateImportedData(kpiData, ['metric', 'value', 'format', 'category']);
          result = {
            isSuccess: kpiValidation.isValid,
            message: kpiValidation.isValid ? 'KPI data imported successfully' : 'Validation errors found',
            recordsProcessed: kpiData.length,
            errors: kpiValidation.errors
          };
          break;

        case 'tenants':
          const tenantData = DataImportService.parseTenantData(text);
          const tenantValidation = validateImportedData(tenantData, ['tenantName', 'category', 'gla', 'sales']);
          result = {
            isSuccess: tenantValidation.isValid,
            message: tenantValidation.isValid ? 'Tenant data imported successfully' : 'Validation errors found',
            recordsProcessed: tenantData.length,
            errors: tenantValidation.errors
          };
          break;

        case 'traffic':
          const trafficData = DataImportService.parseTrafficData(text);
          const trafficValidation = validateImportedData(trafficData, ['date', 'totalVisitors', 'marketShare']);
          result = {
            isSuccess: trafficValidation.isValid,
            message: trafficValidation.isValid ? 'Traffic data imported successfully' : 'Validation errors found',
            recordsProcessed: trafficData.length,
            errors: trafficValidation.errors
          };
          break;

        case 'finance':
          const financeData = DataImportService.parseFinanceData(text);
          const financeValidation = validateImportedData(financeData, ['month', 'baseRent', 'noi']);
          result = {
            isSuccess: financeValidation.isValid,
            message: financeValidation.isValid ? 'Finance data imported successfully' : 'Validation errors found',
            recordsProcessed: financeData.length,
            errors: financeValidation.errors
          };
          break;

        case 'operations':
          const opsData = DataImportService.parseOperationsData(text);
          const opsValidation = validateImportedData(opsData, ['month', 'energyIndex', 'responseTime']);
          result = {
            isSuccess: opsValidation.isValid,
            message: opsValidation.isValid ? 'Operations data imported successfully' : 'Validation errors found',
            recordsProcessed: opsData.length,
            errors: opsValidation.errors
          };
          break;

        case 'guest':
          const guestData = DataImportService.parseGuestData(text);
          const guestValidation = validateImportedData(guestData, ['month', 'npsScore']);
          result = {
            isSuccess: guestValidation.isValid,
            message: guestValidation.isValid ? 'Guest experience data imported successfully' : 'Validation errors found',
            recordsProcessed: guestData.length,
            errors: guestValidation.errors
          };
          break;

        case 'cleaning':
          const cleaningData = DataImportService.parseCleaningData(text);
          const cleaningValidation = validateImportedData(cleaningData, ['month', 'cqsScore']);
          result = {
            isSuccess: cleaningValidation.isValid,
            message: cleaningValidation.isValid ? 'Cleaning quality data imported successfully' : 'Validation errors found',
            recordsProcessed: cleaningData.length,
            errors: cleaningValidation.errors
          };
          break;

        default:
          result = {
            isSuccess: false,
            message: 'Unknown data type selected'
          };
      }

      setImportResults(result);
      
      if (result.isSuccess) {
        toast({
          title: "Import Successful",
          description: `${result.recordsProcessed} records processed successfully`,
        });
      } else {
        toast({
          title: "Import Failed",
          description: "Please check the validation errors and try again",
          variant: "destructive",
        });
      }

    } catch (error) {
      const errorMessage = 'Failed to process file. Please check the format and try again.';
      setImportResults({
        isSuccess: false,
        message: errorMessage
      });
      
      toast({
        title: "Import Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTemplate = (templateType: string) => {
    console.log('Download template called for:', templateType);
    
    const templateData: Record<string, string> = {
      kpis: `metric,value,trend,target,format,category
NOI Monthly,450000,2.3,430000,currency,overview
NOI YTD,4200000,4.1,4100000,currency,overview
Occupancy,94.2,1.2,95.0,percentage,overview
Traffic Monthly,245000,-1.8,250000,number,overview
Market Share,42.1,0.5,43.0,percentage,overview
Sales per SF,425.30,3.2,420.00,currency,overview
Total Sales,23450000,5.1,22000000,currency,overview
Leasing Activity,15,25.0,12,number,overview
Parking Occupancy,78.5,-2.1,80.0,percentage,overview
Energy Index,102.3,-1.5,100.0,number,overview`,
      
      tenants: `tenantName,category,gla,sales,salesPerSF,yoyIndex,grocCurrent,grocPrevious
Apple Store,Electronics,2500,980000,392.00,108.5,450000,420000
Zara,Fashion,3200,756000,236.25,95.2,680000,720000
The Keg,Restaurant,4500,1200000,266.67,112.3,950000,850000
Sport Chek,Sporting Goods,5200,624000,120.00,89.5,580000,650000
Sephora,Beauty,1800,432000,240.00,102.7,380000,370000
Hudson's Bay,Department Store,12000,2400000,200.00,96.8,2100000,2200000
Lululemon,Activewear,2200,550000,250.00,118.5,480000,400000
Tim Hortons,Food Service,800,180000,225.00,105.2,155000,148000
Pandora,Jewelry,650,195000,300.00,101.8,170000,167000
Foot Locker,Footwear,2800,420000,150.00,93.4,380000,410000`,
      
      traffic: `date,totalVisitors,marketShare,fridayVisitors,saturdayVisitors,sundayVisitors
2024-01-01,35000,42.1,12000,15000,8000
2024-01-08,38000,42.3,13000,16000,9000
2024-01-15,36000,41.8,12500,15500,8000
2024-01-22,39000,42.5,13500,16500,9000
2024-01-29,37000,42.0,12800,15800,8400
2024-02-05,40000,42.8,14000,17000,9000`,
      
      finance: `month,baseRent,percentRent,noi,operatingRatio,receivables30,receivables60,receivables90,receivables90Plus
2024-01,3200000,480000,420000,68.5,125000,45000,18000,8000
2024-02,3250000,495000,435000,67.8,118000,38000,15000,6000
2024-03,3300000,510000,450000,67.2,132000,42000,20000,9000
2024-04,3350000,525000,465000,66.9,128000,40000,17000,7000
2024-05,3400000,540000,480000,66.5,135000,48000,22000,11000
2024-06,3450000,555000,495000,66.1,142000,52000,25000,13000`,
      
      operations: `month,energyIndex,hydroConsumption,responseTime,slaCompliance,safetyIncidents,workOrdersCompleted
2024-01,102.3,1250000,2.1,94.5,2,156
2024-02,101.8,1180000,1.9,95.2,1,142
2024-03,100.5,1320000,2.3,93.8,3,168
2024-04,99.8,1280000,2.0,94.8,1,159
2024-05,101.2,1420000,2.2,94.1,2,172
2024-06,102.1,1580000,2.4,93.5,4,185`,
      
      guest: `month,npsScore,parkingAppUsage,giftCardSales,complaintsTotal,complaintsResolved,serviceScore,cleanlinessScore,ambienceScore
2024-01,72.5,68.2,185000,24,22,8.2,8.5,8.1
2024-02,73.1,69.8,205000,18,17,8.4,8.6,8.3
2024-03,71.8,71.2,220000,32,28,8.1,8.3,8.0
2024-04,74.2,72.5,195000,21,19,8.5,8.7,8.4
2024-05,73.6,74.1,235000,26,24,8.3,8.4,8.2
2024-06,75.1,75.8,248000,19,18,8.6,8.8,8.5`,
      
      cleaning: `month,cqsScore,surfaceCleanliness,washroomHygiene,floorCleanliness,generalAppearance,foodCourtScore,fashionWingScore,commonAreasScore
2024-01,85.2,87.5,82.3,86.8,84.1,81.5,88.2,86.4
2024-02,86.1,88.2,83.8,87.5,85.3,82.8,89.1,87.2
2024-03,84.8,86.9,81.5,85.9,83.7,80.2,87.5,85.8
2024-04,87.3,89.1,85.2,88.7,86.8,84.5,90.2,88.9
2024-05,86.7,88.8,84.6,87.9,85.9,83.1,89.8,87.6
2024-06,88.1,90.2,86.3,89.4,87.5,85.8,91.5,89.7`
    };

    const csvData = templateData[templateType];
    if (!csvData) {
      toast({
        title: "Download Error",
        description: "Template data not found",
        variant: "destructive",
      });
      return;
    }

    // Check if we're in an iframe (like Lovable preview) where downloads might be blocked
    const isInIframe = window.self !== window.top;
    
    if (isInIframe) {
      // Fallback for iframe environments: copy to clipboard instead
      navigator.clipboard.writeText(csvData).then(() => {
        toast({
          title: "Template Copied",
          description: `${templateType} template data copied to clipboard. Paste into a CSV file.`,
        });
      }).catch(() => {
        // If clipboard fails, show the data in a new window
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`<pre>${csvData}</pre>`);
          newWindow.document.title = `${templateType}-template.csv`;
          toast({
            title: "Template Opened",
            description: `${templateType} template opened in new window. Copy and save as CSV.`,
          });
        } else {
          toast({
            title: "Download Blocked",
            description: "Please allow popups or use the deployed version for downloads.",
            variant: "destructive",
          });
        }
      });
      return;
    }

    try {
      // Standard download approach for non-iframe environments
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${templateType}-template.csv`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      
      // Use setTimeout to ensure the link is properly added before clicking
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Download Started",
          description: `${templateType}-template.csv download initiated`,
        });
      }, 100);
      
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download template. Data copied to clipboard instead.",
        variant: "destructive",
      });
      
      // Fallback to clipboard
      navigator.clipboard.writeText(csvData);
    }
  };

  const ImportSection = ({ 
    title, 
    dataType, 
    description 
  }: { 
    title: string; 
    dataType: string; 
    description: string; 
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadTemplate(dataType)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Template
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`file-${dataType}`}>Upload CSV File</Label>
          <Input
            id={`file-${dataType}`}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileImport(file, dataType);
              }
            }}
            disabled={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Data Import Manager</h2>
        <p className="text-muted-foreground">
          Import real data from Excel/CSV files to update dashboard metrics
        </p>
      </div>

      {importResults && (
        <Alert variant={importResults.isSuccess ? "default" : "destructive"}>
          {importResults.isSuccess ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>
            {importResults.message}
            {importResults.recordsProcessed && (
              <span className="block mt-1">
                Records processed: {importResults.recordsProcessed}
              </span>
            )}
            {importResults.errors && importResults.errors.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Validation Errors:</p>
                <ul className="list-disc list-inside text-sm">
                  {importResults.errors.slice(0, 10).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                  {importResults.errors.length > 10 && (
                    <li>... and {importResults.errors.length - 10} more errors</li>
                  )}
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ImportSection
            title="KPI Metrics"
            dataType="kpis"
            description="Import key performance indicators for the overview dashboard"
          />
          <ImportSection
            title="Traffic Data"
            dataType="traffic"
            description="Import visitor traffic and market share data"
          />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <ImportSection
            title="Financial Metrics"
            dataType="finance"
            description="Import NOI, rent, and receivables data"
          />
          <ImportSection
            title="Tenant Sales"
            dataType="tenants"
            description="Import individual tenant sales performance data"
          />
        </TabsContent>

        <TabsContent value="operational" className="space-y-4">
          <ImportSection
            title="Operations Data"
            dataType="operations"
            description="Import energy, maintenance, and safety metrics"
          />
          <ImportSection
            title="Cleaning Quality"
            dataType="cleaning"
            description="Import CQS scores and area performance data"
          />
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <ImportSection
            title="Guest Experience"
            dataType="guest"
            description="Import NPS, satisfaction, and service metrics"
          />
        </TabsContent>
      </Tabs>

      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 animate-spin" />
            <span>Processing file...</span>
          </div>
        </div>
      )}
    </div>
  );
}