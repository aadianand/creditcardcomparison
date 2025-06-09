"use client"

import { Suspense } from "react"
import ChatInterface from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">AI Credit Card Assistant</h1>
          <p className="text-muted-foreground">
            Ask me anything about credit cards and I'll help you find the perfect match for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Suspense fallback={<div>Loading chat...</div>}>
              <ChatInterface />
            </Suspense>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">🤖 Try asking me:</h2>
              <ul className="space-y-2 text-sm">
                <li>• "Show me student cards" or "cards for students"</li>
                <li>• "Which cards have lounge access?"</li>
                <li>• "Best free credit cards" or "no annual fee cards"</li>
                <li>• "Compare HDFC Regalia vs Axis Magnus"</li>
                <li>• "Cards for online shopping" or "Amazon cards"</li>
                <li>• "Premium cards for travel"</li>
                <li>• "Fuel surcharge waiver cards"</li>
                <li>• "High cashback cards"</li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="font-semibold mb-4">🎯 I understand natural language!</h2>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-background rounded p-3">
                  <strong>Student Cards:</strong> "student cards", "cards for students", "beginner cards", "first-time
                  user cards"
                </div>
                <div className="bg-background rounded p-3">
                  <strong>Free Cards:</strong> "free cards", "no annual fee", "zero fee cards", "without charges"
                </div>
                <div className="bg-background rounded p-3">
                  <strong>Premium Cards:</strong> "luxury cards", "high-end cards", "premium options", "elite cards"
                </div>
                <div className="bg-background rounded p-3">
                  <strong>Travel Cards:</strong> "travel cards", "lounge access", "airport benefits", "travel rewards"
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h2 className="font-semibold mb-4">✨ Smart Features:</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>✓ Natural Language Understanding</div>
                <div>✓ Instant Card Recommendations</div>
                <div>✓ Smart Comparisons</div>
                <div>✓ Personalized Suggestions</div>
                <div>✓ Real-time Results</div>
                <div>✓ Interactive Responses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
