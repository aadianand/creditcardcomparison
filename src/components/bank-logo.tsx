"use client"

import Image from "next/image"

interface BankLogoProps {
  bankName: string
  width?: number
  height?: number
  className?: string
}

export default function BankLogo({ bankName, width = 120, height = 60, className = "" }: BankLogoProps) {
  const getBankLogo = (bankName: string) => {
    switch (bankName) {
      case "HDFC Bank":
        return "/images/logos/hdfc-logo.png"
      case "Axis Bank":
        return "/images/logos/axis-logo.png"
      case "ICICI Bank":
        return "/images/logos/icici-logo.png"
      case "SBI Card":
        return "/images/logos/sbi-logo.png"
      default:
        return "/placeholder.svg?height=60&width=120"
    }
  }

  return (
    <Image
      src={getBankLogo(bankName) || "/placeholder.svg"}
      alt={`${bankName} logo`}
      width={width}
      height={height}
      className={`object-contain ${className}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(bankName)}`
      }}
    />
  )
}
