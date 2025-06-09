"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">CardCompare</span>
          <span className="text-primary ml-1">India</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/compare"
            className={`text-sm font-medium transition-colors ${
              pathname === "/compare" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Compare Cards
          </Link>
          <Link
            href="/banks"
            className={`text-sm font-medium transition-colors ${
              pathname === "/banks" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Banks
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/chat">AI Assistant</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
