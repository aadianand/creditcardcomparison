import type { CreditCard } from "@/lib/data"
import { Check, X } from "lucide-react"
import Image from "next/image"

interface ComparisonTableProps {
  cards: CreditCard[]
}

interface FeatureConfig {
  key: string
  label: string
  format: (value: any) => string | number
}

export default function ComparisonTable({ cards }: ComparisonTableProps) {
  const features: FeatureConfig[] = [
    {
      key: "annualFee",
      label: "Annual Fee",
      format: (value: number) => (value === 0 ? "Free" : `₹${value.toLocaleString()}`),
    },
    {
      key: "joiningFee",
      label: "Joining Fee",
      format: (value: number) => (value === 0 ? "Free" : `₹${value.toLocaleString()}`),
    },
    { key: "rewardRate", label: "Reward Rate", format: (value: number) => `${value}x` },
    { key: "interestRate", label: "Interest Rate", format: (value: string) => value },
    { key: "creditLimit", label: "Credit Limit", format: (value: string) => value },
    { key: "loungeAccess", label: "Lounge Access", format: (value: boolean) => value.toString() },
    { key: "fuelSurchargeWaiver", label: "Fuel Surcharge Waiver", format: (value: boolean) => value.toString() },
    { key: "movieTickets", label: "Movie Offers", format: (value: boolean) => value.toString() },
    { key: "insuranceCover", label: "Insurance Cover", format: (value: boolean) => value.toString() },
    { key: "contactless", label: "Contactless Payment", format: (value: boolean) => value.toString() },
    { key: "emiOptions", label: "EMI Options", format: (value: boolean) => value.toString() },
  ]

  const getCashbackInfo = (card: CreditCard) => {
    const fuelBenefit = card.benefits.find(
      (b) => b.type === "Fuel Surcharge Waiver" || b.description.toLowerCase().includes("fuel"),
    )
    const diningBenefit = card.benefits.find(
      (b) => b.description.toLowerCase().includes("dining") || b.description.toLowerCase().includes("restaurant"),
    )
    const cashbackBenefit = card.benefits.find((b) => b.type === "Cashback")

    return {
      fuel: fuelBenefit?.value || (card.features.fuelSurchargeWaiver ? "1%" : "0%"),
      dining: diningBenefit?.value || cashbackBenefit?.value || "0%",
    }
  }

  const getMinIncome = (card: CreditCard) => {
    // Estimate based on card type and annual fee
    if (card.annualFee >= 10000) return "₹10,00,000"
    if (card.annualFee >= 5000) return "₹6,00,000"
    if (card.annualFee >= 2000) return "₹4,00,000"
    if (card.annualFee >= 500) return "₹2,00,000"
    return "₹1,80,000"
  }

  const getRating = (card: CreditCard) => {
    // Generate rating based on features and benefits
    let score = 3.0
    if (card.features.loungeAccess) score += 0.3
    if (card.features.fuelSurchargeWaiver) score += 0.2
    if (card.features.insuranceCover) score += 0.2
    if (card.annualFee === 0) score += 0.3
    if (card.rewardRate >= 5) score += 0.3
    if (card.benefits.length >= 4) score += 0.2
    return Math.min(5.0, score).toFixed(1)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-medium w-48">Feature</th>
            {cards.map((card) => (
              <th key={card.id} className="text-center p-4 min-w-[200px]">
                <div className="flex flex-col items-center gap-3">
                  <Image
                    src={card.bankLogo || "/placeholder.svg"}
                    alt={`${card.bank} logo`}
                    width={100}
                    height={50}
                    className="object-contain h-12 w-24 mx-auto"
                  />
                  <div className="text-center">
                    <div className="font-bold text-base">{card.name}</div>
                    <div className="text-sm text-muted-foreground">{card.bank}</div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.key} className="border-b hover:bg-muted/30">
              <td className="p-4 font-medium bg-muted/20">{feature.label}</td>
              {cards.map((card) => (
                <td key={card.id} className="p-4 text-center">
                  {feature.key === "loungeAccess" ||
                  feature.key === "fuelSurchargeWaiver" ||
                  feature.key === "movieTickets" ||
                  feature.key === "insuranceCover" ||
                  feature.key === "contactless" ||
                  feature.key === "emiOptions" ? (
                    card.features[feature.key as keyof typeof card.features] ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="font-medium">
                      {feature.format(
                        feature.key in card
                          ? (card as any)[feature.key]
                          : feature.key in card.features
                            ? (card.features as any)[feature.key]
                            : null,
                      )}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}

          {/* Additional comparison rows */}
          <tr className="border-b hover:bg-muted/30">
            <td className="p-4 font-medium bg-muted/20">Fuel Cashback</td>
            {cards.map((card) => (
              <td key={card.id} className="p-4 text-center font-medium">
                {getCashbackInfo(card).fuel}
              </td>
            ))}
          </tr>

          <tr className="border-b hover:bg-muted/30">
            <td className="p-4 font-medium bg-muted/20">Dining Cashback</td>
            {cards.map((card) => (
              <td key={card.id} className="p-4 text-center font-medium">
                {getCashbackInfo(card).dining}
              </td>
            ))}
          </tr>

          <tr className="border-b hover:bg-muted/30">
            <td className="p-4 font-medium bg-muted/20">Min Income</td>
            {cards.map((card) => (
              <td key={card.id} className="p-4 text-center font-medium">
                {getMinIncome(card)}
              </td>
            ))}
          </tr>

          <tr className="border-b hover:bg-muted/30">
            <td className="p-4 font-medium bg-muted/20">Rating</td>
            {cards.map((card) => (
              <td key={card.id} className="p-4 text-center font-medium">
                <span className="inline-flex items-center gap-1">
                  {getRating(card)}/5
                  <span className="text-yellow-500">★</span>
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
