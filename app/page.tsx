'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarClock, Coins, Mail, Search, Star, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { type Client, type Professional, type CommMethod, type Appointment, type InAppNotification, type WeeklyAvailability, type DayOfWeek } from '@/lib/types'
import { uid, humanDateTime, dateToYMD, ymdToDate } from '@/lib/time'
import { useLocalStorage } from '@/lib/use-local-storage'
import { generateSlotsForDay } from '@/lib/availability'

import Navbar from '@/components/site/navbar'
import Hero from '@/components/site/hero'
import HowItWorks from '@/components/site/how-it-works'
import RegisterSection from '@/components/site/register-section'
import ProsSection from '@/components/site/pros-section'
import PricingSection from '@/components/site/pricing-section'
import FAQSection from '@/components/site/faq-section'
import TestimonialsSection from '@/components/site/testimonials-section'
import Footer from '@/components/site/footer'
import BuyCoinsDialog from '@/components/site/dialogs/buy-coins-dialog'
import BookDialog from '@/components/site/dialogs/book-dialog'
import SessionModal from '@/components/site/dialogs/session-modal'
import { ChevronRight, MessageSquare, Mic, Video } from 'lucide-react'

const defaultAvailability: WeeklyAvailability = {
slotDurationMinutes: 30,
days: {
0: [],
1: [{ start: '10:00', end: '14:00' }],
2: [{ start: '10:00', end: '14:00' }],
3: [{ start: '10:00', end: '14:00' }],
4: [{ start: '10:00', end: '14:00' }],
5: [{ start: '10:00', end: '12:00' }],
6: [],
} as Record<DayOfWeek, { start: string; end: string }[]>,
}

export default function Page() {
const { toast } = useToast()

const [professionals, setProfessionals] = useLocalStorage<Professional[]>('pros', [])
const [clients, setClients] = useLocalStorage<Client[]>('clients', [])
const [appointments, setAppointments] = useLocalStorage<Appointment[]>('appts', [])
const [notifications, setNotifications] = useLocalStorage<InAppNotification[]>('notifications', [])
const [currentClientId, setCurrentClientId] = useLocalStorage<string | null>('currentClientId', null)
const [currentProId, setCurrentProId] = useLocalStorage<string | null>('currentProId', null)
const [query, setQuery] = useState('')
const [loadingPros, setLoadingPros] = useState(true)

// seed data
useEffect(() => {
if (professionals.length === 0) {
  const seed: Professional[] = [
    {
      id: uid('pro'),
      name: 'Dr. Aasha Koirala',
      specialty: 'Therapist',
      feeCoins: 300,
      methods: ['chat', 'audio', 'video'],
      bio: 'Mental wellness specialist with 8+ years of experience.',
      avatar: '/therapist-portrait.png',
      availability: defaultAvailability,
      rating: 4.9,
      reviews: 142,
    },
    {
      id: uid('pro'),
      name: 'Bikash Thapa',
      specialty: 'Fitness Coach',
      feeCoins: 180,
      methods: ['audio', 'video'],
      bio: 'Certified trainer helping people build sustainable habits.',
      avatar: '/coach-portrait.png',
      availability: defaultAvailability,
      rating: 4.7,
      reviews: 98,
    },
    {
      id: uid('pro'),
      name: 'Adv. Sita Sharma',
      specialty: 'Lawyer',
      feeCoins: 500,
      methods: ['chat', 'audio', 'video'],
      bio: 'Legal counsel for family and property cases.',
      avatar: '/lawyer-portrait.png',
      availability: defaultAvailability,
      rating: 4.8,
      reviews: 76,
    },
  ]
  setProfessionals(seed)
}
if (clients.length === 0) {
  const demo: Client = { id: uid('cl'), name: 'Demo Client', coins: 1000 }
  setClients([demo])
  setCurrentClientId(demo.id)
}
const t = setTimeout(() => setLoadingPros(false), 600)
return () => clearTimeout(t)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const currentClient = useMemo(() => clients.find(c => c.id === currentClientId) || null, [clients, currentClientId])
const currentPro = useMemo(() => professionals.find(p => p.id === currentProId) || null, [professionals, currentProId])
const unreadCount = notifications.filter(n => !n.read).length
const addNotification = (title: string, body: string) => {
setNotifications(prev => [{ id: uid('ntf'), title, body, createdAt: Date.now(), read: false }, ...prev])
}
const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

// Browser notifications + SW
const [notifPerm, setNotifPerm] = useState<NotificationPermission>('default')
useEffect(() => {
if (typeof Notification !== 'undefined') setNotifPerm(Notification.permission)
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {})
}, [])
const requestBrowserNotifications = async () => {
if (typeof Notification === 'undefined') return
const res = await Notification.requestPermission()
setNotifPerm(res)
if (res !== 'granted') toast({ title: 'Permission not granted', description: 'We could not enable browser notifications.' })
else toast({ title: 'Notifications enabled', description: 'You will receive booking and reminder alerts.' })
}
const showBrowserNotification = async (title: string, options?: NotificationOptions) => {
try {
  if (notifPerm !== 'granted') return
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.getRegistration()
    if (reg) { await reg.showNotification(title, options); return }
  }
  new Notification(title, options)
} catch {}
}

// Wallet helpers
const addCoins = (clientId: string, amount: number) =>
setClients(prev => prev.map(c => (c.id === clientId ? { ...c, coins: c.coins + amount } : c)))
const deductCoins = (clientId: string, amount: number) =>
setClients(prev => prev.map(c => (c.id === clientId ? { ...c, coins: c.coins - amount } : c)))

// Register handlers
const handleProRegister = (p: Omit<Professional, 'id'>) => {
const newPro: Professional = { ...p, id: uid('pro') }
setProfessionals(prev => [newPro, ...prev])
setCurrentProId(newPro.id)
addNotification('Welcome, Professional!', `Your profile "${newPro.name}" is live.`)
toast({ title: 'Professional profile created', description: `${newPro.name} is now discoverable.` })
}
const handleClientRegister = (name: string) => {
const newClient: Client = { id: uid('cl'), name, coins: 0 }
setClients(prev => [newClient, ...prev])
setCurrentClientId(newClient.id)
addNotification('Welcome!', `Account created for ${newClient.name}.`)
toast({ title: 'Client created', description: `Signed in as ${newClient.name}.` })
}

// Booking & reminders
const [buyOpen, setBuyOpen] = useState(false)
const [buyAmount, setBuyAmount] = useState(200)
const [buyMethod, setBuyMethod] = useState<'esewa' | 'paypal' | 'stripe'>('esewa')
const [bookingOpen, setBookingOpen] = useState(false)
const [bookingPro, setBookingPro] = useState<Professional | null>(null)

const openBooking = (pro: Professional) => { setBookingPro(pro); setBookingOpen(true) }

const createAppointment = (client: Client, pro: Professional, start: Date, durationMinutes: number, method: CommMethod) => {
const appt: Appointment = { id: uid('apt'), proId: pro.id, clientId: client.id, startISO: start.toISOString(), durationMinutes, method, status: 'scheduled' }
setAppointments(prev => [appt, ...prev])
addNotification('Appointment booked', `Booked ${method} session with ${pro.name} for ${humanDateTime(start)}.`)
showBrowserNotification('Appointment booked', { body: `${pro.name} • ${humanDateTime(start)}`, icon: '/appointment-booked-icon.png' })
scheduleReminders(appt)
return appt
}

const reminderTimers = useRef<Record<string, number[]>>({})
const proName = (id: string) => professionals.find(p => p.id === id)?.name || 'Professional'
const clientName = (id: string) => clients.find(c => c.id === id)?.name || 'Client'
const [sessionOpen, setSessionOpen] = useState(false)
const [activeSession, setActiveSession] = useState<Appointment | null>(null)

const scheduleReminders = (appt: Appointment, reminderMinutes = 5) => {
const start = new Date(appt.startISO)
const now = new Date()
const msUntilReminder = start.getTime() - now.getTime() - reminderMinutes * 60_000
const msUntilStart = start.getTime() - now.getTime()
const timers: number[] = []
if (msUntilReminder > 0) {
  const t1 = window.setTimeout(() => {
    addNotification('Appointment reminder', `Reminder: Your ${appt.method} session with ${proName(appt.proId)} starts in ${reminderMinutes} minutes.`)
    showBrowserNotification('Appointment reminder', { body: `Starts in ${reminderMinutes} minutes`, icon: '/appointment-reminder-icon.png' })
  }, msUntilReminder)
  timers.push(t1)
}
if (msUntilStart > 0) {
  const t2 = window.setTimeout(() => {
    addNotification('Appointment starting', `Your ${appt.method} session with ${proName(appt.proId)} is starting now.`)
    showBrowserNotification('Appointment starting', { body: 'Tap to join', icon: '/appointment-start-icon.png' })
    setActiveSession(appt)
    setSessionOpen(true)
  }, msUntilStart)
  timers.push(t2)
}
reminderTimers.current[appt.id] = timers
}

const filteredPros = useMemo(() => {
const q = query.trim().toLowerCase()
if (!q) return professionals
return professionals.filter(p => p.name.toLowerCase().includes(q) || p.specialty.toLowerCase().includes(q))
}, [query, professionals])

// Smooth scroll helpers
const scrollToId = (id: string) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

return (
<div className="relative min-h-screen">
  {/* Background: color gradient restored + subtle images */}
  <div className="pointer-events-none fixed inset-0 -z-10">
    {/* Base gradient (teal palette) */}
    <div className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white dark:from-slate-950 dark:to-slate-900" />
    {/* Subtle texture */}
    <div
      className="absolute inset-0 opacity-5 dark:opacity-10 bg-repeat"
      style={{ backgroundImage: "url('/images/pattern-noise.png')" }}
    />
    {/* Hero decorative image */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-10"
      style={{ backgroundImage: "url('/images/hero-bg.png')" }}
    />
    {/* Decorative radial glow */}
    <div className="absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/10" />
  </div>

  <Navbar
    currentClient={currentClient}
    notifications={notifications}
    unreadCount={unreadCount}
    onNotificationsOpen={markAllRead}
    onBuyClick={() => setBuyOpen(true)}
    onRegisterClick={() => scrollToId('register')}
    onNav={(id) => scrollToId(id)}
  />

  <main>
    <Hero
      notifPerm={notifPerm}
      requestNotifications={requestBrowserNotifications}
      onGetStarted={() => scrollToId('register')}
      onExplore={() => scrollToId('pros')}
    />

    <section id="hero-metrics" className="container mx-auto px-4 mt-8 grid sm:grid-cols-3 gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-teal-50 dark:bg-teal-500/10 p-2">
          <User className="h-5 w-5 text-teal-700 dark:text-teal-400" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Professionals</div>
          <div className="text-xl font-semibold">{professionals.length}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-teal-50 dark:bg-teal-500/10 p-2">
          <Coins className="h-5 w-5 text-teal-700 dark:text-teal-400" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Coins purchased (demo)</div>
          <div className="text-xl font-semibold">{currentClient?.coins ?? 0}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-teal-50 dark:bg-teal-500/10 p-2">
          <CalendarClock className="h-5 w-5 text-teal-700 dark:text-teal-400" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Appointments (demo)</div>
          <div className="text-xl font-semibold">{appointments.length}</div>
        </div>
      </div>
    </section>

    <div className="container mx-auto px-4 mt-4 text-xs text-muted-foreground">
      Note: For production Web Push, add VAPID keys and server actions to manage subscriptions and send notifications.
    </div>

    <HowItWorks />

    <RegisterSection
      clients={clients}
      currentClientId={currentClientId}
      setCurrentClientId={setCurrentClientId}
      professionals={professionals}
      handleProRegister={handleProRegister}
      handleClientRegister={handleClientRegister}
      setClients={setClients}
    />

    <ProsSection
      loadingPros={loadingPros}
      filteredPros={filteredPros}
      appointments={appointments}
      currentClient={currentClient}
      openBooking={openBooking}
      query={query}
      setQuery={setQuery}
    />

    <PricingSection
      onSelectAmount={(amt) => setBuyAmount(amt)}
      onOpenPurchase={() => setBuyOpen(true)}
    />

    <FAQSection />

    <TestimonialsSection />
  </main>

  <Footer onNav={(id) => scrollToId(id)} />

  {/* Buy Coins */}
  <BuyCoinsDialog
    open={buyOpen}
    onOpenChange={setBuyOpen}
    buyAmount={buyAmount}
    setBuyAmount={setBuyAmount}
    buyMethod={buyMethod}
    setBuyMethod={setBuyMethod}
    currentClient={currentClient}
    onConfirm={async () => {
      if (!currentClient) { toast({ title: 'Sign in as Client to buy coins' }); return }
      const p = new Promise(res => setTimeout(res, 800))
      toast({ title: 'Processing payment...', description: `Paying ${buyAmount} NPR via ${buyMethod}` })
      await p
      addCoins(currentClient.id, buyAmount)
      addNotification('Coins added', `Purchased ${buyAmount} coins via ${buyMethod}.`)
      toast({ title: 'Coins added', description: `Your wallet has been credited.` })
      setBuyOpen(false)
    }}
  />

  {/* Booking Dialog */}
  {bookingPro && currentClient && (
    <BookDialog
      open={bookingOpen}
      onOpenChange={setBookingOpen}
      pro={bookingPro}
      client={currentClient}
      appointments={appointments}
      onInsufficientFunds={() => { setBuyOpen(true); toast({ title: 'Insufficient coins', description: 'Please buy more coins to book this appointment.' }) }}
      onCreate={(client, pro, start, duration, method) => { const appt = createAppointment(client, pro, start, duration, method); deductCoins(client.id, pro.feeCoins); return appt }}
      onBooked={() => setBookingOpen(false)}
    />
  )}

  {/* Session Modal */}
  {activeSession && (
    <SessionModal
      open={sessionOpen}
      onOpenChange={setSessionOpen}
      appt={activeSession}
      proName={proName(activeSession.proId)}
      clientName={clientName(activeSession.clientId)}
    />
  )}
</div>
)
}
