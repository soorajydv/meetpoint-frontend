import { ArrowRight, BellRing } from 'lucide-react'
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
    <section
      id="hero"
      className="container mx-auto p-5 pt-10 md:pt-16"
      style={{
        minHeight: 'calc(100vh - 64px)', // full viewport height minus navbar height
        display: 'flex',
        alignItems: 'center', // vertical center
        justifyContent: 'center', // horizontal center
      }}
    >
      <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Book trusted professionals in few clicks
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
        </div>
        <div aria-hidden className="relative sm:pt-[4rem]">
          <img
            src="/appointment-booking-illustration.png"
            alt="Booking illustration"
            className="w-full rounded-xl transition-transform duration-500 hover:-translate-y-1"
          />
        </div>
      </div>
    </section>
  )
}
