/**
 * Carbonleo Dashboard - Target Configuration
 * Business targets for KPI visualization
 */

export interface TargetConfig {
  nps_target: number;
  peak_parking_target_pct: number;
  energy_index_target_pct: number;
  sales_per_sqft_target: number;
  occupancy_target_pct: number;
  noi_growth_target_pct: number;
}

export const DEFAULT_TARGETS: TargetConfig = {
  nps_target: 60,
  peak_parking_target_pct: 80,
  energy_index_target_pct: -10, // -10% YoY improvement
  sales_per_sqft_target: 1200,
  occupancy_target_pct: 95,
  noi_growth_target_pct: 5,
};

// Local storage key for persisting targets
const TARGETS_STORAGE_KEY = 'carbonleo_dashboard_targets';

export function getTargets(): TargetConfig {
  try {
    const stored = localStorage.getItem(TARGETS_STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_TARGETS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn('Failed to load targets from storage:', error);
  }
  return DEFAULT_TARGETS;
}

export function saveTargets(targets: Partial<TargetConfig>): void {
  try {
    const current = getTargets();
    const updated = { ...current, ...targets };
    localStorage.setItem(TARGETS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save targets to storage:', error);
  }
}

export function isAboveTarget(value: number, target: number, higherIsBetter = true): boolean {
  return higherIsBetter ? value >= target : value <= target;
}

export function getTargetColor(value: number, target: number, higherIsBetter = true): string {
  return isAboveTarget(value, target, higherIsBetter) ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
}