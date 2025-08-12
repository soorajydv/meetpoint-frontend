'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Appointment, Client, CommMethod, Professional } from '@/lib/types'
import { cn } from '@/lib/utils'
import { fmtHM, humanDateTime, setHM, ymdToDate, dateToYMD } from '@/lib/time'
import { useEffect, useMemo, useState } from 'react'
import { generateSlotsForDay } from '@/lib/availability'

export default function BookDialog({
  open, onOpenChange, pro, client, appointments, onInsufficientFunds, onCreate, onBooked,
}: {
  open: boolean; onOpenChange: (v: boolean) => void; pro: Professional; client: Client; appointments: Appointment[];
  onInsufficientFunds: () => void; onCreate: (client: Client, pro: Professional, start: Date, duration: number, method: CommMethod) => Appointment; onBooked: (appt: Appointment) => void
}) {
  const [dateYMD, setDateYMD] = useState(dateToYMD(new Date()))
  const [method, setMethod] = useState<CommMethod>(pro.methods[0] ?? 'chat')
  const [selectedHM, setSelectedHM] = useState<string>('')

  const date = useMemo(() => ymdToDate(dateYMD), [dateYMD])
  const slots = useMemo(() => {
    const raw = generateSlotsForDay(date, pro.availability)
    const now = new Date()
    return raw
      .filter(s => s.start > now)
      .filter(s => !appointments.some(a => a.proId === pro.id && a.status === 'scheduled' && new Date(a.startISO).getTime() === s.start.getTime()))
  }, [date, pro, appointments])

  useEffect(() => setSelectedHM(''), [dateYMD])

  const fee = pro.feeCoins
  const canAfford = client.coins >= fee

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] p-4">
        <DialogHeader>
          <DialogTitle>Book {pro.name}</DialogTitle>
          <DialogDescription>{pro.specialty} • {fee} coins • Slot {pro.availability.slotDurationMinutes} min</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={dateYMD} onChange={(e) => setDateYMD(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="method">Method</Label>
              <Select value={method} onValueChange={(v: CommMethod) => setMethod(v as CommMethod)}>
                <SelectTrigger id="method"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {pro.methods.map(m => (<SelectItem key={m} value={m}><span className="capitalize">{m}</span></SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Available times</Label>
            <div className="mt-2 flex flex-wrap gap-2 max-h-[180px] overflow-auto pr-1">
              {slots.length === 0 && <div className="text-sm text-muted-foreground">No slots available for this date.</div>}
              {slots.map(s => {
                const hm = fmtHM(s.start)
                const active = selectedHM === hm
                return (
                  <Button
                    key={hm}
                    type="button"
                    size="sm"
                    variant={active ? 'default' : 'outline'}
                    className={cn('transition-colors', active && 'bg-teal-600 hover:bg-teal-700 text-white')}
                    onClick={() => setSelectedHM(hm)}
                  >
                    {hm}
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="rounded-md border p-3 flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium">Total</div>
              <div className="text-muted-foreground">{fee} coins</div>
            </div>
            <div className="text-right text-sm">
              <div>Wallet: {client.coins} coins</div>
              {!canAfford && <div className="text-red-600">Insufficient balance</div>}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          {!canAfford ? (
            <Button className="bg-teal-600 hover:bg-teal-700 text-white transition-colors" onClick={() => { onInsufficientFunds() }}>Buy coins</Button>
          ) : (
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white transition-colors"
              disabled={!selectedHM}
              onClick={() => {
                if (!selectedHM) return
                const start = setHM(ymdToDate(dateYMD), selectedHM)
                const appt = onCreate(client, pro, start, pro.availability.slotDurationMinutes, method)
                onBooked(appt)
              }}
            >
              Confirm booking
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
