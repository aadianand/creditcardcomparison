import Link from "next/link"
import Image from "next/image"
import type { CreditCard } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CardItemProps {
  card: CreditCard
}

export default function CardItem({ card }: CardItemProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">{card.bank}</p>
            <h3 className="font-bold text-lg">{card.name}</h3>
          </div>
          <Image
            src={card.bankLogo || "/placeholder.svg"}
            alt={`${card.bank} logo`}
            width={80}
            height={40}
            className="object-contain h-8 w-16"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-4 mb-4">
          <div className="w-1/3">
            <Image
              src={card.cardImage || "/placeholder.svg"}
              alt={card.name}
              width={320}
              height={200}
              className="rounded-lg object-cover w-full h-24"
            />
          </div>
          <div className="w-2/3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Annual Fee</p>
                <p className="font-medium">{card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joining Fee</p>
                <p className="font-medium">{card.joiningFee === 0 ? "Free" : `₹${card.joiningFee.toLocaleString()}`}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reward Rate</p>
                <p className="font-medium">{card.rewardRate}x</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interest Rate</p>
                <p className="font-medium">{card.interestRate}</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm text-muted-foreground mb-1">Key Features</p>
              <div className="flex flex-wrap gap-1">
                {card.features.loungeAccess && (
                  <Badge variant="outline" className="text-xs">
                    Lounge Access
                  </Badge>
                )}
                {card.features.fuelSurchargeWaiver && (
                  <Badge variant="outline" className="text-xs">
                    Fuel Surcharge Waiver
                  </Badge>
                )}
                {card.features.movieTickets && (
                  <Badge variant="outline" className="text-xs">
                    Movie Offers
                  </Badge>
                )}
                {card.features.insuranceCover && (
                  <Badge variant="outline" className="text-xs">
                    Insurance Cover
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {card.summary && (
          <div className="mt-2 text-sm text-muted-foreground border-t pt-2">
            <p>{card.summary}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href={`/cards/${card.id}`}>View Details</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/compare?cards=${card.id}`}>Compare</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
