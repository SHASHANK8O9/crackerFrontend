"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the cart item type
export type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}

type CartContextType = {
    items: CartItem[]
    addItem: (item: CartItem) => void
    updateQuantity: (id: number, quantity: number) => void
    removeItem: (id: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined)

// Create a provider component
export function CartProvider({ children }: { children: ReactNode }) {
    // Initialize state from localStorage if available (client-side only)
    const [items, setItems] = useState<CartItem[]>([])
    const [isClient, setIsClient] = useState(false)

    // Calculate derived values
    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

    // Initialize on client-side only
    useEffect(() => {
        setIsClient(true)
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e)
                localStorage.removeItem("cart")
            }
        }
    }, [])

    // Save to localStorage when cart changes
    useEffect(() => {
        if (isClient) {
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }, [items, isClient])

    // Add an item to the cart
    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            // Check if item already exists in cart
            const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

            if (existingItemIndex >= 0) {
                // Update quantity if item exists
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex].quantity += newItem.quantity
                return updatedItems
            } else {
                // Add new item if it doesn't exist
                return [...prevItems, newItem]
            }
        })
    }

    // Update the quantity of an item
    const updateQuantity = (id: number, quantity: number) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
        )
    }

    // Remove an item from the cart
    const removeItem = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    // Clear the entire cart
    const clearCart = () => {
        setItems([])
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

// Custom hook to use the cart context
export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

