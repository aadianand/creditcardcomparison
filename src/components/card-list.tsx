"use client"

import { useState } from "react"
import type { CreditCard } from "@/lib/data"
import CardItem from "./card-item"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CardListProps {
  cards: CreditCard[]
}

export default function CardList({ cards }: CardListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [bankFilter, setBankFilter] = useState("all")
  const [filters, setFilters] = useState({
    loungeAccess: false,
    fuelSurchargeWaiver: false,
    noAnnualFee: false,
    firstTimeUsers: false,
  })

  const banks = Array.from(new Set(cards.map((card) => card.bank)))

  const filteredCards = cards.filter((card) => {
    // Search term filter
    if (
      searchTerm &&
      !card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !card.bank.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Bank filter
    if (bankFilter !== "all" && card.bank !== bankFilter) {
      return false
    }

    // Feature filters
    if (filters.loungeAccess && !card.features.loungeAccess) {
      return false
    }

    if (filters.fuelSurchargeWaiver && !card.features.fuelSurchargeWaiver) {
      return false
    }

    if (filters.noAnnualFee && card.annualFee > 0) {
      return false
    }

    if (filters.firstTimeUsers && !card.targetAudience.includes("First-time Users")) {
      return false
    }

    return true
  })

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div>
      <div className="mb-6 space-y-4">
        <Input
          placeholder="Search cards by name or bank..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />

        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-48">
            <Select value={bankFilter} onValueChange={setBankFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Banks</SelectItem>
                {banks.map((bank) => (
                  <SelectItem key={bank} value={bank}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="loungeAccess"
                checked={filters.loungeAccess}
                onCheckedChange={() => handleFilterChange("loungeAccess")}
              />
              <Label htmlFor="loungeAccess">Lounge Access</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="fuelSurchargeWaiver"
                checked={filters.fuelSurchargeWaiver}
                onCheckedChange={() => handleFilterChange("fuelSurchargeWaiver")}
              />
              <Label htmlFor="fuelSurchargeWaiver">Fuel Surcharge Waiver</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="noAnnualFee"
                checked={filters.noAnnualFee}
                onCheckedChange={() => handleFilterChange("noAnnualFee")}
              />
              <Label htmlFor="noAnnualFee">No Annual Fee</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="firstTimeUsers"
                checked={filters.firstTimeUsers}
                onCheckedChange={() => handleFilterChange("firstTimeUsers")}
              />
              <Label htmlFor="firstTimeUsers">For First-Time Users</Label>
            </div>
          </div>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No credit cards match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  )
}
