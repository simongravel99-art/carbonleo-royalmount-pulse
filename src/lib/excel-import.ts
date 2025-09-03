/**
 * Excel Import Service with Strict Validation
 * Handles xlsx file processing and schema validation
 */

import * as XLSX from 'xlsx';
import { 
  DashboardData, 
  REQUIRED_SHEETS, 
  REQUIRED_COLUMNS, 
  ValidationResult,
  ImportMeta
} from '@/types/dashboard-data';

export class ExcelImportService {
  /**
   * Parse Excel file with strict validation
   */
  static async parseExcelFile(file: File): Promise<{
    data: DashboardData | null;
    meta: ImportMeta | null;
    validation: ValidationResult;
  }> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      // Validate workbook structure
      const validation = this.validateWorkbook(workbook);
      if (!validation.isValid) {
        return { data: null, meta: null, validation };
      }

      // Parse all sheets
      const data = this.parseWorkbookData(workbook);
      
      // Create import metadata
      const meta: ImportMeta = {
        fileName: file.name,
        importedAt: new Date().toISOString(),
        sheetsProcessed: REQUIRED_SHEETS.slice(),
        totalRecords: Object.values(data).reduce((total, sheet) => total + sheet.length, 0)
      };

      return { 
        data, 
        meta, 
        validation: { isValid: true, errors: [], warnings: [] }
      };

    } catch (error) {
      return {
        data: null,
        meta: null,
        validation: {
          isValid: false,
          errors: [`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`],
          warnings: []
        }
      };
    }
  }

  /**
   * Validate Excel workbook structure
   */
  private static validateWorkbook(workbook: XLSX.WorkBook): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check all required sheets exist
    const sheetNames = workbook.SheetNames;
    for (const requiredSheet of REQUIRED_SHEETS) {
      if (!sheetNames.includes(requiredSheet)) {
        errors.push(`Missing required sheet: "${requiredSheet}"`);
      }
    }

    // If sheets missing, don't continue with column validation
    if (errors.length > 0) {
      return { isValid: false, errors, warnings };
    }

    // Validate column headers for each sheet
    for (const sheetName of REQUIRED_SHEETS) {
      const worksheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
      
      if (sheetData.length === 0) {
        warnings.push(`Sheet "${sheetName}" is empty`);
        continue;
      }

      const actualColumns = sheetData[0] as string[];
      const requiredColumns = REQUIRED_COLUMNS[sheetName];
      
      // Check for missing columns
      for (const requiredCol of requiredColumns) {
        if (!actualColumns.includes(requiredCol)) {
          errors.push(`Sheet "${sheetName}": Missing required column "${requiredCol}"`);
        }
      }

      // Check for extra columns (warning only)
      for (const actualCol of actualColumns) {
        if (!requiredColumns.includes(actualCol) && actualCol.trim() !== '') {
          warnings.push(`Sheet "${sheetName}": Unexpected column "${actualCol}"`);
        }
      }

      // Check for data rows
      if (sheetData.length < 2) {
        warnings.push(`Sheet "${sheetName}" has no data rows`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Parse workbook data into typed objects
   */
  private static parseWorkbookData(workbook: XLSX.WorkBook): DashboardData {
    const data: DashboardData = {
      'Overview & KPIs': [],
      'COS Performance': [],
      'Area Performance': [],
      'Guest Experience': [],
      'Operations': [],
      'Traffic & Parking': [],
      'Tenant Performance': [],
      'Occupancy & Leasing': [],
      'Sales Performance': [],
      'Parking Metrics': [],
      'Market Share Trend': [],
      'Complaints Analysis': []
    };

    for (const sheetName of REQUIRED_SHEETS) {
      const worksheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(worksheet, { defval: null });
      
      // Type-safe parsing based on sheet name
      (data as any)[sheetName] = this.parseSheetData(sheetName, rawData);
    }

    return data;
  }

  /**
   * Parse individual sheet data with type conversion
   */
  private static parseSheetData(sheetName: string, rawData: any[]): any[] {
    return rawData.map(row => {
      const parsed: any = {};
      
      // Convert all values based on data type hints from column names
      for (const [key, value] of Object.entries(row)) {
        if (value === null || value === undefined || value === '') {
          parsed[key] = null;
          continue;
        }

        // Parse based on column name patterns
        if (key.includes('Date')) {
          // Parse date
          parsed[key] = this.parseDate(value);
        } else if (key.includes('(%)') || key.includes('Score') || key.includes('Rating') || 
                   key.includes('Index') || key.includes('($)') || key.includes('Value') ||
                   key.includes('Hour') || key.includes('Traffic') || key.includes('Orders') ||
                   key.includes('Incidents') || key.includes('Time') || key.includes('Usage') ||
                   key.includes('Revenue') || key.includes('Sales') || key.includes('GLA') ||
                   key.includes('Units') || key.includes('Complaints') || key.includes('Visitors')) {
          // Parse numeric value
          parsed[key] = this.parseNumber(value);
        } else {
          // Keep as string
          parsed[key] = String(value).trim();
        }
      }
      
      return parsed;
    });
  }

  /**
   * Parse date value
   */
  private static parseDate(value: any): string {
    if (typeof value === 'number') {
      // Excel date serial number
      const date = XLSX.SSF.parse_date_code(value);
      return new Date(date.y, date.m - 1, date.d).toISOString().split('T')[0];
    }
    
    if (typeof value === 'string') {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0];
      }
    }
    
    return String(value);
  }

  /**
   * Parse numeric value
   */
  private static parseNumber(value: any): number {
    if (typeof value === 'number') {
      return value;
    }
    
    if (typeof value === 'string') {
      // Remove common formatting characters
      const cleaned = value.replace(/[$,%\s]/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    
    return 0;
  }

  /**
   * Export dashboard data to Excel file
   */
  static exportToExcel(data: DashboardData): Blob {
    const workbook = XLSX.utils.book_new();

    for (const sheetName of REQUIRED_SHEETS) {
      const sheetData = (data as any)[sheetName] || [];
      const worksheet = XLSX.utils.json_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  /**
   * Generate template Excel file with sample data
   */
  static generateTemplate(): Blob {
    const sampleData: DashboardData = {
      'Overview & KPIs': [
        {
          Metric: 'NOI Monthly',
          'Current Value': 2400000,
          'Previous Value': 2200000,
          'YoY Change (%)': 9.1,
          Target: 2300000,
          Unit: '$',
          Date: '2024-06-01'
        },
        {
          Metric: 'Mall Traffic',
          'Current Value': 847000,
          'Previous Value': 720000,
          'YoY Change (%)': 17.6,
          Target: 800000,
          Unit: 'visitors',
          Date: '2024-06-01'
        }
      ],
      'COS Performance': [
        {
          Date: '2024-06-01',
          'COS Score': 88.5,
          'Age Satisfaction': 85.2,
          'Surface Cleanliness': 91.3,
          'Washroom Hygiene': 87.8,
          'Waste Management': 89.1,
          'Policies & Furnishings': 86.4,
          'Presentation & Order': 90.7
        }
      ],
      'Area Performance': [
        {
          Area: 'Fashion Wing',
          'COS Score': 91.2,
          'Surface Rating': 93.1,
          'Washroom Rating': 89.5,
          'Waste Mgmt Rating': 91.8,
          Status: 'Excellent',
          Date: '2024-06-01'
        }
      ],
      'Guest Experience': [
        {
          Date: '2024-06-01',
          'NPS Score': 72.5,
          'Parking Efficiency (%)': 82.3,
          'Repeat App Users (%)': 68.9,
          'Gift Card Sales ($)': 185000,
          'Complaints Resolved (%)': 95.7,
          'Customer Service Rating': 8.4,
          'Cleanliness Rating': 8.7,
          'Ambience Rating': 8.2,
          'Safety Rating': 8.9,
          'Accessibility Rating': 8.1,
          'Technology Rating': 7.8
        }
      ],
      'Operations': [
        {
          Date: '2024-06-01',
          'Energy Index': 102.3,
          'Response Time (hrs)': 2.1,
          'SLA Compliance (%)': 94.5,
          'Safety Incidents': 2,
          'Energy Usage (kWh)': 1250000,
          'BTU/sqft': 85.7,
          'HVAC Work Orders': 23,
          'Plumbing Work Orders': 8,
          'Electrical Work Orders': 12,
          'Cleaning Work Orders': 45,
          'Security Work Orders': 6,
          'General Work Orders': 31
        }
      ],
      'Traffic & Parking': [
        {
          Date: '2024-06-01',
          'Mall Visitors': 847000,
          'Monthly Parking Visitors': 284000,
          'Weekly Parking Visitors': 68500,
          'Grocery Market Share (%)': 42.1,
          'Traffic (%)': 76.8,
          'Monthly Parking Revenue ($)': 125000,
          'Weekly Parking Revenue ($)': 28500,
          'Monthly Peak Occupancy (%)': 87.3,
          'Weekly Peak Occupancy (%)': 82.1
        }
      ],
      'Tenant Performance': [
        {
          Tenant: 'Apple Store',
          Category: 'Electronics',
          'GLA (SF)': 2500,
          'Total Sales ($)': 980000,
          'Sales/SF ($)': 392.00,
          'Performance Status': 'Excellent',
          'YoY Index': 108.5,
          Date: '2024-06-01'
        }
      ],
      'Occupancy & Leasing': [
        {
          Date: '2024-06-01',
          'RM Occupancy (%)': 94.2,
          'Mall Occupancy (%)': 96.8,
          'HSR Occupancy (%)': 89.5,
          'RM Leased (%)': 97.8,
          'Mall Leased (%)': 98.9,
          'HSR Leased (%)': 92.3,
          'RM Vacant (%)': 2.2,
          'Mall Vacant (%)': 1.1,
          'HSR Vacant (%)': 7.7,
          Category: 'Fashion',
          Units: 145,
          'Open (%)': 94.5,
          'Lease (%)': 98.2
        }
      ],
      'Sales Performance': [
        {
          Date: '2024-06-01',
          'CRU Forecasted Sales/SF ($)': 1247.50,
          'Anchors Forecasted Sales/SF ($)': 892.30,
          'Monthly CRU Sales ($)': 8450000,
          'Monthly Anchors Sales ($)': 15200000,
          'YoY Growth CRU (%)': 12.4,
          'YoY Growth Anchors (%)': 8.7,
          Category: 'Fashion',
          'Sales/SF ($)': 425.30
        }
      ],
      'Parking Metrics': [
        {
          Date: '2024-06-01',
          Hour: 14,
          'Hourly Traffic': 2340,
          'Daily Total': 28500,
          'Peak Occupancy (%)': 87.3,
          'Efficiency (%)': 82.1,
          'Revenue ($)': 4250,
          'Average Duration (hrs)': 2.3
        }
      ],
      'Market Share Trend': [
        {
          Date: '2024-06-01',
          'RM Market Share (%)': 42.1,
          'Traffic Sources': 'Digital',
          'Direct (%)': 35.2,
          'Referral (%)': 28.9,
          'Organic (%)': 24.7,
          'Social (%)': 11.2
        }
      ],
      'Complaints Analysis': [
        {
          Date: '2024-06-01',
          'Total Complaints': 23,
          Service: 8,
          Parking: 6,
          Cleanliness: 5,
          Other: 4,
          'Resolution Time (days)': 2.3,
          'Satisfaction Score': 8.4,
          'Resolved (%)': 95.7
        }
      ]
    };

    return this.exportToExcel(sampleData);
  }
}
