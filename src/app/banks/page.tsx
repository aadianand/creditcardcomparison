import { getBanks, getCardsByBank } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import BankLogo from "@/components/bank-logo"

export default async function BanksPage() {
  const banks = await getBanks()
  const bankData = await Promise.all(
    banks.map(async (bank) => ({
      name: bank,
      cards: await getCardsByBank(bank),
    })),
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Credit Cards by Bank</h1>
        <p className="text-muted-foreground mb-8">
          Explore credit card offerings from major Indian banks and find the perfect card for your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bankData.map((bank) => (
            <Card key={bank.name} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <BankLogo bankName={bank.name} width={120} height={60} className="h-12 w-24" />
                  <div>
                    <CardTitle>{bank.name}</CardTitle>
                    <CardDescription>{bank.cards.length} credit cards available</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bank.cards.map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{card.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Annual Fee: {card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
                        </p>
                        <div className="flex gap-1 mt-1">
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
                      <Link
                        href={`/cards/${card.id}`}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
