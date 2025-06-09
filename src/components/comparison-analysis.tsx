"use client"

import { useState, useEffect, useCallback } from "react"
import type { CreditCard } from "@/lib/data"

interface ComparisonAnalysisProps {
  cards: CreditCard[]
}

export default function ComparisonAnalysis({ cards }: ComparisonAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  const generateAnalysis = useCallback(async () => {
    setIsLoading(true)

    try {
      // Try to use AI if available
      const response = await fetch("/api/compare-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards }),
      })

      if (response.ok) {
        const data = await response.json()
        setAnalysis(data.analysis)
        setIsLoading(false)
        return
      }
    } catch (err) {
      console.log("AI analysis failed, using fallback")
    }

    // Fallback analysis
    const fallbackAnalysis = generateFallbackAnalysis(cards)
    setAnalysis(fallbackAnalysis)
    setIsLoading(false)
  }, [cards])

  useEffect(() => {
    generateAnalysis()
  }, [generateAnalysis])

  const generateFallbackAnalysis = (cards: CreditCard[]) => {
    const sortedByFee = [...cards].sort((a, b) => a.annualFee - b.annualFee)
    const sortedByRewards = [...cards].sort((a, b) => b.rewardRate - a.rewardRate)
    const loungeCards = cards.filter((card) => card.features.loungeAccess)
    const freeCards = cards.filter((card) => card.annualFee === 0)

    let analysis = "**CREDIT CARD COMPARISON ANALYSIS**\n\n"

    // Cost Comparison
    analysis += "💰 **COST COMPARISON:**\n"
    cards.forEach((card) => {
      analysis += `• ${card.bank} ${card.name}: Annual Fee ${card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}, Joining Fee ${card.joiningFee === 0 ? "Free" : `₹${card.joiningFee.toLocaleString()}`}\n`
    })
    analysis += "\n"

    // Rewards & Cashback
    analysis += "🎁 **REWARDS & CASHBACK:**\n"
    cards.forEach((card) => {
      const fuelBenefit = card.benefits.find((b) => b.description.toLowerCase().includes("fuel"))
      const cashbackBenefit = card.benefits.find((b) => b.type === "Cashback")
      const fuelRate = fuelBenefit?.value || (card.features.fuelSurchargeWaiver ? "1%" : "0%")
      const diningRate = cashbackBenefit?.value || card.rewardRate + "%"

      analysis += `• ${card.bank} ${card.name}: Up to ${card.rewardRate}% cashback (Fuel: ${fuelRate}, Dining: ${diningRate})\n`
    })
    analysis += "\n"

    // Key Benefits
    analysis += "✈️ **KEY BENEFITS:**\n"
    cards.forEach((card) => {
      const benefits = []
      if (card.features.loungeAccess) benefits.push("✓ Lounge Access")
      else benefits.push("✗ No Lounge Access")

      if (card.features.fuelSurchargeWaiver) benefits.push("✓ Fuel Benefits")
      else benefits.push("✗ No Fuel Benefits")

      if (card.features.movieTickets) benefits.push("✓ Movie Offers")
      if (card.features.insuranceCover) benefits.push("✓ Insurance Cover")

      analysis += `• ${card.bank} ${card.name}: ${benefits.join(", ")}\n`
    })
    analysis += "\n"

    // Eligibility
    analysis += "👥 **ELIGIBILITY:**\n"
    cards.forEach((card) => {
      const minIncome =
        card.annualFee >= 10000
          ? "₹10,00,000"
          : card.annualFee >= 5000
            ? "₹6,00,000"
            : card.annualFee >= 2000
              ? "₹4,00,000"
              : "₹2,00,000"
      const creditScore = card.annualFee >= 5000 ? "750+" : card.annualFee >= 1000 ? "700+" : "650+"

      analysis += `• ${card.bank} ${card.name}: Min Income ${minIncome}, Credit Score ${creditScore}\n`
    })
    analysis += "\n"

    // Recommendations
    analysis += "🎯 **RECOMMENDATIONS:**\n"

    if (loungeCards.length > 0) {
      const bestLounge = loungeCards.reduce((best, card) =>
        card.features.loungeAccess && card.annualFee < best.annualFee ? card : best,
      )
      analysis += `• For premium benefits: ${bestLounge.bank} ${bestLounge.name} provides exclusive privileges and lounge access\n`
    }

    const bestRewards = sortedByRewards[0]
    analysis += `• For maximum rewards: ${bestRewards.bank} ${bestRewards.name} offers the highest reward rates\n`

    if (freeCards.length > 0) {
      const bestFree = freeCards.reduce((best, card) => (card.rewardRate > best.rewardRate ? card : best))
      analysis += `• For cost-conscious users: ${bestFree.bank} ${bestFree.name} offers great value with no annual fee\n`
    }

    const cheapest = sortedByFee[0]
    if (cheapest.annualFee > 0) {
      analysis += `• For lowest cost: ${cheapest.bank} ${cheapest.name} has the most affordable annual fee\n`
    }

    return analysis
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <div className="whitespace-pre-line text-sm leading-relaxed font-mono bg-muted/30 p-4 rounded-lg">{analysis}</div>
    </div>
  )
}
