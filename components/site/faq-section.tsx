import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQSection() {
  return (
    <section id="faq" className="container mx-auto px-4 pt-22">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Frequently asked questions</h2>
      </div>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How do notifications work?</AccordionTrigger>
            <AccordionContent>
              You get in-app notifications for bookings and reminders. You can also enable browser notifications for alerts.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I change my weekly availability?</AccordionTrigger>
            <AccordionContent>
              Yes. Update time ranges in your professional profile — they repeat weekly and slots update instantly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What payment methods are supported?</AccordionTrigger>
            <AccordionContent>
              eSewa, PayPal, and Stripe are supported. In this demo, payments are simulated; integrate real gateways to credit coins on successful webhooks.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
