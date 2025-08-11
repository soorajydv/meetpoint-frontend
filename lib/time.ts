import type { DayOfWeek } from './types'

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export function parseHM(hm: string) {
  const [h, m] = hm.split(':').map(Number); return { h, m }
}
export function addMinutes(date: Date, mins: number) {
  const d = new Date(date); d.setMinutes(d.getMinutes() + mins); return d
}
export function fmtHM(date: Date) {
  const h = String(date.getHours()).padStart(2, '0'); const m = String(date.getMinutes()).padStart(2, '0'); return `${h}:${m}`
}
export function setHM(base: Date, hm: string) {
  const d = new Date(base); const { h, m } = parseHM(hm); d.setHours(h, m, 0, 0); return d
}
export function getDayOfWeek(date: Date): DayOfWeek {
  return date.getDay() as DayOfWeek
}
export function humanDateTime(dt: Date) {
  return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
}
export function dateToYMD(date: Date) {
  const y = date.getFullYear(); const m = String(date.getMonth() + 1).padStart(2, '0'); const d = String(date.getDate()).padStart(2, '0'); return `${y}-${m}-${d}`
}
export function ymdToDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number); return new Date(y, m - 1, d)
}
