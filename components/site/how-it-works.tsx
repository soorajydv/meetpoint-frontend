import { Bell, CalendarClock, Clock, Coins, User, Video } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section id="how" className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
        <p className="text-muted-foreground">From registration to your session in a few simple steps</p>
      </div>

      {/* Transparent steps (no cards, no borders) */}
      <div className="grid md:grid-cols-3 gap-6">
        <Step icon={<User className="h-5 w-5 text-teal-700 dark:text-teal-400" />} title="Register" desc="Sign up as a client or professional. No dashboard to learn." />
        <Step icon={<Clock className="h-5 w-5 text-teal-700 dark:text-teal-400" />} title="Set availability" desc="Pros set weekly time ranges once; slots repeat weekly." />
        <Step icon={<Coins className="h-5 w-5 text-teal-700 dark:text-teal-400" />} title="Buy coins" desc="1 coin = 1 NPR. Pay via eSewa, PayPal, or Stripe." />
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-6">
        <Step icon={<CalendarClock className="h-5 w-5 text-teal-700 dark:text-teal-400" />} title="Book a slot" desc="Pick a date/time and communication method." />
        <Step icon={<Bell className="h-5 w-5 text-teal-700 dark:text-teal-400" />} title="Get notified" desc="Immediate confirmation + reminder before start." />
        <Step icon={<Video className="h-5 w-5 text-teal-700 dark:text-teal-400" />} title="Start session" desc="Chat, audio, or video when time begins." />
      </div>
    </section>
  )
}

function Step({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-md bg-teal-50 dark:bg-teal-500/10 p-2">{icon}</div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}
