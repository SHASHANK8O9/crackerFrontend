"use client"

import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useCart } from "@/contexts/cart-contexts"

type ProductCardProps = {
    id: number
    name: string
    description: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    image: string
    isNew?: boolean
    limitedStock?: boolean
    category?: string
}

export default function ProductCard({
    id,
    name,
    description,
    price,
    originalPrice,
    rating,
    reviewCount,
    image = "/placeholder.svg?height=300&width=500",
    isNew = false,
    limitedStock = false,
    category = "Firecracker",
}: ProductCardProps) {
    const { addItem } = useCart()
    const [isHovered, setIsHovered] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    // Calculate discount percentage if originalPrice exists
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined

    const handleAddToCart = () => {
        setIsAdding(true)

        // Add item to cart
        addItem({
            id,
            name,
            price,
            quantity: 1,
            image,
        })

        // Show toast notification
        toast.success("Added to cart", {
            description: `${name} has been added to your cart.`,
        })

        // Reset button state after a short delay
        setTimeout(() => {
            setIsAdding(false)
        }, 500)
    }

    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            layoutId={`product-card-${id}`}
        >


            {/* Product image with gradient overlay */}
            <div className="relative h-64 overflow-hidden">
                {/* Badges */}
                <div className="absolute right-3 top-3 z-10 flex flex-col gap-2  w-full h-full">
                    {discount && <Badge className="bg-yellow-500 absolute left-5 text-black font-semibold">{discount}% OFF</Badge>}
                    {isNew && <Badge className="bg-red-500 absolute -right-1 hover:bg-red-600">New</Badge>}
                    {limitedStock && (
                        <Badge variant="outline" className="bg-white/80 absolute bottom-4 -right-1">
                            Limited Stock
                        </Badge>
                    )}
                </div>
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
                    <span className="text-sm text-gray-500">({reviewCount})</span>
                </div>

                {/* Description - truncated */}
                <p className="mb-3 text-sm text-gray-500 line-clamp-2">{description}</p>

                {/* Price */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-900">₹{price.toFixed(2)}</div>
                    {originalPrice && <div className="text-sm text-gray-500 line-through">₹{originalPrice.toFixed(2)}</div>}
                </div>

                {/* Add to cart button */}
                <Button className="w-full bg-red-600 hover:bg-red-700 gap-2 py-6" onClick={handleAddToCart} disabled={isAdding}>
                    <ShoppingCart className="h-5 w-5" />
                    {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
            </div>

            {/* Decorative corner fold
            <div className="absolute -top-px -right-px h-16 w-16 overflow-hidden">
                <div className="absolute top-0 right-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 rotate-45 bg-red-600"></div>
            </div> */}
        </motion.div>
    )
}

