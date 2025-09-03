/**
 * Excel Import Component with Validation Panel
 */

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileSpreadsheet,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { ExcelImportService } from '@/lib/excel-import';
import { useDashboardStore } from '@/store/dashboard-store';
import { useToast } from '@/hooks/use-toast';
import { REQUIRED_SHEETS } from '@/types/dashboard-data';

export function ExcelImporter() {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const {
    data,
    meta,
    lastFile,
    isLoading,
    validationResult,
    setData,
    setLastFile,
    setLoading,
    setValidationResult,
    clearData,
    hasData
  } = useDashboardStore();

  const handleFileSelect = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      toast({
        title: "Invalid File Type",
        description: "Please select an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setLastFile(file);

    try {
      const result = await ExcelImportService.parseExcelFile(file);
      
      setValidationResult(result.validation);
      
      if (result.validation.isValid && result.data && result.meta) {
        setData(result.data, result.meta);
        
        toast({
          title: "Import Successful",
          description: `${result.meta.totalRecords} records imported from ${result.meta.sheetsProcessed.length} sheets`,
        });
      } else {
        toast({
          title: "Import Failed",
          description: "Please fix validation errors and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Import Error",
        description: "Failed to process Excel file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRefresh = () => {
    if (lastFile) {
      handleFileSelect(lastFile);
    }
  };

  const handleDownloadTemplate = () => {
    try {
      const templateBlob = ExcelImportService.generateTemplate();
      const url = URL.createObjectURL(templateBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Royal_Mount_Dashboard_Template.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Template Downloaded",
        description: "Royal_Mount_Dashboard_Template.xlsx downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download template file",
        variant: "destructive",
      });
    }
  };

  const handleExportData = () => {
    try {
      const exportBlob = ExcelImportService.exportToExcel(data);
      const url = URL.createObjectURL(exportBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Royal_Mount_Dashboard_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: "Dashboard data exported successfully",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export dashboard data",
        variant: "destructive",
      });
    }
  };

  const hasAnyData = Object.values(data).some(sheet => sheet.length > 0);

  return (
    <div className="space-y-6">
      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Excel Data Import
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              {isLoading ? 'Processing...' : 'Drop Excel file here or click to browse'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Royal Mount Dashboard Template (.xlsx)
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              Select File
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Template
            </Button>
            
            {lastFile && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            )}
            
            {hasAnyData && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Current Data
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearData}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Data
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Import Status */}
      {meta && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Import Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">File:</span>
                <span className="text-sm font-medium">{meta.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Imported:</span>
                <span className="text-sm font-medium">
                  {new Date(meta.importedAt).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Records:</span>
                <span className="text-sm font-medium">{meta.totalRecords}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sheets:</span>
                <span className="text-sm font-medium">{meta.sheetsProcessed.length}/12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Results */}
      {validationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {validationResult.isValid ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
              Schema Validation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Validation Status */}
            <div className="flex items-center gap-2">
              <Badge variant={validationResult.isValid ? "default" : "destructive"}>
                {validationResult.isValid ? "Valid" : "Invalid"}
              </Badge>
              {validationResult.errors.length > 0 && (
                <Badge variant="destructive">
                  {validationResult.errors.length} Errors
                </Badge>
              )}
              {validationResult.warnings.length > 0 && (
                <Badge variant="secondary">
                  {validationResult.warnings.length} Warnings
                </Badge>
              )}
            </div>

            {/* Errors */}
            {validationResult.errors.length > 0 && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-2">Validation Errors:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {validationResult.errors.map((error, index) => (
                      <li key={index} className="text-sm">{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Warnings */}
            {validationResult.warnings.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-2">Warnings:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {validationResult.warnings.map((warning, index) => (
                      <li key={index} className="text-sm">{warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Sheet Status */}
            <div>
              <p className="font-medium mb-2">Required Sheets Status:</p>
              <div className="grid grid-cols-2 gap-2">
                {REQUIRED_SHEETS.map(sheetName => {
                  const sheetHasData = hasData(sheetName);
                  return (
                    <div key={sheetName} className="flex items-center gap-2">
                      {sheetHasData ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${sheetHasData ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {sheetName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!hasAnyData && !validationResult && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No dashboard data imported. All widgets will show empty states until you import a valid Excel template.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}