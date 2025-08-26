/**
 * Traffic utilities for weekly aggregations and day-of-week calculations
 */

import { formatNumberShort, formatPct } from "./format"

export interface TrafficData {
  date: string
  totalVisitors: number
  marketShareTrafficPct: number
}

export interface WeeklyMetrics {
  weeklyVisitors: number
  weeklyMarketShare: number
  fridayVisitors: number
  fridayMarketShare: number
  saturdayVisitors: number
  saturdayMarketShare: number
  sundayVisitors: number
  sundayMarketShare: number
  hasData: {
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
}

export function getDOW(date: Date): number {
  return date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

export function getWeekBoundaries(dateRange: { from: Date; to: Date }): { start: Date; end: Date } {
  const { from, to } = dateRange
  const diffDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays <= 7) {
    // Use the exact range if it's a week or less
    return { start: from, end: to }
  }
  
  // Find the last complete week (Monday to Sunday) in the range
  const endWeek = new Date(to)
  const daysToSunday = endWeek.getDay() === 0 ? 0 : 7 - endWeek.getDay()
  endWeek.setDate(endWeek.getDate() + daysToSunday)
  
  const startWeek = new Date(endWeek)
  startWeek.setDate(startWeek.getDate() - 6) // Monday of that week
  
  return { start: startWeek, end: endWeek }
}

export function calculateWeeklyMetrics(
  data: TrafficData[], 
  dateRange: { from: Date; to: Date }
): WeeklyMetrics {
  const { start, end } = getWeekBoundaries(dateRange)
  
  const weekData = data.filter(row => {
    const rowDate = new Date(row.date)
    return rowDate >= start && rowDate <= end
  })
  
  const weeklyVisitors = weekData.reduce((sum, row) => sum + row.totalVisitors, 0)
  const weeklyMarketShare = weekData.length > 0 
    ? weekData.reduce((sum, row) => sum + row.marketShareTrafficPct, 0) / weekData.length
    : 0
  
  // Find specific days
  const friday = weekData.find(row => getDOW(new Date(row.date)) === 5)
  const saturday = weekData.find(row => getDOW(new Date(row.date)) === 6)
  const sunday = weekData.find(row => getDOW(new Date(row.date)) === 0)
  
  return {
    weeklyVisitors,
    weeklyMarketShare,
    fridayVisitors: friday?.totalVisitors || 0,
    fridayMarketShare: friday?.marketShareTrafficPct || 0,
    saturdayVisitors: saturday?.totalVisitors || 0,
    saturdayMarketShare: saturday?.marketShareTrafficPct || 0,
    sundayVisitors: sunday?.totalVisitors || 0,
    sundayMarketShare: sunday?.marketShareTrafficPct || 0,
    hasData: {
      friday: !!friday,
      saturday: !!saturday,
      sunday: !!sunday
    }
  }
}

export function formatBubbleValue(visitors: number, marketShare: number, hasData: boolean): string {
  if (!hasData) return "— (—)"
  return `${formatNumberShort(visitors)} (${formatPct(marketShare / 100)})`
}