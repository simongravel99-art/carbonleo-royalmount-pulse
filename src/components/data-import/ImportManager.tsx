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
    const templateUrls: Record<string, string> = {
      kpis: '/templates/csv/overview-kpis.csv',
      tenants: '/templates/csv/tenant-sales.csv',
      traffic: '/templates/csv/traffic-data.csv',
      finance: '/templates/csv/finance-data.csv',
      operations: '/templates/csv/operations-data.csv',
      guest: '/templates/csv/guest-experience-data.csv',
      cleaning: '/templates/csv/cleaning-quality-data.csv'
    };

    const url = templateUrls[templateType];
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${templateType}-template.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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