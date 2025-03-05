"use client"

import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
    name: string
    location: string
    quote: string
    rating: number
    image: string
}

export default function TestimonialCard({ name, location, quote, rating, image }: TestimonialCardProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-500">{location}</p>
                </div>
            </div>
            <div className="mb-4 flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-current" : "fill-gray-200 text-gray-200"}`} />
                ))}
            </div>
            <p className="text-gray-600">"{quote}"</p>
        </div>
    )
}

