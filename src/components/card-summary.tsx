import type { CreditCard } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"

interface CardSummaryProps {
  card: CreditCard
}

export default function CardSummary({ card }: CardSummaryProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-4">
        <p className="text-sm">
          {card.summary ||
            `The ${card.name} from ${card.bank} is a ${card.targetAudience.join(", ").toLowerCase()} credit card with ${card.features.loungeAccess ? "airport lounge access" : "no lounge access"} and ${card.annualFee === 0 ? "no annual fee" : `an annual fee of ₹${card.annualFee}`}.`}
        </p>
      </CardContent>
    </Card>
  )
}
