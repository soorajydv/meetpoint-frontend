import Logo from './logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Github, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer({ onNav }: { onNav: (id: string) => void }) {
  return (
    <footer className="border-t bg-white/60 dark:bg-slate-950/60 backdrop-blur">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-4 gap-6">
        <div>
          <Logo />
          <p className="text-sm text-muted-foreground mt-2">
            Book trusted professionals with ease.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Social icon={Facebook} />
            <Social icon={Instagram} />
            <Social icon={Linkedin} />
            <Social icon={Github} />
          </div>
        </div>
        <div>
          <div className="font-medium mb-2">Links</div>
          <ul className="space-y-1 text-sm">
            <li><a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer" onClick={() => onNav('how')}>How it works</a></li>
            <li><a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer" onClick={() => onNav('pros')}>Professionals</a></li>
            <li><a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer" onClick={() => onNav('pricing')}>Coins</a></li>
            <li><a className="hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer" onClick={() => onNav('faq')}>FAQs</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Support</div>
          <ul className="space-y-1 text-sm">
            <li>help@Meetpoint.app</li>
            <li>+977-1-555-0000</li>
            <li>Kathmandu, Nepal</li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Newsletter</div>
          <div className="flex gap-2">
            <Input placeholder="Your email" />
            <Button className="bg-teal-600 hover:bg-teal-700 text-white transition-colors"><Mail className="h-4 w-4" /></Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Stay informed about new features</p>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Meetpoint — All rights reserved.
      </div>
    </footer>
  )
}

import type { LucideIcon } from 'lucide-react'
function Social({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <button className="rounded-full border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground p-2 transition-colors">
      <Icon className="h-4 w-4" />
      <span className="sr-only">Social</span>
    </button>
  )
}
