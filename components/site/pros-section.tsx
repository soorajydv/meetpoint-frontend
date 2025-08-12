'use client'

import { useState, useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import type { Appointment, Client, Professional } from '@/lib/types'
import { humanDateTime } from '@/lib/time'
import { MessageSquare, Mic, Search, Star, Video, ChevronRight, X } from 'lucide-react'
import { generateSlotsForDay } from '@/lib/availability'

export default function ProsSection({
  loadingPros,
  filteredPros,
  appointments,
  currentClient,
  openBooking,
  query,
  setQuery,
}: {
  loadingPros: boolean
  filteredPros: Professional[]
  appointments: Appointment[]
  currentClient: Client | null
  openBooking: (pro: Professional) => void
  query: string
  setQuery: (q: string) => void
}) {
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null)
  const [slots, setSlots] = useState<Date[]>([])
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal on ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPro(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Close modal if clicking outside modal content
  const onBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      setSelectedPro(null)
    }
  }

  // Calculate slots only on client after selectedPro changes
  useEffect(() => {
    if (!selectedPro) {
      setSlots([])
      return
    }

    // Compute available slots for selectedPro
    const nextSlots = nextThreeSlots(selectedPro, appointments)
    setSlots(nextSlots)
  }, [selectedPro, appointments])

  return (
    <section id="pros" className="container mx-auto px-4 py-[6rem]">
      {/* Centered Heading */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Popular professionals</h2>
        <p className="text-muted-foreground">Explore profiles and real-time availability</p>
      </div>

      {/* Search input */}
      <div className="flex justify-center mb-6 relative w-full max-w-md mx-auto md:hidden">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or specialty..."
          className="pl-9 transition-all w-full"
          aria-label="Search professionals"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="relative hidden md:block mb-6 max-w-md mx-auto">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or specialty..."
          className="pl-9 w-full transition-all"
          aria-label="Search professionals"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Professionals Container */}
      <div
        className="flex gap-4 flex-wrap transition-all duration-300 justify-center"
      >
        {/* Loading Skeleton */}
        {loadingPros &&
          Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 max-w-md flex-shrink-0"
            >
              <CardContent className="p-6 flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-6 w-48 mb-2 rounded" />
                <Skeleton className="h-5 w-36 mb-3 rounded" />
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-12 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
                <Skeleton className="h-8 w-24 rounded" />
              </CardContent>
            </Card>
          ))}

        {/* No professionals found */}
        {!loadingPros && filteredPros.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-muted-foreground opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m-1.75-2.4a6.75 6.75 0 11-9.55-9.55 6.75 6.75 0 019.55 9.55zM3 3l18 18"
              />
            </svg>
            No professionals found.
          </div>
        )}

        {/* Professionals list */}
        {!loadingPros &&
          filteredPros.map((pro) => (
            <div
              key={pro.id}
              onClick={() => setSelectedPro(pro)}
              className="flex min-w-sm flex-col items-center cursor-pointer p-4 rounded-md hover:bg-teal-50 hover:border dark:hover:bg-slate-800 transition-colors flex-shrink-0"
              title={`Click to view details of ${pro.name}`}
            >
              <img
                src={pro.avatar || '/placeholder.svg?height=120&width=120&query=professional%20portrait'}
                alt={`${pro.name} avatar`}
                className="h-24 w-24 rounded-full object-cover ring-1 ring-black/5 mb-3"
              />
              <div className="font-medium text-lg text-center truncate w-full">{pro.name}</div>
              <div className="text-sm text-muted-foreground truncate w-full text-center">
                {pro.specialty}
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-600 mt-1">
                {pro.rating && (
                  <>
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <span className="font-medium">{pro.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({pro.reviews})</span>
                  </>
                )}
              </div>
              <Badge variant="outline" className="mt-2 px-4 py-1 text-base">
                {pro.feeCoins} coins
              </Badge>
            </div>
          ))}
      </div>

      {/* Modal popup for selected pro */}
      {selectedPro && (
        <div
          ref={modalRef}
          onClick={onBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <Card className="max-w-lg w-full relative">
            <button
              aria-label="Close modal"
              onClick={() => setSelectedPro(null)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPro.avatar || '/placeholder.svg?height=120&width=120&query=professional%20portrait'}
                  alt={`${selectedPro.name} avatar`}
                  className="h-16 w-16 rounded-full object-cover ring-1 ring-black/5"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{selectedPro.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedPro.specialty}</div>
                  {selectedPro.rating && (
                    <div className="mt-1 flex items-center gap-1 text-sm text-amber-600">
                      <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                      <span className="font-medium">{selectedPro.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({selectedPro.reviews})</span>
                    </div>
                  )}
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1.5">
                  {selectedPro.feeCoins} coins
                </Badge>
              </div>
              {selectedPro.bio && (
                <p className="text-sm text-muted-foreground mt-4 line-clamp-3">{selectedPro.bio}</p>
              )}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                {selectedPro.methods.includes('chat') && <MessageSquare className="h-5 w-5" />}
                {selectedPro.methods.includes('audio') && <Mic className="h-5 w-5" />}
                {selectedPro.methods.includes('video') && <Video className="h-5 w-5" />}
              </div>
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Upcoming slots (next 7 days)
                </div>
                <div className="flex flex-wrap gap-2">
                  {slots.length === 0 ? (
                    <span className="text-sm text-muted-foreground">No slots available</span>
                  ) : (
                    slots.map((s) => (
                      <Badge key={s.toISOString()} variant="secondary">
                        {humanDateTime(s)}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                  onClick={() => {
                    openBooking(selectedPro)
                    setSelectedPro(null)
                  }}
                  disabled={!currentClient}
                >
                  Book {selectedPro.specialty} <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
                {!currentClient && (
                  <div className="text-xs text-muted-foreground text-center mt-2">
                    Sign up as Client to book
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}

function nextThreeSlots(pro: Professional, appts: Appointment[]) {
  const now = new Date()
  const next: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    const base = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    const slots = generateSlotsForDay(base, pro.availability)
    for (const s of slots) {
      if (s.start <= now) continue
      const conflict = appts.some(
        (a) =>
          a.proId === pro.id &&
          a.status === 'scheduled' &&
          new Date(a.startISO).getTime() === s.start.getTime()
      )
      if (!conflict) {
        next.push(s.start)
        if (next.length >= 3) return next
      }
    }
  }
  return next
}
