"use client"

import Image from "next/image"
import { Star, Plus, Minus, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

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
    const [quantity, setQuantity] = useState(1)
    const [isHovered, setIsHovered] = useState(false)

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            layoutId={`product-card-${name}`}
        >
            {discount && (
                <Badge className="absolute right-3 top-3 z-10 bg-yellow-500 text-black font-semibold">{discount}% OFF</Badge>
            )}

            {/* Product image with gradient overlay */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Quick view button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white">
                        Quick View
                    </Button>
                </div>
            </div>

            {/* Content section */}
            <div className="p-5">
                <div className="mb-1 inline-block rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                    {category}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">{name}</h3>

                {/* Rating */}
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

                {/* Price */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-900">₹{price}</div>
                    {discount && (
                        <div className="text-sm text-gray-500 line-through">₹{Math.round(price / (1 - discount / 100))}</div>
                    )}
                </div>

                {/* Quantity selector */}
                {/* <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 p-1">
                    <button
                        onClick={decreaseQuantity}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </button>

                    <span className="text-center text-gray-700 w-8">{quantity}</span>

                    <button
                        onClick={increaseQuantity}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div> */}

                {/* Add to cart button */}
                <Button className="w-full bg-red-600 hover:bg-red-700 gap-2 py-6">
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                </Button>
            </div>

            {/* Decorative corner fold */}
            <div className="absolute -top-px -right-px h-16 w-16 overflow-hidden">
                <div className="absolute top-0 right-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 rotate-45 bg-red-600"></div>
            </div>
        </motion.div>
    )
}

