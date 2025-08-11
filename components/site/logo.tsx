import { CalendarClock } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <CalendarClock className="h-6 w-6 text-teal-600 dark:text-teal-400" />
      <span className="font-semibold">Meetpoint</span>
    </div>
  )
}
