import { NextResponse } from "next/server"
import { getAllCards } from "@/lib/data"
import type { CreditCard, CardBenefit } from "@/lib/data"

// Enhanced AI response function that provides comprehensive answers without UI changes
function generateComprehensiveResponse(message: string, cards: CreditCard[]) {
  const lowerMessage = message.toLowerCase()

  // Helper function to format card information
  const formatCardInfo = (card: CreditCard, includeDetails = true) => {
    const benefits = card.benefits
      .slice(0, 3)
      .map((b: CardBenefit) => `${b.type}: ${b.description}`)
      .join(", ")
    const features = []
    if (card.features.loungeAccess) features.push("Lounge Access")
    if (card.features.fuelSurchargeWaiver) features.push("Fuel Surcharge Waiver")
    if (card.features.movieTickets) features.push("Movie Offers")
    if (card.features.insuranceCover) features.push("Insurance Cover")

    return `**${card.bank} ${card.name}**
• Annual Fee: ${card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
• Joining Fee: ${card.joiningFee === 0 ? "Free" : `₹${card.joiningFee.toLocaleString()}`}
• Reward Rate: ${card.rewardRate}x points per transaction
• Credit Limit: ${card.creditLimit}
• Interest Rate: ${card.interestRate}
${
  includeDetails
    ? `• Key Features: ${features.join(", ") || "Standard features"}
• Top Benefits: ${benefits}
• Best For: ${card.targetAudience.join(", ")}`
    : ""
}`
  }

  // Enhanced keyword matching
  const containsKeywords = (keywords: string[]) => {
    return keywords.some((keyword) => lowerMessage.includes(keyword))
  }

  // Handle specific bank queries
  if (containsKeywords(["hdfc", "hdfc bank"])) {
    const hdfcCards = cards.filter((card) => card.bank.toLowerCase().includes("hdfc"))
    return {
      response: `🏦 **HDFC Bank Credit Cards**

HDFC Bank offers ${hdfcCards.length} excellent credit cards in our database:

${hdfcCards.map((card) => formatCardInfo(card)).join("\n\n")}

**HDFC Bank Overview:**
HDFC Bank is one of India's leading private sector banks, known for premium credit cards with excellent rewards and customer service. Their cards are popular among professionals and frequent travelers.

**Why Choose HDFC Cards:**
• Excellent customer service and support
• Wide acceptance across India and internationally
• Premium lifestyle benefits and offers
• Strong reward programs and cashback options

Would you like me to compare specific HDFC cards or help you choose between them?`,
    }
  }

  // Handle Axis Bank queries
  if (containsKeywords(["axis", "axis bank"])) {
    const axisCards = cards.filter((card) => card.bank.toLowerCase().includes("axis"))
    return {
      response: `🏦 **Axis Bank Credit Cards**

Axis Bank provides ${axisCards.length} premium credit cards:

${axisCards.map((card) => formatCardInfo(card)).join("\n\n")}

**Axis Bank Overview:**
Axis Bank is known for its innovative credit card products, especially the Magnus series which offers premium benefits for high spenders. They focus on lifestyle and travel benefits.

**Why Choose Axis Cards:**
• Innovative reward programs with high earning rates
• Excellent travel and lifestyle benefits
• Premium lounge access and concierge services
• Strong partnerships with luxury brands

Need help deciding between Axis cards or comparing with other banks?`,
    }
  }

  // Handle SBI queries
  if (containsKeywords(["sbi", "sbi card", "state bank"])) {
    const sbiCards = cards.filter((card) => card.bank.toLowerCase().includes("sbi"))
    return {
      response: `🏦 **SBI Card Credit Cards**

SBI Card offers ${sbiCards.length} diverse credit card options:

${sbiCards.map((card) => formatCardInfo(card)).join("\n\n")}

**SBI Card Overview:**
SBI Card is India's largest credit card issuer, offering cards for every segment from students to premium customers. They're known for their wide acceptance and reliable service.

**Why Choose SBI Cards:**
• Largest network and acceptance in India
• Cards for every income segment
• Competitive annual fees and charges
• Strong online shopping partnerships

Want to know more about any specific SBI card or compare with other options?`,
    }
  }

  // Handle ICICI queries
  if (containsKeywords(["icici", "icici bank"])) {
    const iciciCards = cards.filter((card) => card.bank.toLowerCase().includes("icici"))
    return {
      response: `��� **ICICI Bank Credit Cards**

ICICI Bank features ${iciciCards.length} popular credit cards:

${iciciCards.map((card) => formatCardInfo(card)).join("\n\n")}

**ICICI Bank Overview:**
ICICI Bank is a pioneer in digital banking and offers innovative credit card products. They're particularly strong in online shopping partnerships and cashback offers.

**Why Choose ICICI Cards:**
• Strong digital banking platform
• Excellent online shopping partnerships (Amazon, etc.)
• Competitive cashback and reward rates
• Good customer service and mobile app

Would you like detailed information about any ICICI card or comparisons?`,
    }
  }

  // Handle lounge access queries
  if (containsKeywords(["lounge", "airport lounge", "lounge access", "priority pass"])) {
    const loungeCards = cards.filter((card) => card.features.loungeAccess)
    return {
      response: `✈️ **Credit Cards with Airport Lounge Access**

I found ${loungeCards.length} cards that offer complimentary airport lounge access:

${loungeCards
  .map((card) => {
    const loungeInfo = card.benefits.find((b: CardBenefit) => b.type === "Lounge Access")
    return `**${card.bank} ${card.name}**
• Annual Fee: ${card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
• Lounge Access: ${loungeInfo?.value || "Available"}
• Additional Benefits: ${card.features.fuelSurchargeWaiver ? "Fuel Surcharge Waiver" : ""} ${card.features.movieTickets ? "Movie Offers" : ""} ${card.features.insuranceCover ? "Insurance Cover" : ""}
• Best For: ${card.targetAudience.join(", ")}`
  })
  .join("\n\n")}

**About Airport Lounge Access:**
Airport lounges provide a comfortable space to relax before flights with complimentary food, beverages, Wi-Fi, and quiet environment. This benefit is especially valuable for frequent travelers.

**Tips for Using Lounge Access:**
• Check if the card covers domestic and/or international lounges
• Some cards have visit limits per year
• Priority Pass is the most widely accepted lounge network
• Always carry your credit card for lounge entry

Need help choosing the best lounge access card for your travel needs?`,
    }
  }

  // Handle student/beginner queries
  if (containsKeywords(["student", "beginner", "first time", "new user", "college", "university", "young"])) {
    const studentCards = cards.filter(
      (card) =>
        card.targetAudience.includes("First-time Users") ||
        card.targetAudience.includes("Students") ||
        card.annualFee <= 1000,
    )
    return {
      response: `🎓 **Best Credit Cards for Students & Beginners**

Perfect for students and first-time credit card users! Here are ${studentCards.length} excellent options:

${studentCards.map((card) => formatCardInfo(card)).join("\n\n")}

**Why These Cards Are Perfect for Students:**
• Low or no annual fees to minimize costs
• Easy approval process for limited credit history
• Good reward rates to start building benefits
• Educational resources and customer support

**Tips for First-Time Credit Card Users:**
• Always pay your full balance on time to avoid interest
• Keep your credit utilization below 30% of the limit
• Use the card regularly but responsibly to build credit history
• Set up automatic payments to never miss due dates
• Monitor your credit score regularly

**Building Credit History:**
Starting with these cards helps establish a positive credit history, which is crucial for future loans, higher credit limits, and premium cards.

Would you like specific advice on which card would be best for your situation?`,
    }
  }

  // Handle fuel-related queries
  if (containsKeywords(["fuel", "petrol", "gas", "fuel surcharge", "fuel waiver", "fuel cashback"])) {
    const fuelCards = cards.filter((card) => card.features.fuelSurchargeWaiver)
    return {
      response: `⛽ **Credit Cards with Fuel Benefits**

Save money on every fuel purchase with these ${fuelCards.length} cards:

${fuelCards
  .map((card) => {
    const fuelBenefit = card.benefits.find((b: CardBenefit) => b.description.toLowerCase().includes("fuel"))
    return `**${card.bank} ${card.name}**
• Annual Fee: ${card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
• Fuel Benefit: ${fuelBenefit?.description || "Fuel surcharge waiver available"}
• Fuel Savings: ${fuelBenefit?.value || "1% surcharge waiver"}
• Additional Features: ${card.features.loungeAccess ? "Lounge Access" : ""} ${card.features.movieTickets ? "Movie Offers" : ""}`
  })
  .join("\n\n")}

**Understanding Fuel Surcharge Waiver:**
When you pay for fuel using credit cards, petrol pumps typically charge a 1% surcharge. Cards with fuel surcharge waiver eliminate this extra cost, effectively giving you a 1% discount on fuel.

**How Fuel Benefits Work:**
• Surcharge waiver applies to transactions within specified limits (usually ₹400-₹5,000)
• Some cards offer additional cashback on fuel purchases
• Benefits typically apply at all fuel stations across India
• Monthly caps may apply on the waiver amount

**Calculating Your Savings:**
If you spend ₹5,000 monthly on fuel, a 1% waiver saves you ₹600 annually, which can offset the annual fee of many cards!

Want to calculate potential savings based on your fuel spending?`,
    }
  }

  // Handle free/no annual fee queries
  if (containsKeywords(["free", "no annual fee", "no fee", "zero fee", "without fee", "lifetime free"])) {
    const freeCards = cards.filter((card) => card.annualFee === 0)
    return {
      response: `💰 **Credit Cards with No Annual Fee**

Enjoy premium benefits without yearly charges! Here are ${freeCards.length} excellent free cards:

${freeCards.map((card) => formatCardInfo(card)).join("\n\n")}

**Benefits of No Annual Fee Cards:**
• No yearly charges means more money in your pocket
• Perfect for occasional credit card users
• Great for building credit history without costs
• Many offer excellent rewards and cashback

**Things to Consider:**
• While annual fee is free, other charges may apply (late payment, overlimit, etc.)
• Some cards waive annual fee based on spending thresholds
• Free cards can still offer premium benefits like rewards and offers
• Always read terms and conditions for any hidden charges

**Maximizing Value from Free Cards:**
• Use them for specific categories where they offer highest rewards
• Take advantage of welcome bonuses and promotional offers
• Combine with other cards for comprehensive coverage
• Pay bills and make regular purchases to earn rewards

These cards prove that you don't need to pay annual fees to enjoy great credit card benefits!

Need help choosing the best free card for your spending pattern?`,
    }
  }

  // Handle cashback queries
  if (containsKeywords(["cashback", "cash back", "money back", "rewards", "earning", "points"])) {
    const cashbackCards = cards.filter(
      (card) =>
        card.benefits.some((benefit: CardBenefit) => benefit.type === "Cashback") ||
        card.name.toLowerCase().includes("cashback") ||
        card.name.toLowerCase().includes("amazon") ||
        card.name.toLowerCase().includes("millennia"),
    )
    return {
      response: `💸 **Best Cashback & Rewards Credit Cards**

Earn money back on every purchase with these ${cashbackCards.length} high-earning cards:

${cashbackCards
  .map((card) => {
    const cashbackBenefit = card.benefits.find((b: CardBenefit) => b.type === "Cashback")
    const rewardBenefit = card.benefits.find((b: CardBenefit) => b.type === "Reward Points")
    return `**${card.bank} ${card.name}**
• Annual Fee: ${card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
• Cashback/Rewards: ${cashbackBenefit?.description || rewardBenefit?.description || `${card.rewardRate}x reward points`}
• Best Categories: ${card.targetAudience.includes("Online Shoppers") ? "Online Shopping" : ""} ${card.features.fuelSurchargeWaiver ? "Fuel" : ""} ${card.features.movieTickets ? "Entertainment" : ""}
• Target Users: ${card.targetAudience.join(", ")}`
  })
  .join("\n\n")}

**Understanding Cashback vs Reward Points:**
• **Cashback:** Direct money credited to your account (e.g., 2% cashback = ₹2 for every ₹100 spent)
• **Reward Points:** Points that can be redeemed for various benefits, travel, or cash
• **Conversion:** Typically 1 reward point = ₹0.20 to ₹0.25

**Maximizing Cashback Earnings:**
• Use specific cards for their best categories (online shopping, fuel, dining)
• Take advantage of promotional offers and bonus categories
• Pay annual fees only if your earnings exceed the fee
• Combine multiple cards for different spending categories

**Annual Earning Potential:**
With smart usage, you can earn 2-5% back on your spending, potentially saving thousands annually!

Want help calculating potential earnings based on your spending pattern?`,
    }
  }

  // Handle online shopping queries
  if (containsKeywords(["online", "shopping", "e-commerce", "amazon", "flipkart", "internet shopping"])) {
    const onlineCards = cards.filter(
      (card) =>
        card.name.toLowerCase().includes("amazon") ||
        card.name.toLowerCase().includes("flipkart") ||
        card.name.toLowerCase().includes("click") ||
        card.name.toLowerCase().includes("millennia") ||
        card.targetAudience.includes("Online Shoppers"),
    )
    return {
      response: `🛒 **Best Credit Cards for Online Shopping**

Shop online and earn maximum rewards with these ${onlineCards.length} cards:

${onlineCards
  .map((card) => {
    const onlineBenefit = card.benefits.find(
      (b: CardBenefit) =>
        b.description.toLowerCase().includes("online") ||
        b.description.toLowerCase().includes("amazon") ||
        b.description.toLowerCase().includes("flipkart"),
    )
    return `**${card.bank} ${card.name}**
• Annual Fee: ${card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
• Online Benefits: ${onlineBenefit?.description || `${card.rewardRate}x rewards on online spending`}
• Special Offers: ${card.offers.map((o) => o.title).join(", ")}
• Perfect For: ${card.targetAudience.join(", ")}`
  })
  .join("\n\n")}

**Why These Cards Excel for Online Shopping:**
• Higher reward rates specifically for e-commerce platforms
• Special partnerships with major online retailers
• Exclusive discounts and promotional offers
• EMI options for large purchases

**Top Online Shopping Platforms Covered:**
• Amazon India - Special cashback and Prime benefits
• Flipkart - Exclusive offers and instant discounts
• Myntra - Fashion and lifestyle discounts
• BookMyShow - Movie and event ticket offers

**Online Shopping Tips:**
• Check for platform-specific offers before purchasing
• Use EMI options for expensive items to manage cash flow
• Look for seasonal sales and festival offers
• Combine credit card offers with platform discounts for maximum savings

**Security for Online Shopping:**
• Always shop on secure websites (https://)
• Use virtual card numbers when available
• Monitor transactions regularly
• Report suspicious activity immediately

Ready to maximize your online shopping rewards?`,
    }
  }

  // Handle comparison queries
  if (containsKeywords(["compare", "vs", "versus", "difference", "between", "comparison"])) {
    // Extract specific card names if mentioned
    const mentionedCards = cards.filter(
      (card: CreditCard) =>
        lowerMessage.includes(card.name.toLowerCase()) || lowerMessage.includes(card.bank.toLowerCase()),
    )

    if (mentionedCards.length >= 2) {
      const card1 = mentionedCards[0]
      const card2 = mentionedCards[1]

      return {
        response: `🔍 **Detailed Comparison: ${card1.bank} ${card1.name} vs ${card2.bank} ${card2.name}**

**${card1.bank} ${card1.name}:**
• Annual Fee: ${card1.annualFee === 0 ? "Free" : `₹${card1.annualFee.toLocaleString()}`}
• Joining Fee: ${card1.joiningFee === 0 ? "Free" : `₹${card1.joiningFee.toLocaleString()}`}
• Reward Rate: ${card1.rewardRate}x points
• Credit Limit: ${card1.creditLimit}
• Key Features: ${card1.features.loungeAccess ? "✓ Lounge Access" : "✗ No Lounge"} | ${card1.features.fuelSurchargeWaiver ? "✓ Fuel Waiver" : "✗ No Fuel Waiver"} | ${card1.features.movieTickets ? "✓ Movie Offers" : "✗ No Movie Offers"}
• Target Audience: ${card1.targetAudience.join(", ")}

**${card2.bank} ${card2.name}:**
• Annual Fee: ${card2.annualFee === 0 ? "Free" : `₹${card2.annualFee.toLocaleString()}`}
• Joining Fee: ${card2.joiningFee === 0 ? "Free" : `₹${card2.joiningFee.toLocaleString()}`}
• Reward Rate: ${card2.rewardRate}x points
• Credit Limit: ${card2.creditLimit}
• Key Features: ${card2.features.loungeAccess ? "✓ Lounge Access" : "✗ No Lounge"} | ${card2.features.fuelSurchargeWaiver ? "✓ Fuel Waiver" : "✗ No Fuel Waiver"} | ${card2.features.movieTickets ? "✓ Movie Offers" : "✗ No Movie Offers"}
• Target Audience: ${card2.targetAudience.join(", ")}

**Key Differences:**
• **Cost:** ${card1.name} costs ${card1.annualFee === 0 ? "nothing" : `₹${card1.annualFee.toLocaleString()}`} annually vs ${card2.name} at ${card2.annualFee === 0 ? "free" : `₹${card2.annualFee.toLocaleString()}`}
• **Rewards:** ${card1.name} offers ${card1.rewardRate}x vs ${card2.name} at ${card2.rewardRate}x
• **Premium Features:** ${card1.features.loungeAccess && !card2.features.loungeAccess ? `${card1.name} has lounge access advantage` : card2.features.loungeAccess && !card1.features.loungeAccess ? `${card2.name} has lounge access advantage` : "Both similar in premium features"}

**My Recommendation:**
${card1.annualFee < card2.annualFee ? `Choose ${card1.name} if you want lower costs` : `Choose ${card2.name} if you want lower costs`}
${card1.rewardRate > card2.rewardRate ? `Choose ${card1.name} if you want higher rewards` : `Choose ${card2.name} if you want higher rewards`}
${card1.features.loungeAccess && !card2.features.loungeAccess ? `Choose ${card1.name} if you travel frequently` : card2.features.loungeAccess && !card1.features.loungeAccess ? `Choose ${card2.name} if you travel frequently` : ""}

Need help deciding based on your specific needs and spending pattern?`,
      }
    }

    // General comparison advice
    return {
      response: `🔍 **Credit Card Comparison Guide**

I can help you compare any credit cards! Here are all the cards available for comparison:

${cards
  .map(
    (card: CreditCard, index: number) =>
      `${index + 1}. **${card.bank} ${card.name}** - ₹${card.annualFee === 0 ? "Free" : card.annualFee.toLocaleString()} annual fee, ${card.rewardRate}x rewards`,
  )
  .join("\n")}

**How to Compare Credit Cards:**

**1. Cost Analysis:**
• Annual and joining fees
• Interest rates and other charges
• Fee waiver conditions

**2. Rewards & Benefits:**
• Reward rates for different categories
• Cashback percentages
• Welcome bonuses and milestone benefits

**3. Features & Services:**
• Airport lounge access
• Fuel surcharge waiver
• Movie and dining offers
• Insurance coverage

**4. Acceptance & Convenience:**
• Network coverage (Visa/Mastercard)
• Online and offline acceptance
• Mobile app and digital features

**5. Target Suitability:**
• Income requirements
• Spending patterns
• Lifestyle preferences

**Popular Comparisons:**
• HDFC Regalia vs Axis Magnus (Premium travel cards)
• Amazon Pay vs Flipkart Card (Online shopping)
• SBI SimplyCLICK vs HDFC Millennia (Digital lifestyle)

Tell me which specific cards you'd like me to compare, and I'll provide a detailed analysis!`,
    }
  }

  // Handle travel-related queries
  if (containsKeywords(["travel", "traveling", "trip", "vacation", "holiday", "flight", "hotel"])) {
    const travelCards = cards.filter(
      (card) => card.targetAudience.includes("Travel") || card.features.loungeAccess || card.features.insuranceCover,
    )
    return {
      response: `✈️ **Best Credit Cards for Travel**

Make your travels more rewarding and comfortable with these ${travelCards.length} travel-focused cards:

${travelCards
  .map((card) => {
    const travelBenefits = []
    if (card.features.loungeAccess) travelBenefits.push("Airport Lounge Access")
    if (card.features.insuranceCover) travelBenefits.push("Travel Insurance")
    if (card.features.fuelSurchargeWaiver) travelBenefits.push("Fuel Savings")

    return `**${card.bank} ${card.name}**
• Annual Fee: ${card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
• Travel Benefits: ${travelBenefits.join(", ") || "Standard travel features"}
• Reward Rate: ${card.rewardRate}x points on travel spending
• Additional Perks: ${card.offers
      .map((o) => o.title)
      .slice(0, 2)
      .join(", ")}
• Best For: ${card.targetAudience.join(", ")}`
  })
  .join("\n\n")}

**Why These Cards Are Perfect for Travelers:**

**Airport Lounge Access:**
• Comfortable waiting areas with complimentary food and drinks
• Free Wi-Fi and charging stations
• Quiet environment away from crowded terminals
• Available at domestic and international airports

**Travel Insurance Benefits:**
• Coverage for trip cancellations and delays
• Lost baggage protection
• Medical emergency coverage abroad
• 24/7 travel assistance hotline

**Additional Travel Perks:**
• Priority check-in and boarding (with some premium cards)
• Hotel and car rental discounts
• Foreign exchange rate benefits
• No foreign transaction fees (varies by card)

**Travel Reward Strategies:**
• Use travel cards for all trip-related expenses
• Book flights and hotels through card portals for bonus points
• Take advantage of seasonal travel offers
• Combine points across different spending categories

**International Travel Tips:**
• Inform your bank about travel plans to avoid card blocks
• Carry backup payment methods
• Understand foreign transaction fees
• Use airport lounges to enhance travel experience

Planning a trip? Let me help you choose the perfect travel companion card!`,
    }
  }

  // Handle premium/luxury queries
  if (containsKeywords(["premium", "luxury", "high end", "elite", "exclusive", "super premium"])) {
    const premiumCards = cards.filter(
      (card) =>
        card.targetAudience.includes("Premium") ||
        card.targetAudience.includes("Super Premium") ||
        card.targetAudience.includes("Luxury") ||
        card.annualFee >= 2500,
    )
    return {
      response: `👑 **Premium & Luxury Credit Cards**

Experience the finest in credit card benefits with these ${premiumCards.length} premium options:

${premiumCards.map((card) => formatCardInfo(card)).join("\n\n")}

**What Makes These Cards Premium:**

**Exclusive Benefits:**
• Unlimited or extensive airport lounge access
• Concierge services for travel and lifestyle needs
• Priority customer service with dedicated relationship managers
• Exclusive event invitations and experiences

**Luxury Partnerships:**
• Premium hotel and resort privileges
• Fine dining restaurant discounts and reservations
• Luxury brand shopping offers and early access
• Golf course access and privileges

**Enhanced Rewards:**
• Higher earning rates on premium spending categories
• Accelerated points on luxury purchases
• Milestone bonuses for high spending
• Premium redemption options including travel and experiences

**Travel & Lifestyle:**
• Comprehensive travel insurance coverage
• Airport transfer services and priority services
• Spa and wellness center access
• Personal shopping and lifestyle assistance

**Investment in Premium Cards:**
While these cards have higher annual fees, they're designed for high spenders who can maximize the benefits. The key is ensuring your spending and lifestyle align with the card's offerings.

**ROI Calculation:**
• Premium cards typically require ₹5-10 lakhs annual spending to justify fees
• Benefits often exceed annual fees for frequent travelers
• Lifestyle perks add intangible value beyond monetary benefits

**Who Should Consider Premium Cards:**
• Frequent business and leisure travelers
• High-income professionals with substantial spending
• Individuals who value luxury experiences and convenience
• Those who can utilize multiple card benefits regularly

Ready to elevate your credit card experience to premium status?`,
    }
  }

  // Default comprehensive response
  return {
    response: `👋 **Welcome to CardCompare India!**

I'm your AI assistant with comprehensive knowledge of all ${cards.length} credit cards in our database. I can help you with detailed information about:

**Available Credit Cards by Bank:**
🏦 **HDFC Bank:** ${cards.filter((c: CreditCard) => c.bank.includes("HDFC")).length} cards (Regalia, Millennia)
🏦 **Axis Bank:** ${cards.filter((c: CreditCard) => c.bank.includes("Axis")).length} cards (Magnus, Flipkart)
🏦 **SBI Card:** ${cards.filter((c: CreditCard) => c.bank.includes("SBI")).length} cards (ELITE, SimplyCLICK)
🏦 **ICICI Bank:** ${cards.filter((c: CreditCard) => c.bank.includes("ICICI")).length} cards (Amazon Pay, Coral)

**What I Can Help You With:**

🎯 **Specific Queries:**
• "Tell me about HDFC Regalia card"
• "Which cards have lounge access?"
• "Best cards for students"
• "Compare Axis Magnus vs HDFC Regalia"
• "Cards with no annual fee"

💡 **Detailed Analysis:**
• Complete card features and benefits
• Annual fees, joining fees, and charges
• Reward rates and cashback percentages
• Eligibility criteria and target audience
• Pros and cons of each card

🔍 **Smart Comparisons:**
• Side-by-side feature comparisons
• Cost-benefit analysis
• Recommendations based on your needs
• Best cards for specific use cases

📊 **Categories I Cover:**
• Student and beginner-friendly cards
• Premium and luxury cards
• Travel-focused cards with lounge access
• Cashback and rewards cards
• Online shopping specialist cards
• Fuel surcharge waiver cards
• Zero annual fee cards

**Just ask me anything!** I understand natural language, so you can ask questions like:
• "What's the best card for someone who travels a lot?"
• "I'm a student, which card should I get?"
• "Show me all free credit cards"
• "Which bank has the best premium cards?"

What would you like to know about credit cards today? 🤔`,
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const cards = await getAllCards()

    // Convert cards to a simplified format for AI processing - include all required properties
    const cardsContext = cards.map((card) => ({
      id: card.id,
      name: card.name,
      bank: card.bank,
      bankLogo: card.bankLogo,
      cardImage: card.cardImage,
      annualFee: card.annualFee,
      joiningFee: card.joiningFee,
      rewardRate: card.rewardRate,
      creditLimit: card.creditLimit,
      interestRate: card.interestRate,
      features: card.features,
      targetAudience: card.targetAudience,
      benefits: card.benefits,
      offers: card.offers,
      summary: card.summary,
    }))

    let result

    // Try to use OpenAI if available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")) {
      try {
        const { generateText } = await import("ai")
        const { openai } = await import("@ai-sdk/openai")

        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          system: `You are an expert AI assistant for CardCompare India, a comprehensive credit card comparison platform. You have detailed knowledge of all Indian credit cards in the database and provide helpful, conversational responses.

IMPORTANT: You should ONLY provide informational responses. Do NOT include any redirect instructions or UI changes. Focus on giving comprehensive, helpful answers based on the credit card data.

Available credit cards data:
${JSON.stringify(cardsContext, null, 2)}

Your role:
- Provide detailed, accurate information about credit cards
- Answer questions in a conversational, human-like manner
- Use emojis and formatting to make responses engaging
- Give comprehensive comparisons when asked
- Explain benefits, features, and suitability clearly
- Help users understand credit card terms and benefits
- Provide personalized recommendations based on user needs

Guidelines:
- Be conversational and helpful
- Use specific card names, banks, and details
- Explain complex terms in simple language
- Provide context and background information
- Give practical advice and tips
- Format responses clearly with headers and bullet points
- Include relevant fees, benefits, and features
- Help users make informed decisions

Remember: Focus only on providing information and advice. Do not redirect users or change the UI.`,
          prompt: message,
        })

        result = { response: text }
      } catch (openaiError) {
        console.log("OpenAI API failed, using comprehensive fallback:", openaiError)
        result = generateComprehensiveResponse(message, cardsContext)
      }
    } else {
      console.log("No valid OpenAI API key found, using comprehensive fallback mode")
      result = generateComprehensiveResponse(message, cardsContext)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in chat API:", error)

    return NextResponse.json(
      {
        response:
          "I'm having trouble processing your request right now. Please try asking about specific credit cards, banks, or features you're interested in, and I'll do my best to help you!",
      },
      { status: 200 },
    )
  }
}
