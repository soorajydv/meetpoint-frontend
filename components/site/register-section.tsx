'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import type { Client, Professional, WeeklyAvailability, CommMethod, DayOfWeek, TimeRange } from '@/lib/types'
import { useState } from 'react'
import { MessageSquare, Mic, Video, CheckCircle2, Play } from 'lucide-react'
import AvailabilityEditor from './availability-editor'

export default function RegisterSection({
  clients, currentClientId, setCurrentClientId,
  professionals, handleProRegister, handleClientRegister, setClients,
}: {
  clients: Client[]
  currentClientId: string | null
  setCurrentClientId: (id: string | null) => void
  professionals: Professional[]
  handleProRegister: (p: Omit<Professional, 'id'>) => void
  handleClientRegister: (name: string) => void
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
}) {
  const { toast } = useToast()
  return (
    <section id="register" className="container mx-auto px-4 py-12">
      <Card className="bg-white/80 dark:bg-slate-900/70 shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 rounded-full bg-teal-600/15 ring-1 ring-teal-600/30" />
            Register & get booked
          </CardTitle>
          <CardDescription>Everything lives here on the landing page.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="client">I&apos;m a Client</TabsTrigger>
              <TabsTrigger value="pro">I&apos;m a Professional</TabsTrigger>
            </TabsList>

            <TabsContent value="client" className="pt-4">
              <ClientForm
                existing={clients}
                currentClientId={currentClientId}
                onRegister={handleClientRegister}
                onSwitch={setCurrentClientId}
                setClients={setClients}
                toast={toast}
              />
            </TabsContent>

            <TabsContent value="pro" className="pt-4">
              <ProfessionalForm onRegister={handleProRegister} professionals={professionals} toast={toast} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

function ClientForm({
  existing, currentClientId, onRegister, onSwitch, setClients, toast,
}: {
  existing: Client[]
  currentClientId: string | null
  onRegister: (name: string) => void
  onSwitch: (id: string | null) => void
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
  toast: ReturnType<typeof useToast>['toast']
}) {
  const [name, setName] = useState('')
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-[1fr_auto] gap-2">
        <div>
          <Label htmlFor="client-name">Your name</Label>
          <Input id="client-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sita Shrestha" />
        </div>
        <Button
          className="sm:self-end bg-teal-600 hover:bg-teal-700 text-white transition-colors"
          onClick={() => { if (!name.trim()) return; onRegister(name.trim()); setName('') }}
        >
          Create client
        </Button>
      </div>
      {existing.length > 0 && (
        <div className="grid sm:grid-cols-[1fr_auto] gap-2 items-end">
          <div>
            <Label htmlFor="switch-client">Switch client</Label>
            <Select value={currentClientId ?? ''} onValueChange={(v) => onSwitch(v || null)}>
              <SelectTrigger id="switch-client"><SelectValue placeholder="Select client" /></SelectTrigger>
              <SelectContent>
                {existing.map(c => (<SelectItem key={c.id} value={c.id}>{c.name} ({c.coins} coins)</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="transition-colors" onClick={() => onSwitch(null)}>Sign out</Button>
        </div>
      )}
      <div className="mt-1">
        <Button
          variant="secondary"
          className="transition-colors"
          onClick={() => {
            const demo = existing.find(c => c.name === 'Demo Client')
            if (demo) { onSwitch(demo.id); toast({ title: 'Signed in as Demo Client' }); return }
            const d: Client = { id: `cl_demo`, name: 'Demo Client', coins: 1000 }
            setClients(prev => [d, ...prev]); onSwitch(d.id); toast({ title: 'Demo Client created' })
          }}
        >
          <Play className="h-4 w-4 mr-2" /> Demo client login
        </Button>
      </div>
    </div>
  )
}

function ProfessionalForm({
  onRegister, professionals, toast,
}: { onRegister: (p: Omit<Professional, 'id'>) => void; professionals: Professional[]; toast: ReturnType<typeof useToast>['toast'] }) {
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [fee, setFee] = useState(200)
  const [methods, setMethods] = useState<CommMethod[]>(['chat', 'audio', 'video'])
  const [bio, setBio] = useState('')

  const defaultAvailability: WeeklyAvailability = {
    slotDurationMinutes: 30,
    days: {
      0: [], 1: [{ start: '10:00', end: '14:00' }], 2: [{ start: '10:00', end: '14:00' }],
      3: [{ start: '10:00', end: '14:00' }], 4: [{ start: '10:00', end: '14:00' }], 5: [{ start: '10:00', end: '12:00' }], 6: [],
    } as Record<DayOfWeek, TimeRange[]>,
  }

  const toggleMethod = (m: CommMethod) => setMethods(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <Label htmlFor="pro-name">Name</Label>
          <Input id="pro-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dr. Ram K." />
        </div>
        <div className="md:col-span-1">
          <Label htmlFor="pro-specialty">Field / Specialty</Label>
          <Input id="pro-specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="e.g. Therapist, Tutor, Lawyer" />
        </div>
        <div className="md:col-span-1">
          <Label htmlFor="pro-fee">Consultation fee (coins)</Label>
          <Input id="pro-fee" type="number" min={0} value={fee} onChange={(e) => setFee(Number(e.target.value || 0))} />
        </div>
      </div>

      <div>
        <Label htmlFor="pro-bio">Short bio</Label>
        <Input id="pro-bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell clients about your expertise" />
      </div>

      <div>
        <Label>Communication methods</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          <button type="button" onClick={() => toggleMethod('chat')} className={cn('px-3 py-2 text-sm rounded-md border transition-colors', methods.includes('chat') && 'bg-teal-600 text-white border-transparent')}>
            <MessageSquare className="h-4 w-4 inline mr-1" /> Chat
          </button>
          <button type="button" onClick={() => toggleMethod('audio')} className={cn('px-3 py-2 text-sm rounded-md border transition-colors', methods.includes('audio') && 'bg-teal-600 text-white border-transparent')}>
            <Mic className="h-4 w-4 inline mr-1" /> Audio
          </button>
          <button type="button" onClick={() => toggleMethod('video')} className={cn('px-3 py-2 text-sm rounded-md border transition-colors', methods.includes('video') && 'bg-teal-600 text-white border-transparent')}>
            <Video className="h-4 w-4 inline mr-1" /> Video
          </button>
        </div>
      </div>

      <AvailabilityEditor
        value={defaultAvailability}
        onChange={() => {}}
        // In a real app, you'd keep local state here; using default for demo simplicity
      />

      <div className="pt-2 flex flex-wrap gap-2">
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white transition-colors"
          onClick={() => {
            if (!name.trim() || !specialty.trim() || methods.length === 0) return
            onRegister({
              name: name.trim(),
              specialty: specialty.trim(),
              feeCoins: fee,
              methods,
              bio: bio.trim(),
              avatar: '/professional-portrait.png',
              availability: defaultAvailability,
              rating: 4.6,
              reviews: Math.floor(Math.random() * 100) + 10,
            })
            setName(''); setSpecialty(''); setBio('')
          }}
        >
          <CheckCircle2 className="h-4 w-4 mr-1" /> Create professional profile
        </Button>

        <Button
          variant="secondary"
          className="transition-colors"
          onClick={() => {
            const pro = professionals[0]
            if (pro) { 
              toast({ title: `Signed in as ${pro.name}` })
            } else { 
              toast({ title: 'No professionals available', description: 'Create a professional profile first.' }) 
            }
          }}
        >
          <Play className="h-4 w-4 mr-2" /> Demo pro login
        </Button>
      </div>
    </div>
  )
}
