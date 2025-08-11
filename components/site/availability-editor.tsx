'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { DayOfWeek, TimeRange, WeeklyAvailability } from '@/lib/types'

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function AvailabilityEditor({
  value, onChange,
}: { value: WeeklyAvailability; onChange: (v: WeeklyAvailability) => void }) {
  const setSlot = (minutes: number) => onChange({ ...value, slotDurationMinutes: minutes })
  const addRange = (day: DayOfWeek) => {
    const list = value.days[day] || []
    const next: TimeRange = { start: '10:00', end: '12:00' }
    onChange({ ...value, days: { ...value.days, [day]: [...list, next] } })
  }
  const updateRange = (day: DayOfWeek, idx: number, patch: Partial<TimeRange>) => {
    const list = value.days[day] || []
    const next = list.map((r, i) => (i === idx ? { ...r, ...patch } : r))
    onChange({ ...value, days: { ...value.days, [day]: next } })
  }
  const removeRange = (day: DayOfWeek, idx: number) => {
    const list = value.days[day] || []
    const next = list.filter((_, i) => i !== idx)
    onChange({ ...value, days: { ...value.days, [day]: next } })
  }

  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center gap-3 mb-3">
        <Label htmlFor="slot-dur">Slot duration</Label>
        <Select value={String(value.slotDurationMinutes)} onValueChange={(v) => setSlot(Number(v))}>
          <SelectTrigger id="slot-dur" className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[15, 20, 30, 45, 60].map(m => (<SelectItem key={m} value={String(m)}>{m} min</SelectItem>))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {weekdayLabels.map((w, idx) => {
          const day = idx as DayOfWeek
          const ranges = value.days[day] || []
          return (
            <div key={day} className="rounded-md border p-2">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{w}</div>
                <Button size="sm" variant="outline" className="transition-colors" onClick={() => addRange(day)}>Add range</Button>
              </div>
              {ranges.length === 0 && <div className="text-xs text-muted-foreground">Not available</div>}
              <div className="space-y-2">
                {ranges.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                    <div>
                      <Label className="text-xs">Start</Label>
                      <Input type="time" value={r.start} onChange={(e) => updateRange(day, i, { start: e.target.value })} />
                    </div>
                    <div>
                      <Label className="text-xs">End</Label>
                      <Input type="time" value={r.end} onChange={(e) => updateRange(day, i, { end: e.target.value })} />
                    </div>
                    <Button variant="ghost" className="transition-colors" onClick={() => removeRange(day, i)}>Remove</Button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        Weekly schedule repeats every week. Slots are auto-generated within time ranges.
      </div>
    </div>
  )
}
