"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { CreditCard } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface CompareSelectorProps {
  allCards: CreditCard[]
  selectedCards: CreditCard[]
}

export default function CompareSelector({ allCards, selectedCards }: CompareSelectorProps) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedCards.map((card) => card.id))

  const handleCardToggle = (cardId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId)
      } else {
        return [...prev, cardId]
      }
    })
  }

  const handleCompare = () => {
    if (selectedIds.length >= 2) {
      router.push(`/compare?cards=${selectedIds.join(",")}`)
    }
  }

  const handleClear = () => {
    setSelectedIds([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Select Cards to Compare ({selectedIds.length} selected)</span>
            <div className="flex gap-2">
              {selectedIds.length > 0 && (
                <Button variant="outline" onClick={handleClear} size="sm">
                  Clear All
                </Button>
              )}
              {selectedIds.length >= 2 && (
                <Button onClick={handleCompare} size="sm">
                  Compare {selectedIds.length} Cards
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCards.map((card) => (
              <div
                key={card.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedIds.includes(card.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleCardToggle(card.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox checked={selectedIds.includes(card.id)} className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={card.bankLogo || "/placeholder.svg"}
                        alt={`${card.bank} logo`}
                        width={40}
                        height={20}
                        className="object-contain h-6 w-12"
                      />
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm truncate">{card.name}</h3>
                        <p className="text-xs text-muted-foreground">{card.bank}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Annual Fee: {card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}</span>
                      <span>Rewards: {card.rewardRate}x</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {card.features.loungeAccess && (
                        <Badge variant="outline" className="text-xs">
                          Lounge
                        </Badge>
                      )}
                      {card.features.fuelSurchargeWaiver && (
                        <Badge variant="outline" className="text-xs">
                          Fuel
                        </Badge>
                      )}
                      {card.annualFee === 0 && (
                        <Badge variant="outline" className="text-xs">
                          Free
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
