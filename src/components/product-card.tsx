"use client"

import Image from "next/image"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
    name: string
    image: string
    price: number
    rating: number
    category: string
    discount?: number
}

export default function ProductCard({ name, image, price, rating, category, discount }: ProductCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            {discount && <Badge className="absolute right-3 top-3 z-10 bg-yellow-500 text-black">{discount}% OFF</Badge>}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <div className="mb-1 text-sm font-medium text-gray-500">{category}</div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{name}</h3>
                <div className="mb-3 flex items-center gap-1">
                    <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-current" : "fill-gray-200 text-gray-200"}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">{rating}</span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">₹{price}</div>
                    {discount && (
                        <div className="text-sm text-gray-500 line-through">₹{Math.round(price / (1 - discount / 100))}</div>
                    )}
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">Add to Cart</Button>
            </div>
        </div>
    )
}

