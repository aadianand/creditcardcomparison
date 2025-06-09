import { Suspense } from "react"
import CardList from "@/components/card-list"
import Hero from "@/components/hero"
import ChatInterface from "@/components/chat-interface"
import { getAllCards } from "@/lib/data"

export default async function Home() {
  const cards = await getAllCards()

  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Featured Credit Cards</h2>
            <Suspense fallback={<div>Loading cards...</div>}>
              <CardList cards={cards} />
            </Suspense>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
