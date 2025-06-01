"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type Product } from "@/lib/data"
import axios from "axios"

interface EditProductPageProps {

    id: string
}

export default function EditProductPage({ params }: { params: Promise<EditProductPageProps> }) {
    const { id } = use(params)
    console.log(id, "params id")
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const findProduct = async () => {
        try {
            const foundProduct = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product/single/${id}`)
            if (foundProduct) {
                setProduct(foundProduct?.data?.data)
            } else {
                // Product not found, redirect to products page
                router.push("/admin/products")
            }

            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        // In a real app, you would fetch the product from an API
        findProduct()

    }, [id, router])

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
                    <ProductForm
                        productId={id}
                        initialData={
                            product
                                ? {
                                    ...product,
                                    discount: product.discount === null ? undefined : product.discount,
                                }
                                : null
                        }
                    />
                </CardContent>
            </Card>
        </div>
    )
}

