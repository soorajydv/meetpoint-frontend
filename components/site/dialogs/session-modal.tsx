'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Appointment } from '@/lib/types'
import { humanDateTime } from '@/lib/time'
import { MessageSquare, Mic, Video } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function SessionModal({
  open, onOpenChange, appt, proName, clientName,
}: { open: boolean; onOpenChange: (v: boolean) => void; appt: Appointment; proName: string; clientName: string }) {
  const methodIcon = appt.method === 'chat' ? <MessageSquare className="h-4 w-4" /> :
    appt.method === 'audio' ? <Mic className="h-4 w-4" /> : <Video className="h-4 w-4" />

  const [chatLog, setChatLog] = useState<{ who: 'you' | 'them'; text: string; ts: number }[]>([])
  const [chatText, setChatText] = useState('')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {methodIcon}
            {appt.method.toUpperCase()} session
          </DialogTitle>
          <DialogDescription>
            {clientName} with {proName} • {humanDateTime(new Date(appt.startISO))}
          </DialogDescription>
        </DialogHeader>

        {appt.method === 'chat' && (
          <div className="grid grid-rows-[1fr_auto] h-[420px] border rounded-md overflow-hidden">
            <div className="p-3 space-y-2 overflow-auto">
              {chatLog.length === 0 && (
                <div className="text-sm text-muted-foreground">Chat started. This is a demo room — messages are local only.</div>
              )}
              {chatLog.map((m, i) => (
                <div key={i} className={cn('max-w-[80%] rounded-md px-3 py-2 text-sm transition-all', m.who === 'you' ? 'bg-teal-100 dark:bg-teal-500/10 ml-auto' : 'bg-muted')}>
                  <div className="text-[10px] text-muted-foreground mb-1">{m.who === 'you' ? 'You' : proName}</div>
                  <div>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t flex items-center gap-2">
              <input
                className="flex-1 h-9 rounded-md border bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                placeholder="Type a message..."
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatText.trim()) {
                    setChatLog(prev => [...prev, { who: 'you', text: chatText.trim(), ts: Date.now() }])
                    setChatText('')
                  }
                }}
              />
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                onClick={() => {
                  if (!chatText.trim()) return
                  setChatLog(prev => [...prev, { who: 'you', text: chatText.trim(), ts: Date.now() }])
                  setChatText('')
                }}
              >
                Send
              </Button>
            </div>
          </div>
        )}

        {appt.method !== 'chat' && (
          <div className="grid gap-3">
            <div className="rounded-md border p-4 bg-muted/40">
              <div className="text-sm text-muted-foreground">
                This is a stub session UI. Replace with WebRTC/LiveKit or your provider for real audio/video.
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="aspect-video rounded-md bg-black/80 grid place-items-center text-white text-xs">
                  Local preview
                </div>
                <div className="aspect-video rounded-md bg-black/60 grid place-items-center text-white text-xs">
                  Remote stream
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button variant="outline" className="transition-colors">Toggle mic</Button>
                <Button variant="outline" className="transition-colors">Toggle camera</Button>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white transition-colors">Start</Button>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" className="transition-colors" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
