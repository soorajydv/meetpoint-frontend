import { addMinutes, getDayOfWeek, setHM } from './time'
import type { WeeklyAvailability } from './types'

export function generateSlotsForDay(date: Date, availability: WeeklyAvailability) {
  const day = getDayOfWeek(date)
  const ranges = availability.days[day] || []
  const slots: { start: Date; end: Date }[] = []
  for (const r of ranges) {
    let cursor = setHM(date, r.start)
    const end = setHM(date, r.end)
    while (addMinutes(cursor, availability.slotDurationMinutes) <= end) {
      const slotEnd = addMinutes(cursor, availability.slotDurationMinutes)
      slots.push({ start: cursor, end: slotEnd })
      cursor = slotEnd
    }
  }
  return slots
}
