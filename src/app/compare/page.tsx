import { Suspense } from "react"
import { compareCards, getAllCards } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CompareSelector from "@/components/compare-selector"
import ComparisonTable from "@/components/comparison-table"
import ComparisonAnalysis from "@/components/comparison-analysis"

interface ComparePageProps {
  searchParams: Promise<{
    cards?: string
  }>
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { cards } = await searchParams
  const selectedCardIds = cards ? cards.split(",") : []
  const selectedCards = selectedCardIds.length > 0 ? await compareCards(selectedCardIds) : []
  const allCards = await getAllCards()

  // Show comparison view if cards are selected
  const showComparison = selectedCards.length >= 2

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Credit Card Comparison</h1>
          {!showComparison && (
            <p className="text-muted-foreground">
              Compare credit cards side-by-side to find the perfect match for your needs
            </p>
          )}
          {showComparison && (
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Comparing {selectedCards.length} credit cards</p>
              <Button variant="outline" asChild>
                <Link href="/compare">Select Different Cards</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Show selector only when no comparison is active */}
        {!showComparison && (
          <Suspense fallback={<div>Loading...</div>}>
            <CompareSelector allCards={allCards} selectedCards={selectedCards} />
          </Suspense>
        )}

        {/* Show comparison when cards are selected */}
        {showComparison && (
          <div className="space-y-8">
            {/* Quick Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Comparison</CardTitle>
                <CardDescription>Key features and benefits at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading comparison...</div>}>
                  <ComparisonTable cards={selectedCards} />
                </Suspense>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Smart Analysis & Recommendation</CardTitle>
                <CardDescription>
                  Analysis generated using smart algorithms.{" "}
                  {process.env.OPENAI_API_KEY ? "AI features enabled." : "Enable AI features by adding OpenAI API key."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Generating analysis...</div>}>
                  <ComparisonAnalysis cards={selectedCards} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Show messages for different states */}
        {selectedCards.length === 1 && !showComparison && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Add More Cards</CardTitle>
              <CardDescription>Select at least one more card to start comparing features and benefits.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {selectedCards.length === 0 && !showComparison && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>No Cards Selected</CardTitle>
              <CardDescription>Select at least 2 credit cards to compare their features and benefits.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </main>
  )
}
