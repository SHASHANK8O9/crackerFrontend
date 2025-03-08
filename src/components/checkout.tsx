"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-contexts"

export default function Checkout() {
    const { items, clearCart, subtotal } = useCart()
    const [formSubmitted, setFormSubmitted] = useState(false)

    const shipping = 5.99
    const total = subtotal + shipping

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, you would send the form data and cart items to your backend
        setFormSubmitted(true)
        clearCart() // Clear the cart after successful order
    }

    if (formSubmitted) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center py-16 space-y-6">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <h1 className="text-3xl font-bold">Thank You for Your Order!</h1>
                    <p className="text-gray-600 max-w-md mx-auto">
                        We've received your order details and will contact you shortly to confirm your purchase.
                    </p>
                    <Button asChild className="mt-8">
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shopping
            </Link>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-5 gap-8">
                {/* Contact Form */}
                <div className="md:col-span-3">
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="postalCode">Postal Code</Label>
                                    <Input id="postalCode" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Order Notes (Optional)</Label>
                                <Textarea id="notes" placeholder="Special instructions for your order" />
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                                    Submit Order
                                </Button>
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    No payment required now. We'll contact you to arrange payment.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {items.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <p>Subtotal</p>
                                <p>${subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-sm">
                                <p>Shipping</p>
                                <p>${shipping.toFixed(2)}</p>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-medium">
                                <p>Total</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

