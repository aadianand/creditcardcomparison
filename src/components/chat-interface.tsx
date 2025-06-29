"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        '👋 **Welcome to CardCompare India!**\n\nI\'m your AI assistant with comprehensive knowledge of all credit cards in our database. I can help you with:\n\n🏦 **Bank-specific information** (HDFC, Axis, SBI, ICICI)\n💳 **Card features and benefits**\n💰 **Fees, rewards, and cashback details**\n🔍 **Detailed comparisons**\n🎯 **Personalized recommendations**\n\nJust ask me anything about credit cards! I understand natural language and can provide detailed, human-like responses.\n\n**Try asking:**\n• "Tell me about HDFC Regalia"\n• "Best cards for students"\n• "Compare premium cards"\n• "Which cards have lounge access?"\n\nWhat would you like to know? 🤔',
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      if (data.response) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I can help you find credit cards! Try asking about specific banks, card features, or comparisons you're interested in.",
          },
        ])
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try asking about specific credit cards, banks, or features you're interested in.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const quickPrompts = [
    "Tell me about HDFC cards",
    "Best cards for students",
    "Cards with lounge access",
    "Compare Axis Magnus vs HDFC Regalia",
    "Free credit cards",
    "Best cashback cards",
    "Premium travel cards",
    "Online shopping cards",
  ]

  return (
    <Card className="h-[600px] flex flex-col shadow-lg border-2">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Bot size={20} />
          AI Credit Card Expert
          <Sparkles size={16} className="text-yellow-500" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ask me anything about credit cards - I have comprehensive knowledge of all cards and banks!
        </p>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`
                  max-w-[90%] rounded-lg p-3 
                  ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}
                `}
              >
                <div className="flex items-start gap-2">
                  {message.role === "assistant" && <Bot size={16} className="mt-0.5 flex-shrink-0" />}
                  {message.role === "user" && <User size={16} className="mt-0.5 flex-shrink-0" />}
                  <div className="text-sm whitespace-pre-line leading-relaxed prose prose-sm max-w-none dark:prose-invert">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex items-center gap-2">
                  <Bot size={16} />
                  <div className="flex gap-1">
                    <span className="animate-bounce text-xs">●</span>
                    <span className="animate-bounce delay-100 text-xs">●</span>
                    <span className="animate-bounce delay-200 text-xs">●</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Analyzing credit card data...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Ask me anything about credit cards..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 text-sm"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send size={16} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
