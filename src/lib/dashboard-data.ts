/**
 * Dashboard Data Storage Management
 * Handles persistence and retrieval of imported dashboard data
 */

import { 
  ImportedKPIData, 
  ImportedTenantData, 
  ImportedTrafficData, 
  ImportedFinanceData, 
  ImportedOperationsData, 
  ImportedGuestData, 
  ImportedCleaningData 
} from './data-import';

export interface DashboardDataStore {
  kpis: ImportedKPIData[];
  tenants: ImportedTenantData[];
  traffic: ImportedTrafficData[];
  finance: ImportedFinanceData[];
  operations: ImportedOperationsData[];
  guest: ImportedGuestData[];
  cleaning: ImportedCleaningData[];
  lastUpdated: Record<string, string>;
}

const STORAGE_KEY = 'dashboard_imported_data';

/**
 * Get all dashboard data from storage
 */
export function getDashboardData(): DashboardDataStore {
  const defaultData: DashboardDataStore = {
    kpis: [],
    tenants: [],
    traffic: [],
    finance: [],
    operations: [],
    guest: [],
    cleaning: [],
    lastUpdated: {}
  };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;
    
    const parsed = JSON.parse(stored);
    return { ...defaultData, ...parsed };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return defaultData;
  }
}

/**
 * Save data for a specific category
 */
export function saveDashboardData<T>(
  category: keyof Omit<DashboardDataStore, 'lastUpdated'>, 
  data: T[]
): void {
  try {
    const current = getDashboardData();
    current[category] = data as any;
    current.lastUpdated[category] = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (error) {
    console.error(`Error saving ${category} data:`, error);
  }
}

/**
 * Clear all imported data
 */
export function clearDashboardData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing dashboard data:', error);
  }
}

/**
 * Check if data exists for a category
 */
export function hasImportedData(category: keyof Omit<DashboardDataStore, 'lastUpdated'>): boolean {
  const data = getDashboardData();
  return data[category].length > 0;
}

/**
 * Get last updated timestamp for a category
 */
export function getLastUpdated(category: keyof Omit<DashboardDataStore, 'lastUpdated'>): string | null {
  const data = getDashboardData();
  return data.lastUpdated[category] || null;
}