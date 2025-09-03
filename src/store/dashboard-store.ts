/**
 * Zustand Store for Dashboard Data
 * Single source of truth for all imported Excel data
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardData, ImportMeta, ValidationResult } from '@/types/dashboard-data';

interface DashboardStore {
  // Data state
  data: DashboardData;
  meta: ImportMeta | null;
  lastFile: File | null;
  
  // UI state
  isLoading: boolean;
  validationResult: ValidationResult | null;
  
  // Actions
  setData: (data: DashboardData, meta: ImportMeta) => void;
  setLastFile: (file: File) => void;
  setLoading: (loading: boolean) => void;
  setValidationResult: (result: ValidationResult) => void;
  clearData: () => void;
  hasData: (sheetName: keyof DashboardData) => boolean;
  getSheetData: <T extends keyof DashboardData>(sheetName: T) => DashboardData[T];
}

const initialData: DashboardData = {
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

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      // Initial state
      data: initialData,
      meta: null,
      lastFile: null,
      isLoading: false,
      validationResult: null,

      // Actions
      setData: (data: DashboardData, meta: ImportMeta) => {
        set({ 
          data, 
          meta,
          validationResult: { isValid: true, errors: [], warnings: [] }
        });
      },

      setLastFile: (file: File) => {
        set({ lastFile: file });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setValidationResult: (result: ValidationResult) => {
        set({ validationResult: result });
      },

      clearData: () => {
        set({ 
          data: initialData, 
          meta: null, 
          lastFile: null,
          validationResult: null
        });
      },

      hasData: (sheetName: keyof DashboardData) => {
        const data = get().data[sheetName];
        return Array.isArray(data) && data.length > 0;
      },

      getSheetData: <T extends keyof DashboardData>(sheetName: T): DashboardData[T] => {
        return get().data[sheetName];
      }
    }),
    {
      name: 'royal-mount-dashboard-data',
      // Don't persist lastFile (File objects can't be serialized)
      partialize: (state) => ({
        data: state.data,
        meta: state.meta,
        validationResult: state.validationResult
      })
    }
  )
);

// Selectors for dashboard components
export const selectOverviewKPIs = () => useDashboardStore(state => state.data['Overview & KPIs']);
export const selectCOSPerformance = () => useDashboardStore(state => state.data['COS Performance']);
export const selectAreaPerformance = () => useDashboardStore(state => state.data['Area Performance']);
export const selectGuestExperience = () => useDashboardStore(state => state.data['Guest Experience']);
export const selectOperations = () => useDashboardStore(state => state.data['Operations']);
export const selectTrafficParking = () => useDashboardStore(state => state.data['Traffic & Parking']);
export const selectTenantPerformance = () => useDashboardStore(state => state.data['Tenant Performance']);
export const selectOccupancyLeasing = () => useDashboardStore(state => state.data['Occupancy & Leasing']);
export const selectSalesPerformance = () => useDashboardStore(state => state.data['Sales Performance']);
export const selectParkingMetrics = () => useDashboardStore(state => state.data['Parking Metrics']);
export const selectMarketShareTrend = () => useDashboardStore(state => state.data['Market Share Trend']);
export const selectComplaintsAnalysis = () => useDashboardStore(state => state.data['Complaints Analysis']);

// Utility selectors
export const selectHasAnyData = () => useDashboardStore(state => 
  Object.values(state.data).some(sheet => Array.isArray(sheet) && sheet.length > 0)
);

export const selectImportMeta = () => useDashboardStore(state => state.meta);
export const selectValidationResult = () => useDashboardStore(state => state.validationResult);
export const selectIsLoading = () => useDashboardStore(state => state.isLoading);