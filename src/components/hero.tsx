import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Credit Card with AI</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Compare credit cards from major Indian banks and discover the best offers with our AI-powered search.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/compare">Compare Cards</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/chat">Ask AI Assistant</Link>
          </Button>
        </div>
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Try asking: &quot;Show me cards with lounge access and high cashback on fuel&quot;</p>
        </div>
      </div>
    </div>
  )
}
