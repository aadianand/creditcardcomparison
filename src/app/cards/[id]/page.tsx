import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getCardById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowLeft } from "lucide-react"
import CardSummary from "@/components/card-summary"

interface CardDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = await params
  const card = await getCardById(id)

  if (!card) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-sm mb-6 hover:text-primary transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Back to all cards
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <Image
                src={card.cardImage || "/placeholder.svg"}
                alt={card.name}
                width={320}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={card.bankLogo || "/placeholder.svg"}
                  alt={`${card.bank} logo`}
                  width={80}
                  height={40}
                  className="object-contain h-10 w-20"
                />
                <div>
                  <h1 className="text-3xl font-bold">{card.name}</h1>
                  <p className="text-muted-foreground">{card.bank}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 my-4">
                {card.targetAudience.map((audience) => (
                  <Badge key={audience} variant="secondary">
                    {audience}
                  </Badge>
                ))}
              </div>

              <Suspense fallback={<div className="h-24 bg-muted animate-pulse rounded-md"></div>}>
                <CardSummary card={card} />
              </Suspense>

              <div className="mt-6">
                <Button asChild>
                  <Link href={`/compare?cards=${card.id}`}>Compare with other cards</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Fees & Charges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Fee</span>
                    <span className="font-medium">
                      {card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joining Fee</span>
                    <span className="font-medium">
                      {card.joiningFee === 0 ? "Free" : `₹${card.joiningFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-medium">{card.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Limit</span>
                    <span className="font-medium">{card.creditLimit}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reward Rate</span>
                    <span className="font-medium">{card.rewardRate}x</span>
                  </div>
                  {card.benefits
                    .filter((benefit) => benefit.type === "Reward Points")
                    .map((benefit, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{benefit.description}</span>
                        <span className="font-medium">{benefit.value}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Key Benefits</h3>
                    <ul className="space-y-2">
                      {card.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={18} className="text-green-500 mt-0.5" />
                          <div>
                            <span className="font-medium">{benefit.type}: </span>
                            <span className="text-muted-foreground">{benefit.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Card Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        {card.features.loungeAccess ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <X size={18} className="text-red-500" />
                        )}
                        <span>Airport Lounge Access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {card.features.fuelSurchargeWaiver ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <X size={18} className="text-red-500" />
                        )}
                        <span>Fuel Surcharge Waiver</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {card.features.movieTickets ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <X size={18} className="text-red-500" />
                        )}
                        <span>Movie Ticket Offers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {card.features.insuranceCover ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <X size={18} className="text-red-500" />
                        )}
                        <span>Insurance Coverage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {card.features.internationalAcceptance ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <X size={18} className="text-red-500" />
                        )}
                        <span>International Acceptance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {card.features.contactless ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <X size={18} className="text-red-500" />
                        )}
                        <span>Contactless Payment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {card.offers.map((offer, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium">{offer.title}</h3>
                      <p className="text-muted-foreground">{offer.description}</p>
                      {offer.validUntil && (
                        <p className="text-sm mt-2">
                          Valid until: <span className="font-medium">{offer.validUntil}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Ask AI Assistant</CardTitle>
              <CardDescription>Have questions about this card? Our AI assistant can help.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start text-left h-auto py-3" asChild>
                  <Link href={`/chat?query=Tell me more about ${card.name}`}>Tell me more about {card.name}</Link>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left h-auto py-3" asChild>
                  <Link href={`/chat?query=Is ${card.name} good for travel?`}>Is {card.name} good for travel?</Link>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left h-auto py-3" asChild>
                  <Link href={`/chat?query=Compare ${card.name} with other ${card.bank} cards`}>
                    Compare with other {card.bank} cards
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left h-auto py-3" asChild>
                  <Link href={`/chat?query=What are the benefits of ${card.name}?`}>
                    What are the benefits of this card?
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
