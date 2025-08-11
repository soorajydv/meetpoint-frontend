import { ArrowRight, BellRing, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero({
  notifPerm,
  requestNotifications,
  onGetStarted,
  onExplore,
}: {
  notifPerm: NotificationPermission
  requestNotifications: () => void
  onGetStarted: () => void
  onExplore: () => void
}) {
  return (
    <section id="hero" className="container mx-auto px-4 pt-12 md:pt-16">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Book trusted professionals — all from one landing page
          </h1>
          <p className="mt-3 text-muted-foreground max-w-prose">
            Set weekly availability, buy coins, and book chat, audio, or video sessions. Simple, fast, and secure.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white transition-colors" onClick={onGetStarted}>
              Get started <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="transition-colors" onClick={onExplore}>
              Explore professionals
            </Button>
            {notifPerm !== 'granted' && (
              <Button size="lg" variant="secondary" className="transition-colors" onClick={requestNotifications}>
                <BellRing className="h-4 w-4 mr-2" /> Enable notifications
              </Button>
            )}
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" /><Star className="h-4 w-4 fill-amber-500" /><Star className="h-4 w-4 fill-amber-500" /><Star className="h-4 w-4 fill-amber-500" /><Star className="h-4 w-4 fill-amber-500" />
            </div>
            <div className="text-muted-foreground">Loved by clients and professionals</div>
          </div>
        </div>
        <div aria-hidden className="relative">
          <img
            src="/appointment-booking-illustration.png"
            alt="Booking illustration"
            className="w-full rounded-xl shadow-lg ring-1 ring-black/5 transition-transform duration-500 hover:-translate-y-1"
          />
          <div className="absolute -bottom-4 -left-4 hidden md:block">
            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur rounded-xl border p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-teal-50 dark:bg-teal-500/10 p-2">
                  <ArrowRight className="h-4 w-4 text-teal-700 dark:text-teal-400" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Smart reminders</div>
                  <div className="text-xs text-muted-foreground">Push + in-app before sessions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  )
}
