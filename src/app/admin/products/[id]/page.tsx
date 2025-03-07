"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockProducts, type Product } from "@/lib/data"

interface EditProductPageProps {
    params: {
        id: string
    }
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real app, you would fetch the product from an API
        const foundProduct = mockProducts.find((p) => p.id === params.id)

        if (foundProduct) {
            setProduct(foundProduct)
        } else {
            // Product not found, redirect to products page
            router.push("/admin/products")
        }

        setLoading(false)
    }, [params.id, router])

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Update the details for this product.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductForm productId={params.id} initialData={product} />
                </CardContent>
            </Card>
        </div>
    )
}

