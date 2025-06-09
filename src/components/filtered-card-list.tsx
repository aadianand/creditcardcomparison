"use client"

import type { CreditCard } from "@/lib/data"
import CardItem from "./card-item"

interface FilteredCardListProps {
  cards: CreditCard[]
  filter: string
}

export default function FilteredCardList({ cards, filter }: FilteredCardListProps) {
  const filteredCards = cards.filter((card) => {
    switch (filter) {
      case "loungeAccess":
        return card.features.loungeAccess
      case "fuelSurchargeWaiver":
        return card.features.fuelSurchargeWaiver
      case "noAnnualFee":
        return card.annualFee === 0
      case "firstTimeUsers":
        return card.targetAudience.includes("First-time Users") || card.annualFee <= 1000
      default:
        return true
    }
  })

  if (filteredCards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No credit cards match the selected filter.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredCards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  )
}
