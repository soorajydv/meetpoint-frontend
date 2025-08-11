'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { Client } from '@/lib/types'

export default function BuyCoinsDialog({
  open, onOpenChange, buyAmount, setBuyAmount, buyMethod, setBuyMethod, currentClient, onConfirm,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  buyAmount: number
  setBuyAmount: (n: number) => void
  buyMethod: 'esewa' | 'paypal' | 'stripe'
  setBuyMethod: (m: 'esewa' | 'paypal' | 'stripe') => void
  currentClient: Client | null
  onConfirm: () => Promise<void>
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy coins</DialogTitle>
          <DialogDescription>1 coin = 1 NPR. Choose provider and amount.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <Button variant={buyMethod === 'esewa' ? 'default' : 'outline'} className={cn(buyMethod === 'esewa' && 'bg-teal-600 hover:bg-teal-700 text-white')} onClick={() => setBuyMethod('esewa')}>eSewa</Button>
            <Button variant={buyMethod === 'paypal' ? 'default' : 'outline'} className={cn(buyMethod === 'paypal' && 'bg-teal-600 hover:bg-teal-700 text-white')} onClick={() => setBuyMethod('paypal')}>PayPal</Button>
            <Button variant={buyMethod === 'stripe' ? 'default' : 'outline'} className={cn(buyMethod === 'stripe' && 'bg-teal-600 hover:bg-teal-700 text-white')} onClick={() => setBuyMethod('stripe')}>Stripe</Button>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <div>
              <Label htmlFor="amount">Amount (NPR)</Label>
              <Input id="amount" type="number" min={10} step={10} value={buyAmount} onChange={(e) => setBuyAmount(Number(e.target.value || 0))} />
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Coins you get</div>
              <div className="font-semibold">{buyAmount}</div>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white transition-colors"
            onClick={onConfirm}
            disabled={!currentClient || buyAmount <= 0}
          >
            Pay {buyAmount} NPR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
