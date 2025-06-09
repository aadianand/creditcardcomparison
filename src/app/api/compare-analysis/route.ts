import { NextResponse } from "next/server"
import type { CreditCard } from "@/lib/data"

export async function POST(req: Request) {
  try {
    const { cards }: { cards: CreditCard[] } = await req.json()

    // Try to use OpenAI if available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")) {
      try {
        const { generateText } = await import("ai")
        const { openai } = await import("@ai-sdk/openai")

        const cardsData = cards.map((card) => ({
          name: card.name,
          bank: card.bank,
          annualFee: card.annualFee,
          joiningFee: card.joiningFee,
          rewardRate: card.rewardRate,
          features: card.features,
          benefits: card.benefits,
          targetAudience: card.targetAudience,
        }))

        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          system: `You are a credit card expert analyzing and comparing Indian credit cards. 
          Provide a comprehensive comparison analysis in the following format:

          **CREDIT CARD COMPARISON ANALYSIS**

          💰 **COST COMPARISON:**
          • [Card Name]: Annual Fee [amount], Joining Fee [amount]

          🎁 **REWARDS & CASHBACK:**
          • [Card Name]: Up to [X]% cashback (Fuel: [X]%, Dining: [X]%)

          ✈️ **KEY BENEFITS:**
          • [Card Name]: ✓/✗ [benefit], ✓/✗ [benefit]

          👥 **ELIGIBILITY:**
          • [Card Name]: Min Income [amount], Credit Score [range]

          🎯 **RECOMMENDATIONS:**
          • For [use case]: [Card Name] [reason]

          Be specific, accurate, and helpful. Focus on practical differences that matter to users.`,
          prompt: `Compare these Indian credit cards and provide detailed analysis: ${JSON.stringify(cardsData, null, 2)}`,
        })

        return NextResponse.json({ analysis: text })
      } catch (error) {
        console.log("OpenAI failed, using fallback analysis")
      }
    }

    // Fallback analysis if OpenAI is not available
    const fallbackAnalysis = generateFallbackAnalysis(cards)
    return NextResponse.json({ analysis: fallbackAnalysis })
  } catch (error) {
    console.error("Error generating analysis:", error)
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 })
  }
}

function generateFallbackAnalysis(cards: CreditCard[]) {
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
