import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="container mx-auto px-4 py-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">What our users say</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <TransparentTestimonial name="Ravi" text="Booking a coach was effortless. Reminders kept me on track." />
        <TransparentTestimonial name="Sneha" text="Loved the simple flow — everything on one page!" />
        <TransparentTestimonial name="Kamal" text="Chat and video sessions are smooth for my consultations." />
      </div>
    </section>
  )
}

function TransparentTestimonial({ name, text }: { name: string; text: string }) {
  return (
    <div className="p-4 rounded-lg bg-transparent">
      <div className="flex items-center gap-2">
        <img src="/diverse-user-avatars.png" alt="" className="h-10 w-10 rounded-full object-cover ring-1 ring-black/5" />
        <div>
          <div className="font-medium">{name}</div>
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <Star className="h-4 w-4 fill-amber-500" />
            <Star className="h-4 w-4 fill-amber-500" />
            <Star className="h-4 w-4 fill-amber-500" />
            <Star className="h-4 w-4 fill-amber-500" />
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
