import { Suspense } from "react"
import { getAllCards } from "@/lib/data"
import CardList from "@/components/card-list"
import FilteredCardList from "@/components/filtered-card-list"

interface CardsPageProps {
  searchParams: Promise<{
    filter?: string
  }>
}

export default async function CardsPage({ searchParams }: CardsPageProps) {
  const { filter } = await searchParams
  const cards = await getAllCards()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Credit Cards</h1>
        {filter && (
          <p className="text-muted-foreground">
            Showing cards filtered by:{" "}
            <span className="font-medium">{filter.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
          </p>
        )}
      </div>

      <Suspense fallback={<div>Loading cards...</div>}>
        {filter ? <FilteredCardList cards={cards} filter={filter} /> : <CardList cards={cards} />}
      </Suspense>
    </main>
  )
}
