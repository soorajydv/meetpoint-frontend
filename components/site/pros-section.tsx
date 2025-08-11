import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { Appointment, Client, Professional } from '@/lib/types'
import { humanDateTime } from '@/lib/time'
import { MessageSquare, Mic, Search, Star, Video, ChevronRight } from 'lucide-react'

export default function ProsSection({
  loadingPros, filteredPros, appointments, currentClient, openBooking, query, setQuery,
}: {
  loadingPros: boolean
  filteredPros: Professional[]
  appointments: Appointment[]
  currentClient: Client | null
  openBooking: (pro: Professional) => void
  query: string
  setQuery: (q: string) => void
}) {
  return (
    <section id="pros" className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Popular professionals</h2>
          <p className="text-muted-foreground">Explore profiles and real-time availability</p>
        </div>
        <div className="relative hidden md:block">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or specialty..."
            className="pl-9 w-[300px] transition-all"
            aria-label="Search professionals"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="md:hidden mb-3 relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or specialty..."
          className="pl-9 transition-all"
          aria-label="Search professionals"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loadingPros &&
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3 mt-2" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full mt-3" />
                <Skeleton className="h-8 w-1/2 mt-3" />
              </CardContent>
            </Card>
          ))
        }
        {!loadingPros && filteredPros.length === 0 && (
          <div className="col-span-full text-sm text-muted-foreground">No professionals found.</div>
        )}
        {!loadingPros && filteredPros.map((pro) => {
          const nextSlots = nextThreeSlots(pro, appointments)
          return (
            <Card key={pro.id} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={pro.avatar || '/placeholder.svg?height=120&width=120&query=professional%20portrait'}
                    alt={`${pro.name} avatar`}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-black/5"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{pro.name}</div>
                    <div className="text-xs text-muted-foreground">{pro.specialty}</div>
                    {pro.rating && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="font-medium">{pro.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({pro.reviews})</span>
                      </div>
                    )}
                  </div>
                  <Badge variant="outline">{pro.feeCoins} coins</Badge>
                </div>
                {pro.bio && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{pro.bio}</p>}
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  {pro.methods.includes('chat') && <MessageSquare className="h-4 w-4" />}
                  {pro.methods.includes('audio') && <Mic className="h-4 w-4" />}
                  {pro.methods.includes('video') && <Video className="h-4 w-4" />}
                </div>
                <div className="mt-3">
                  <div className="text-xs text-muted-foreground mb-1">Upcoming slots (next 7 days)</div>
                  <div className="flex flex-wrap gap-2">
                    {nextSlots.length === 0 ? (
                      <span className="text-xs text-muted-foreground">No slots available</span>
                    ) : nextSlots.map(s => (
                      <Badge key={s.toISOString()} variant="secondary">{humanDateTime(s)}</Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                    onClick={() => openBooking(pro)}
                    disabled={!currentClient}
                  >
                    Book {pro.specialty} <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  {!currentClient && (
                    <div className="text-xs text-muted-foreground text-center mt-1">
                      Sign up as Client to book
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

import { generateSlotsForDay } from '@/lib/availability'
function nextThreeSlots(pro: Professional, appts: Appointment[]) {
  const now = new Date()
  const next: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(now); d.setDate(now.getDate() + i)
    const base = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    const slots = generateSlotsForDay(base, pro.availability)
    for (const s of slots) {
      if (s.start <= now) continue
      const conflict = appts.some(a => a.proId === pro.id && a.status === 'scheduled' && new Date(a.startISO).getTime() === s.start.getTime())
      if (!conflict) { next.push(s.start); if (next.length >= 3) return next }
    }
  }
  return next
}
