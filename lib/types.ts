export type CommMethod = 'chat' | 'audio' | 'video'
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type TimeRange = { start: string; end: string }
export type WeeklyAvailability = {
  slotDurationMinutes: number
  days: Record<DayOfWeek, TimeRange[]>
}

export type Professional = {
  id: string
  name: string
  specialty: string
  feeCoins: number
  methods: CommMethod[]
  bio?: string
  avatar?: string
  availability: WeeklyAvailability
  rating?: number
  reviews?: number
}

export type Client = { id: string; name: string; coins: number }

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled'
export type Appointment = {
  id: string
  proId: string
  clientId: string
  startISO: string
  durationMinutes: number
  method: CommMethod
  status: AppointmentStatus
}

export type InAppNotification = {
  id: string
  title: string
  body: string
  createdAt: number
  read: boolean
}
