import type { CreditCard } from "@/lib/data"
import { Check, X } from "lucide-react"
import Image from "next/image"

interface ComparisonTableProps {
  cards: CreditCard[]
}

interface FeatureConfig {
  key: string
  label: string
  format: (value: unknown) => string
  type: "number" | "string" | "boolean"
}

export default function ComparisonTable({ cards }: ComparisonTableProps) {
  const features: FeatureConfig[] = [
    {
      key: "annualFee",
      label: "Annual Fee",
      type: "number",
      format: (value: unknown) => {
        const numValue = value as number
        return numValue === 0 ? "Free" : `₹${numValue.toLocaleString()}`
      },
    },
    {
      key: "joiningFee",
      label: "Joining Fee",
      type: "number",
      format: (value: unknown) => {
        const numValue = value as number
        return numValue === 0 ? "Free" : `₹${numValue.toLocaleString()}`
      },
    },
    {
      key: "rewardRate",
      label: "Reward Rate",
      type: "number",
      format: (value: unknown) => `${value as number}x`,
    },
    {
      key: "interestRate",
      label: "Interest Rate",
      type: "string",
      format: (value: unknown) => value as string,
    },
    {
      key: "creditLimit",
      label: "Credit Limit",
      type: "string",
      format: (value: unknown) => value as string,
    },
    {
      key: "loungeAccess",
      label: "Lounge Access",
      type: "boolean",
      format: (value: unknown) => (value as boolean).toString(),
    },
    {
      key: "fuelSurchargeWaiver",
      label: "Fuel Surcharge Waiver",
      type: "boolean",
      format: (value: unknown) => (value as boolean).toString(),
    },
    {
      key: "movieTickets",
      label: "Movie Offers",
      type: "boolean",
      format: (value: unknown) => (value as boolean).toString(),
    },
    {
      key: "insuranceCover",
      label: "Insurance Cover",
      type: "boolean",
      format: (value: unknown) => (value as boolean).toString(),
    },
    {
      key: "contactless",
      label: "Contactless Payment",
      type: "boolean",
      format: (value: unknown) => (value as boolean).toString(),
    },
    {
      key: "emiOptions",
      label: "EMI Options",
      type: "boolean",
      format: (value: unknown) => (value as boolean).toString(),
    },
  ]

  const getCashbackInfo = (card: CreditCard) => {
    const fuelBenefit = card.benefits.find((b) => b.description.toLowerCase().includes("fuel"))
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

  const getFeatureValue = (card: CreditCard, feature: FeatureConfig): unknown => {
    if (feature.type === "boolean") {
      return (card.features as Record<string, boolean>)[feature.key]
    }

    // Handle specific card properties safely
    switch (feature.key) {
      case "annualFee":
        return card.annualFee
      case "joiningFee":
        return card.joiningFee
      case "rewardRate":
        return card.rewardRate
      case "interestRate":
        return card.interestRate
      case "creditLimit":
        return card.creditLimit
      default:
        return (card as unknown as Record<string, unknown>)[feature.key]
    }
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
                  {feature.type === "boolean" ? (
                    (card.features as Record<string, boolean>)[feature.key] ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="font-medium">{feature.format(getFeatureValue(card, feature))}</span>
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
