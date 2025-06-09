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
            Ask me anything about credit cards and I&apos;ll help you find the perfect match for your needs.
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
                <li>• &quot;Show me student cards&quot; or &quot;cards for students&quot;</li>
                <li>• &quot;Which cards have lounge access?&quot;</li>
                <li>• &quot;Best free credit cards&quot; or &quot;no annual fee cards&quot;</li>
                <li>• &quot;Compare HDFC Regalia vs Axis Magnus&quot;</li>
                <li>• &quot;Cards for online shopping&quot; or &quot;Amazon cards&quot;</li>
                <li>• &quot;Premium cards for travel&quot;</li>
                <li>• &quot;Fuel surcharge waiver cards&quot;</li>
                <li>• &quot;High cashback cards&quot;</li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="font-semibold mb-4">🎯 I understand natural language!</h2>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-background rounded p-3">
                  <strong>Student Cards:</strong> &quot;student cards&quot;, &quot;cards for students&quot;,
                  &quot;beginner cards&quot;, &quot;first-time user cards&quot;
                </div>
                <div className="bg-background rounded p-3">
                  <strong>Free Cards:</strong> &quot;free cards&quot;, &quot;no annual fee&quot;, &quot;zero fee
                  cards&quot;, &quot;without charges&quot;
                </div>
                <div className="bg-background rounded p-3">
                  <strong>Premium Cards:</strong> &quot;luxury cards&quot;, &quot;high-end cards&quot;, &quot;premium
                  options&quot;, &quot;elite cards&quot;
                </div>
                <div className="bg-background rounded p-3">
                  <strong>Travel Cards:</strong> &quot;travel cards&quot;, &quot;lounge access&quot;, &quot;airport
                  benefits&quot;, &quot;travel rewards&quot;
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
