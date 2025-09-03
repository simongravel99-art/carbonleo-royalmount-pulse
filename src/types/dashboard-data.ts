/**
 * Royal Mount Dashboard Data Types
 * Exact schema for the 12 required Excel sheets
 */

// Overview & KPIs Sheet
export interface OverviewKPI {
  Metric: string;
  'Current Value': number;
  'Previous Value': number;
  'YoY Change (%)': number;
  Target: number;
  Date: string;
}

// COS Performance Sheet
export interface COSPerformance {
  Date: string;
  'COS Score': number;
  'Age Satisfaction': number;
  'Surface Cleanliness': number;
  'Washroom Hygiene': number;
  'Waste Management': number;
  'Policies & Furnishings': number;
  'Presentation & Order': number;
}

// Area Performance Sheet
export interface AreaPerformance {
  Area: string;
  'COS Score': number;
  'Surface Rating': number;
  'Washroom Rating': number;
  'Waste Mgmt Rating': number;
  Status: string;
  Date: string;
}

// Guest Experience Sheet
export interface GuestExperience {
  Date: string;
  'NPS Score': number;
  'Parking Efficiency (%)': number;
  'Repeat App Users (%)': number;
  'Gift Card Sales ($)': number;
  'Complaints Resolved (%)': number;
  'Customer Service Rating': number;
  'Cleanliness Rating': number;
  'Ambience Rating': number;
  'Safety Rating': number;
  'Accessibility Rating': number;
  'Technology Rating': number;
}

// Operations Sheet
export interface Operations {
  Date: string;
  'Energy Index': number;
  'Response Time (hrs)': number;
  'SLA Compliance (%)': number;
  'Safety Incidents': number;
  'Energy Usage (kWh)': number;
  'BTU/sqft': number;
  'HVAC Work Orders': number;
  'Plumbing Work Orders': number;
  'Electrical Work Orders': number;
  'Cleaning Work Orders': number;
  'Security Work Orders': number;
  'General Work Orders': number;
}

// Traffic & Parking Sheet
export interface TrafficParking {
  Date: string;
  'Mall Visitors': number;
  'Monthly Parking Visitors': number;
  'Weekly Parking Visitors': number;
  'Grocery Market Share (%)': number;
  'Traffic (%)': number;
  'Monthly Parking Revenue ($)': number;
  'Weekly Parking Revenue ($)': number;
  'Monthly Peak Occupancy (%)': number;
  'Weekly Peak Occupancy (%)': number;
}

// Tenant Performance Sheet
export interface TenantPerformance {
  Tenant: string;
  Category: string;
  'GLA (SF)': number;
  'Total Sales ($)': number;
  'Sales/SF ($)': number;
  'Performance Status': string;
  'YoY Index': number;
  Date: string;
}

// Occupancy & Leasing Sheet
export interface OccupancyLeasing {
  Date: string;
  'RM Occupancy (%)': number;
  'Mall Occupancy (%)': number;
  'HSR Occupancy (%)': number;
  'RM Leased (%)': number;
  'Mall Leased (%)': number;
  'HSR Leased (%)': number;
  'RM Vacant (%)': number;
  'Mall Vacant (%)': number;
  'HSR Vacant (%)': number;
  Category: string;
  Units: number;
  'Open (%)': number;
  'Lease (%)': number;
}

// Sales Performance Sheet
export interface SalesPerformance {
  Date: string;
  'CRU Forecasted Sales/SF ($)': number;
  'Anchors Forecasted Sales/SF ($)': number;
  'Monthly CRU Sales ($)': number;
  'Monthly Anchors Sales ($)': number;
  'YoY Growth CRU (%)': number;
  'YoY Growth Anchors (%)': number;
  Category: string;
  'Sales/SF ($)': number;
}

// Parking Metrics Sheet
export interface ParkingMetrics {
  Date: string;
  Hour: number;
  'Hourly Traffic': number;
  'Daily Total': number;
  'Peak Occupancy (%)': number;
  'Efficiency (%)': number;
  'Revenue ($)': number;
  'Average Duration (hrs)': number;
}

// Market Share Trend Sheet
export interface MarketShareTrend {
  Date: string;
  'RM Market Share (%)': number;
  'Traffic Sources': string;
  'Direct (%)': number;
  'Referral (%)': number;
  'Organic (%)': number;
  'Social (%)': number;
}

// Complaints Analysis Sheet
export interface ComplaintsAnalysis {
  Date: string;
  'Total Complaints': number;
  Service: number;
  Parking: number;
  Cleanliness: number;
  Other: number;
  'Resolution Time (days)': number;
  'Satisfaction Score': number;
  'Resolved (%)': number;
}

// Complete dashboard data structure
export interface DashboardData {
  'Overview & KPIs': OverviewKPI[];
  'COS Performance': COSPerformance[];
  'Area Performance': AreaPerformance[];
  'Guest Experience': GuestExperience[];
  'Operations': Operations[];
  'Traffic & Parking': TrafficParking[];
  'Tenant Performance': TenantPerformance[];
  'Occupancy & Leasing': OccupancyLeasing[];
  'Sales Performance': SalesPerformance[];
  'Parking Metrics': ParkingMetrics[];
  'Market Share Trend': MarketShareTrend[];
  'Complaints Analysis': ComplaintsAnalysis[];
}

// Validation schema - exact column names required
export const REQUIRED_SHEETS = [
  'Overview & KPIs',
  'COS Performance', 
  'Area Performance',
  'Guest Experience',
  'Operations',
  'Traffic & Parking',
  'Tenant Performance',
  'Occupancy & Leasing',
  'Sales Performance',
  'Parking Metrics',
  'Market Share Trend',
  'Complaints Analysis'
] as const;

export const REQUIRED_COLUMNS: Record<keyof DashboardData, string[]> = {
  'Overview & KPIs': ['Metric', 'Current Value', 'Previous Value', 'YoY Change (%)', 'Target', 'Date'],
  'COS Performance': ['Date', 'COS Score', 'Age Satisfaction', 'Surface Cleanliness', 'Washroom Hygiene', 'Waste Management', 'Policies & Furnishings', 'Presentation & Order'],
  'Area Performance': ['Area', 'COS Score', 'Surface Rating', 'Washroom Rating', 'Waste Mgmt Rating', 'Status', 'Date'],
  'Guest Experience': ['Date', 'NPS Score', 'Parking Efficiency (%)', 'Repeat App Users (%)', 'Gift Card Sales ($)', 'Complaints Resolved (%)', 'Customer Service Rating', 'Cleanliness Rating', 'Ambience Rating', 'Safety Rating', 'Accessibility Rating', 'Technology Rating'],
  'Operations': ['Date', 'Energy Index', 'Response Time (hrs)', 'SLA Compliance (%)', 'Safety Incidents', 'Energy Usage (kWh)', 'BTU/sqft', 'HVAC Work Orders', 'Plumbing Work Orders', 'Electrical Work Orders', 'Cleaning Work Orders', 'Security Work Orders', 'General Work Orders'],
  'Traffic & Parking': ['Date', 'Mall Visitors', 'Monthly Parking Visitors', 'Weekly Parking Visitors', 'Grocery Market Share (%)', 'Traffic (%)', 'Monthly Parking Revenue ($)', 'Weekly Parking Revenue ($)', 'Monthly Peak Occupancy (%)', 'Weekly Peak Occupancy (%)'],
  'Tenant Performance': ['Tenant', 'Category', 'GLA (SF)', 'Total Sales ($)', 'Sales/SF ($)', 'Performance Status', 'YoY Index', 'Date'],
  'Occupancy & Leasing': ['Date', 'RM Occupancy (%)', 'Mall Occupancy (%)', 'HSR Occupancy (%)', 'RM Leased (%)', 'Mall Leased (%)', 'HSR Leased (%)', 'RM Vacant (%)', 'Mall Vacant (%)', 'HSR Vacant (%)', 'Category', 'Units', 'Open (%)', 'Lease (%)'],
  'Sales Performance': ['Date', 'CRU Forecasted Sales/SF ($)', 'Anchors Forecasted Sales/SF ($)', 'Monthly CRU Sales ($)', 'Monthly Anchors Sales ($)', 'YoY Growth CRU (%)', 'YoY Growth Anchors (%)', 'Category', 'Sales/SF ($)'],
  'Parking Metrics': ['Date', 'Hour', 'Hourly Traffic', 'Daily Total', 'Peak Occupancy (%)', 'Efficiency (%)', 'Revenue ($)', 'Average Duration (hrs)'],
  'Market Share Trend': ['Date', 'RM Market Share (%)', 'Traffic Sources', 'Direct (%)', 'Referral (%)', 'Organic (%)', 'Social (%)'],
  'Complaints Analysis': ['Date', 'Total Complaints', 'Service', 'Parking', 'Cleanliness', 'Other', 'Resolution Time (days)', 'Satisfaction Score', 'Resolved (%)']
};

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ImportMeta {
  fileName: string;
  importedAt: string;
  sheetsProcessed: string[];
  totalRecords: number;
}