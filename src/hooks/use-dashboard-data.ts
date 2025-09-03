/**
 * React hooks for dashboard data management
 */

import { useState, useEffect } from 'react';
import { getDashboardData, hasImportedData, DashboardDataStore } from '@/lib/dashboard-data';
import { ImportedKPIData, ImportedTenantData, ImportedTrafficData, ImportedFinanceData } from '@/lib/data-import';

/**
 * Hook to get KPI data with fallback to mock data
 */
export function useKPIData() {
  const [data, setData] = useState<ImportedKPIData[]>([]);
  const [isImported, setIsImported] = useState(false);

  useEffect(() => {
    const dashboardData = getDashboardData();
    const hasData = hasImportedData('kpis');
    
    setIsImported(hasData);
    if (hasData) {
      setData(dashboardData.kpis);
    }
  }, []);

  return { data, isImported };
}

/**
 * Hook to get tenant data with fallback to mock data
 */
export function useTenantData() {
  const [data, setData] = useState<ImportedTenantData[]>([]);
  const [isImported, setIsImported] = useState(false);

  useEffect(() => {
    const dashboardData = getDashboardData();
    const hasData = hasImportedData('tenants');
    
    setIsImported(hasData);
    if (hasData) {
      setData(dashboardData.tenants);
    }
  }, []);

  return { data, isImported };
}

/**
 * Hook to get traffic data with fallback to mock data
 */
export function useTrafficData() {
  const [data, setData] = useState<ImportedTrafficData[]>([]);
  const [isImported, setIsImported] = useState(false);

  useEffect(() => {
    const dashboardData = getDashboardData();
    const hasData = hasImportedData('traffic');
    
    setIsImported(hasData);
    if (hasData) {
      setData(dashboardData.traffic);
    }
  }, []);

  return { data, isImported };
}

/**
 * Hook to get finance data with fallback to mock data
 */
export function useFinanceData() {
  const [data, setData] = useState<ImportedFinanceData[]>([]);
  const [isImported, setIsImported] = useState(false);

  useEffect(() => {
    const dashboardData = getDashboardData();
    const hasData = hasImportedData('finance');
    
    setIsImported(hasData);
    if (hasData) {
      setData(dashboardData.finance);
    }
  }, []);

  return { data, isImported };
}

/**
 * Hook to refresh all dashboard data
 */
export function useDashboardRefresh() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = () => {
    setRefreshTrigger(prev => prev + 1);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('dashboardDataUpdated'));
  };

  return { refresh, refreshTrigger };
}