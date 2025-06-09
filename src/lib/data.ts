export interface CardBenefit {
  type: string
  description: string
  value?: string | number
}

export interface CardOffer {
  title: string
  description: string
  validUntil?: string
}

export interface CreditCard {
  id: string
  name: string
  bank: string
  bankLogo: string
  cardImage: string
  annualFee: number
  joiningFee: number
  rewardRate: number
  creditLimit: string
  interestRate: string
  benefits: CardBenefit[]
  offers: CardOffer[]
  targetAudience: string[]
  summary?: string
  features: {
    loungeAccess: boolean
    fuelSurchargeWaiver: boolean
    movieTickets: boolean
    internationalAcceptance: boolean
    contactless: boolean
    mobileWalletCompatible: boolean
    emiOptions: boolean
    insuranceCover: boolean
  }
}

const creditCards: CreditCard[] = [
  {
    id: "hdfc-regalia",
    name: "Regalia Credit Card",
    bank: "HDFC Bank",
    bankLogo: "/images/hdfc-logo.png",
    cardImage: "/images/hdfc-regalia-card.png",
    annualFee: 2500,
    joiningFee: 1000,
    rewardRate: 4,
    creditLimit: "₹5,00,000 - ₹10,00,000",
    interestRate: "3.49% per month",
    benefits: [
      {
        type: "Reward Points",
        description: "Earn 4 reward points for every ₹150 spent",
        value: 4,
      },
      {
        type: "Lounge Access",
        description: "Complimentary access to domestic and international airport lounges",
        value: "Unlimited domestic, 6 international per year",
      },
      {
        type: "Fuel Surcharge Waiver",
        description: "1% fuel surcharge waiver on transactions between ₹400 - ₹5,000",
        value: "1%",
      },
      {
        type: "Milestone Benefit",
        description: "10,000 bonus reward points on spending ₹5,00,000 in a year",
        value: 10000,
      },
    ],
    offers: [
      {
        title: "Amazon Prime Membership",
        description: "Complimentary annual Amazon Prime membership",
        validUntil: "2024-12-31",
      },
      {
        title: "BookMyShow Offer",
        description: "Buy 1 Get 1 movie ticket free on BookMyShow, up to 2 times per month",
        validUntil: "2024-12-31",
      },
    ],
    targetAudience: ["Premium", "Travel", "Lifestyle"],
    summary:
      "The HDFC Regalia is a premium travel credit card offering excellent lounge benefits, reward points, and lifestyle privileges for frequent travelers and high spenders.",
    features: {
      loungeAccess: true,
      fuelSurchargeWaiver: true,
      movieTickets: true,
      internationalAcceptance: true,
      contactless: true,
      mobileWalletCompatible: true,
      emiOptions: true,
      insuranceCover: true,
    },
  },
  {
    id: "axis-magnus",
    name: "Magnus Credit Card",
    bank: "Axis Bank",
    bankLogo: "/images/axis-logo.png",
    cardImage: "/images/axis-magnus-card.png",
    annualFee: 10000,
    joiningFee: 5000,
    rewardRate: 5,
    creditLimit: "₹8,00,000 - ₹15,00,000",
    interestRate: "3.4% per month",
    benefits: [
      {
        type: "Reward Points",
        description: "Earn 5 EDGE reward points for every ₹200 spent",
        value: 5,
      },
      {
        type: "Lounge Access",
        description: "Unlimited complimentary access to domestic and international airport lounges",
        value: "Unlimited",
      },
      {
        type: "Fuel Surcharge Waiver",
        description: "Complete waiver on fuel surcharge",
        value: "100%",
      },
      {
        type: "Golf Privileges",
        description: "Complimentary golf games at top courses across India",
        value: "12 games per year",
      },
    ],
    offers: [
      {
        title: "Taj Hotels Privilege",
        description: "Complimentary one-night stay at select Taj properties annually",
        validUntil: "2024-12-31",
      },
      {
        title: "Wine & Dine Program",
        description: "Up to 25% savings at partner restaurants across India",
        validUntil: "2024-12-31",
      },
    ],
    targetAudience: ["Super Premium", "Travel", "Lifestyle", "Luxury"],
    summary:
      "The Axis Magnus is a super-premium credit card designed for the elite, offering unlimited lounge access, high reward rates, and exclusive lifestyle and travel benefits.",
    features: {
      loungeAccess: true,
      fuelSurchargeWaiver: true,
      movieTickets: true,
      internationalAcceptance: true,
      contactless: true,
      mobileWalletCompatible: true,
      emiOptions: true,
      insuranceCover: true,
    },
  },
  {
    id: "sbi-simply-click",
    name: "SimplyCLICK Credit Card",
    bank: "SBI Card",
    bankLogo: "/images/sbi-logo.png",
    cardImage: "/images/sbi-simplyclick-card.png",
    annualFee: 499,
    joiningFee: 499,
    rewardRate: 10,
    creditLimit: "₹1,00,000 - ₹3,00,000",
    interestRate: "3.35% per month",
    benefits: [
      {
        type: "Reward Points",
        description: "10X reward points on online spending at Amazon, BookMyShow, Cleartrip, etc.",
        value: 10,
      },
      {
        type: "Welcome Benefit",
        description: "₹500 Amazon gift voucher on card activation",
        value: 500,
      },
      {
        type: "Fuel Surcharge Waiver",
        description: "1% fuel surcharge waiver on transactions between ₹500 - ₹3,000",
        value: "1%",
      },
    ],
    offers: [
      {
        title: "Annual Fee Waiver",
        description: "Annual fee waived on spending ₹1,00,000 in the previous year",
        validUntil: "Ongoing",
      },
      {
        title: "Cleartrip Offer",
        description: "5% cashback on Cleartrip bookings",
        validUntil: "2024-12-31",
      },
    ],
    targetAudience: ["Online Shoppers", "First-time Users", "Students"],
    summary:
      "The SBI SimplyCLICK is an online shopping-focused card with high reward rates on e-commerce platforms, making it ideal for digital-first consumers with moderate spending habits.",
    features: {
      loungeAccess: false,
      fuelSurchargeWaiver: true,
      movieTickets: false,
      internationalAcceptance: true,
      contactless: true,
      mobileWalletCompatible: true,
      emiOptions: true,
      insuranceCover: false,
    },
  },
  {
    id: "icici-amazon-pay",
    name: "Amazon Pay ICICI Credit Card",
    bank: "ICICI Bank",
    bankLogo: "/images/icici-logo.png",
    cardImage: "/images/icici-amazon-card.png",
    annualFee: 0,
    joiningFee: 0,
    rewardRate: 5,
    creditLimit: "₹1,00,000 - ₹5,00,000",
    interestRate: "3.5% per month",
    benefits: [
      {
        type: "Cashback",
        description: "5% cashback on Amazon.in purchases for Prime members, 3% for non-Prime",
        value: "5%",
      },
      {
        type: "Cashback",
        description: "2% cashback on payments at Amazon Pay partner merchants",
        value: "2%",
      },
      {
        type: "Cashback",
        description: "1% cashback on all other payments",
        value: "1%",
      },
    ],
    offers: [
      {
        title: "Welcome Benefit",
        description: "₹500 Amazon Pay balance as welcome gift",
        validUntil: "Ongoing",
      },
      {
        title: "No-cost EMI",
        description: "No-cost EMI on Amazon.in purchases",
        validUntil: "Ongoing",
      },
    ],
    targetAudience: ["Amazon Shoppers", "First-time Users", "Online Shoppers"],
    summary:
      "The Amazon Pay ICICI Credit Card offers excellent cashback benefits for Amazon shoppers with no annual fees, making it a great choice for regular Amazon customers.",
    features: {
      loungeAccess: false,
      fuelSurchargeWaiver: false,
      movieTickets: false,
      internationalAcceptance: true,
      contactless: true,
      mobileWalletCompatible: true,
      emiOptions: true,
      insuranceCover: false,
    },
  },
  {
    id: "hdfc-millennia",
    name: "Millennia Credit Card",
    bank: "HDFC Bank",
    bankLogo: "/images/hdfc-logo.png",
    cardImage: "/images/hdfc-millennia-card.png",
    annualFee: 1000,
    joiningFee: 1000,
    rewardRate: 2,
    creditLimit: "₹1,50,000 - ₹4,00,000",
    interestRate: "3.49% per month",
    benefits: [
      {
        type: "Cashback",
        description: "5% cashback on online spends",
        value: "5%",
      },
      {
        type: "Cashback",
        description: "2.5% cashback on wallet loads and bill payments",
        value: "2.5%",
      },
      {
        type: "Cashback",
        description: "1% cashback on all other spends",
        value: "1%",
      },
      {
        type: "Fuel Surcharge Waiver",
        description: "1% fuel surcharge waiver on transactions between ₹400 - ₹5,000",
        value: "1%",
      },
    ],
    offers: [
      {
        title: "Annual Fee Waiver",
        description: "Annual fee waived on spending ₹1,00,000 in the previous year",
        validUntil: "Ongoing",
      },
      {
        title: "Movie Offer",
        description: "25% off on movie tickets on BookMyShow (up to ₹200)",
        validUntil: "2024-12-31",
      },
    ],
    targetAudience: ["Millennials", "Digital Natives", "First-time Users"],
    summary:
      "The HDFC Millennia Credit Card is designed for digital-first millennials, offering strong cashback on online spending, wallet loads, and everyday transactions.",
    features: {
      loungeAccess: false,
      fuelSurchargeWaiver: true,
      movieTickets: true,
      internationalAcceptance: true,
      contactless: true,
      mobileWalletCompatible: true,
      emiOptions: true,
      insuranceCover: false,
    },
  },
  {
    id: "axis-flipkart",
    name: "Flipkart Axis Bank Credit Card",
    bank: "Axis Bank",
    bankLogo: "/images/axis-logo.png",
    cardImage: "/images/axis-flipkart-card.png",
    annualFee: 500,
    joiningFee: 500,
    rewardRate: 4,
    creditLimit: "₹1,00,000 - ₹5,00,000",
    interestRate: "3.4% per month",
    benefits: [
      {
        type: "Cashback",
        description: "5% unlimited cashback on Flipkart, Myntra and Cleartrip",
        value: "5%",
      },
      {
        type: "Cashback",
        description: "4% unlimited cashback on preferred partners",
        value: "4%",
      },
      {
        type: "Cashback",
        description: "1.5% unlimited cashback on all other spends",
        value: "1.5%",
      },
      {
        type: "Fuel Surcharge Waiver",
        description: "1% fuel surcharge waiver on transactions between ₹400 - ₹4,000",
        value: "1%",
      },
    ],
    offers: [
      {
        title: "Welcome Benefit",
        description: "₹500 Flipkart voucher on first transaction within 30 days",
        validUntil: "Ongoing",
      },
      {
        title: "Annual Fee Waiver",
        description: "Annual fee waived on spending ₹2,00,000 in the previous year",
        validUntil: "Ongoing",
      },
    ],
    targetAudience: ["Online Shoppers", "Flipkart Customers", "First-time Users"],
    summary:
      "The Flipkart Axis Bank Credit Card offers excellent cashback benefits for Flipkart shoppers and provides good value across various spending categories.",
    features: {
      loungeAccess: false,
      fuelSurchargeWaiver: true,
      movieTickets: false,
      internationalAcceptance: true,
      contactless: true,
      mobileWalletCompatible: true,
      emiOptions: true,
      insuranceCover: false,
    },
  },
  {
    id: "sbi-elite",
    name: "SBI Card ELITE",
    bank: "SBI Card",
    bankLogo: "/images/sbi-logo.png",
    cardImage: "/images/sbi-elite-card.png",
    annualFee: 4999,
    joiningFee: 4999,
    rewardRate: 5,
    creditLimit: "₹4,00,000 - ₹8,00,000",
    interestRate: "3.35% per month",
    benefits: [
      {
        type: "Reward Points",
        description: "5 reward points for every ₹100 spent",
        value: 5,
      },
      {
        type: "Lounge Access",
        description: "Complimentary access to domestic and international airport lounges",
        value: "8 domestic, 6 international per year",
      },
      {
        type: "Milestone Benefit",
        description: "10,000 bonus reward points on spending ₹5,00,000 in a year",
        value: 10000,
      },
      {
        type: "Fuel Surcharge Waiver",
        description: "Complete waiver on fuel surcharge",
        value: "100%",
      },
    ],
    offers: [
      {
        title: "Taj Experiences Gift Voucher",
        description: "Complimentary Taj Experiences Gift Voucher worth ₹10,000 on spending ₹8,00,000 in a year",
        validUntil: "2024-12-31",
      },
      {
        title: "Movie Offer",
        description: "Buy 1 Get 1 movie ticket free on BookMyShow, up to 2 times per month",
        validUntil: "2024-12-31",
      },
    ],
    targetAudience: ["Premium", "Travel", "Lifestyle"],
    summary:
      "The SBI Card ELITE is a premium travel and lifestyle credit card offering excellent lounge access, high reward rates, and premium lifestyle benefits for frequent travelers.",
    features: {
      loungeAccess: true,
      fuelSurchargeWaiver: true,
      movieTickets: true,
      internationalAcceptance: true,
      contactless: true,
      mobileWalletCompatible: true,
      emiOptions: true,
      insuranceCover: true,
    },
  },
  {
    id: "icici-coral",
    name: "Coral Credit Card",
    bank: "ICICI Bank",
    bankLogo: "/images/icici-logo.png",
    cardImage: "/images/icici-coral-card.png",
    annualFee: 500,
    joiningFee: 500,
    rewardRate: 2,
    creditLimit: "₹1,00,000 - ₹3,00,000",
    interestRate: "3.5% per month",
    benefits: [
      {
        type: "Reward Points",
        description: "2 reward points for every ₹100 spent",
        value: 2,
      },
      {
        type: "Fuel Surcharge Waiver",
        description: "1% fuel surcharge waiver on transactions between ₹500 - ₹4,000",
        value: "1%",
      },
      {
        type: "Dining",
        description: "15% discount at select restaurants",
        value: "15%",
      },
    ],
    offers: [
      {
        title: "Annual Fee Waiver",
        description: "Annual fee waived on spending ₹1,50,000 in the previous year",
        validUntil: "Ongoing",
      },
      {
        title: "Welcome Benefit",
        description: "1,000 bonus reward points on first transaction",
        validUntil: "Ongoing",
      },
    ],
    targetAudience: ["First-time Users", "Students", "Young Professionals"],
    summary:
      "The ICICI Coral Credit Card is an entry-level card with decent rewards and benefits, making it suitable for first-time credit card users and young professionals.",
    features: {
      loungeAccess: false,
      fuelSurchargeWaiver: true,
      movieTickets: false,
      internationalAcceptance: true,
      contactless: true,
      mobileWalletCompatible: true,
      emiOptions: true,
      insuranceCover: false,
    },
  },
]

export async function getAllCards(): Promise<CreditCard[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return creditCards
}

export async function getCardById(id: string): Promise<CreditCard | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return creditCards.find((card) => card.id === id)
}

export async function getCardsByBank(bank: string): Promise<CreditCard[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return creditCards.filter((card) => card.bank === bank)
}

export async function getBanks(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))
  const banks = Array.from(new Set(creditCards.map((card) => card.bank)))
  return banks
}

export async function compareCards(cardIds: string[]): Promise<CreditCard[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  return creditCards.filter((card) => cardIds.includes(card.id))
}
