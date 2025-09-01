/**
 * Data Import Utilities for Dashboard Excel Templates
 * Handles processing of Excel/CSV data for dashboard updates
 */

export interface ImportedKPIData {
  metric: string;
  value: number;
  trend?: number;
  target?: number;
  format: 'number' | 'currency' | 'percentage';
  category: 'overview' | 'finance' | 'sales' | 'traffic' | 'operations' | 'guest' | 'cleaning';
}

export interface ImportedTenantData {
  tenantName: string;
  category: string;
  gla: number;
  sales: number;
  salesPerSF: number;
  yoyIndex: number;
  grocCurrent?: number;
  grocPrevious?: number;
}

export interface ImportedTrafficData {
  date: string;
  totalVisitors: number;
  marketShare: number;
  fridayVisitors?: number;
  saturdayVisitors?: number;
  sundayVisitors?: number;
}

export interface ImportedFinanceData {
  month: string;
  baseRent: number;
  percentRent: number;
  noi: number;
  operatingRatio: number;
  receivables30: number;
  receivables60: number;
  receivables90: number;
  receivables90Plus: number;
}

export interface ImportedOperationsData {
  month: string;
  energyIndex: number;
  hydroConsumption: number;
  responseTime: number;
  slaCompliance: number;
  safetyIncidents: number;
  workOrdersCompleted: number;
}

export interface ImportedGuestData {
  month: string;
  npsScore: number;
  parkingAppUsage: number;
  giftCardSales: number;
  complaintsTotal: number;
  complaintsResolved: number;
  serviceScore: number;
  cleanlinessScore: number;
  ambienceScore: number;
}

export interface ImportedCleaningData {
  month: string;
  cqsScore: number;
  surfaceCleanliness: number;
  washroomHygiene: number;
  floorCleanliness: number;
  generalAppearance: number;
  foodCourtScore: number;
  fashionWingScore: number;
  commonAreasScore: number;
}

/**
 * Parse CSV data into typed objects
 */
export function parseCSVData<T>(csvText: string, parser: (row: any) => T): T[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    return parser(row);
  });
}

/**
 * Validate imported data
 */
export function validateImportedData<T>(data: T[], requiredFields: (keyof T)[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  data.forEach((item, index) => {
    requiredFields.forEach(field => {
      if (item[field] === undefined || item[field] === null || item[field] === '') {
        errors.push(`Row ${index + 1}: Missing required field '${String(field)}'`);
      }
    });
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Convert Excel/CSV data to dashboard format
 */
export class DataImportService {
  static parseKPIData(csvText: string): ImportedKPIData[] {
    return parseCSVData(csvText, (row) => ({
      metric: row.metric,
      value: parseFloat(row.value) || 0,
      trend: row.trend ? parseFloat(row.trend) : undefined,
      target: row.target ? parseFloat(row.target) : undefined,
      format: row.format as 'number' | 'currency' | 'percentage',
      category: row.category as ImportedKPIData['category']
    }));
  }

  static parseTenantData(csvText: string): ImportedTenantData[] {
    return parseCSVData(csvText, (row) => ({
      tenantName: row.tenantName,
      category: row.category,
      gla: parseFloat(row.gla) || 0,
      sales: parseFloat(row.sales) || 0,
      salesPerSF: parseFloat(row.salesPerSF) || 0,
      yoyIndex: parseFloat(row.yoyIndex) || 0,
      grocCurrent: row.grocCurrent ? parseFloat(row.grocCurrent) : undefined,
      grocPrevious: row.grocPrevious ? parseFloat(row.grocPrevious) : undefined
    }));
  }

  static parseTrafficData(csvText: string): ImportedTrafficData[] {
    return parseCSVData(csvText, (row) => ({
      date: row.date,
      totalVisitors: parseFloat(row.totalVisitors) || 0,
      marketShare: parseFloat(row.marketShare) || 0,
      fridayVisitors: row.fridayVisitors ? parseFloat(row.fridayVisitors) : undefined,
      saturdayVisitors: row.saturdayVisitors ? parseFloat(row.saturdayVisitors) : undefined,
      sundayVisitors: row.sundayVisitors ? parseFloat(row.sundayVisitors) : undefined
    }));
  }

  static parseFinanceData(csvText: string): ImportedFinanceData[] {
    return parseCSVData(csvText, (row) => ({
      month: row.month,
      baseRent: parseFloat(row.baseRent) || 0,
      percentRent: parseFloat(row.percentRent) || 0,
      noi: parseFloat(row.noi) || 0,
      operatingRatio: parseFloat(row.operatingRatio) || 0,
      receivables30: parseFloat(row.receivables30) || 0,
      receivables60: parseFloat(row.receivables60) || 0,
      receivables90: parseFloat(row.receivables90) || 0,
      receivables90Plus: parseFloat(row.receivables90Plus) || 0
    }));
  }

  static parseOperationsData(csvText: string): ImportedOperationsData[] {
    return parseCSVData(csvText, (row) => ({
      month: row.month,
      energyIndex: parseFloat(row.energyIndex) || 0,
      hydroConsumption: parseFloat(row.hydroConsumption) || 0,
      responseTime: parseFloat(row.responseTime) || 0,
      slaCompliance: parseFloat(row.slaCompliance) || 0,
      safetyIncidents: parseFloat(row.safetyIncidents) || 0,
      workOrdersCompleted: parseFloat(row.workOrdersCompleted) || 0
    }));
  }

  static parseGuestData(csvText: string): ImportedGuestData[] {
    return parseCSVData(csvText, (row) => ({
      month: row.month,
      npsScore: parseFloat(row.npsScore) || 0,
      parkingAppUsage: parseFloat(row.parkingAppUsage) || 0,
      giftCardSales: parseFloat(row.giftCardSales) || 0,
      complaintsTotal: parseFloat(row.complaintsTotal) || 0,
      complaintsResolved: parseFloat(row.complaintsResolved) || 0,
      serviceScore: parseFloat(row.serviceScore) || 0,
      cleanlinessScore: parseFloat(row.cleanlinessScore) || 0,
      ambienceScore: parseFloat(row.ambienceScore) || 0
    }));
  }

  static parseCleaningData(csvText: string): ImportedCleaningData[] {
    return parseCSVData(csvText, (row) => ({
      month: row.month,
      cqsScore: parseFloat(row.cqsScore) || 0,
      surfaceCleanliness: parseFloat(row.surfaceCleanliness) || 0,
      washroomHygiene: parseFloat(row.washroomHygiene) || 0,
      floorCleanliness: parseFloat(row.floorCleanliness) || 0,
      generalAppearance: parseFloat(row.generalAppearance) || 0,
      foodCourtScore: parseFloat(row.foodCourtScore) || 0,
      fashionWingScore: parseFloat(row.fashionWingScore) || 0,
      commonAreasScore: parseFloat(row.commonAreasScore) || 0
    }));
  }
}