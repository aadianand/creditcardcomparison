"use client"

import Image from "next/image"

interface CardImageProps {
  cardName: string
  cardImage?: string
  width?: number
  height?: number
  className?: string
}

export default function CardImage({ cardName, cardImage, width = 320, height = 200, className = "" }: CardImageProps) {
  return (
    <Image
      src={cardImage || "/placeholder.svg"}
      alt={cardName}
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(cardName)}`
      }}
    />
  )
}
