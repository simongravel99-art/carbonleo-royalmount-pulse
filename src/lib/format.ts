/**
 * Carbonleo Dashboard - Formatting Utilities
 * Consistent number, currency, and percentage formatting
 */

export function formatNumberShort(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`;
  }
  return value.toString();
}

export function formatCurrency(value: number, abbreviated = true): string {
  if (abbreviated) {
    if (Math.abs(value) >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    if (Math.abs(value) >= 1_000) {
      return `$${(value / 1_000).toFixed(1)}k`;
    }
  }
  
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPct(value: number): string {
  // Handle both 0-1 range and 0-100 range
  const percentage = value > 1 ? value : value * 100;
  return `${percentage.toFixed(1)}%`;
}

export function formatSqftPrice(value: number): string {
  return `${formatCurrency(value, false)}/pi²`;
}

export function formatChange(current: number, previous: number): {
  value: number;
  formatted: string;
  isPositive: boolean;
} {
  const change = ((current - previous) / previous) * 100;
  return {
    value: change,
    formatted: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`,
    isPositive: change > 0,
  };
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}