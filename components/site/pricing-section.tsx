import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Coins } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PricingSection({
  onSelectAmount, onOpenPurchase,
}: { onSelectAmount: (amt: number) => void; onOpenPurchase: () => void }) {
  return (
    <section id="pricing" className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Coins wallet</h2>
        <p className="text-muted-foreground">1 coin = 1 NPR. Use coins to book appointments.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <CoinPlan name="Starter" coins={200} description="Try your first session" highlight={false} onBuy={() => onSelectAmount(200)} />
        <CoinPlan name="Popular" coins={500} description="Multiple short sessions" highlight onBuy={() => onSelectAmount(500)} />
        <CoinPlan name="Pro" coins={1000} description="Longer or more frequent sessions" highlight={false} onBuy={() => onSelectAmount(1000)} />
      </div>
      <div className="text-center mt-6">
        <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white transition-colors" onClick={onOpenPurchase}>
          <Coins className="h-4 w-4 mr-2" /> Buy coins
        </Button>
      </div>
    </section>
  )
}

function CoinPlan({ name, coins, description, highlight, onBuy }: { name: string; coins: number; description: string; highlight?: boolean; onBuy: () => void }) {
  return (
    <Card className={cn('bg-white/80 dark:bg-slate-900/70 relative transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5', highlight && 'ring-2 ring-teal-600')}>
      {highlight && <div className="absolute -top-3 right-3 rounded-full bg-teal-600 text-white text-xs px-2 py-0.5">Best value</div>}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{coins}<span className="text-lg font-normal text-muted-foreground"> coins</span></div>
        <ul className="mt-3 text-sm space-y-1">
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-600 dark:text-teal-400" /> 1 coin = 1 NPR</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-600 dark:text-teal-400" /> No expiry</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-600 dark:text-teal-400" /> Book any pro</li>
        </ul>
        <Button className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors" onClick={onBuy}>Select</Button>
      </CardContent>
    </Card>
  )
}
