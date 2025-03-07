"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/lib/data"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    category: z.string({
        required_error: "Please select a category.",
    }),
    price: z.coerce.number().positive({
        message: "Price must be a positive number.",
    }),
    discountedPrice: z.coerce
        .number()
        .positive({
            message: "Discounted price must be a positive number.",
        })
        .optional(),
    quantity: z.coerce.number().int().nonnegative({
        message: "Quantity must be a non-negative integer.",
    }),
    status: z.enum(["In Stock", "Low Stock", "Out of Stock"], {
        required_error: "Please select a status.",
    }),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    productId?: string
    initialData?: Product | null
}

export function ProductForm({ productId, initialData }: ProductFormProps) {
    const router = useRouter()
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)

    // Default values for the form
    const defaultValues: Partial<ProductFormValues> = {
        name: initialData?.name || "",
        description: initialData?.description || "",
        category: initialData?.category || "",
        price: initialData?.price || 0,
        discountedPrice: initialData?.discountedPrice || undefined,
        quantity: initialData?.quantity || 0,
        status: initialData?.status || "In Stock",
    }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    function onSubmit(values: ProductFormValues) {
        // Here you would typically send the data to your API
        console.log(values)

        toast.success(productId ? "Product updated" : "Product created", {
            description: `${values.name} has been ${productId ? "updated" : "created"} successfully.`,
        })

        // Redirect to products page after submission
        router.push("/admin/products")
    }

    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter product description" className="min-h-[120px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                            <SelectItem value="Clothing">Clothing</SelectItem>
                                            <SelectItem value="Home">Home</SelectItem>
                                            <SelectItem value="Accessories">Accessories</SelectItem>
                                            <SelectItem value="Fitness">Fitness</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-[200px]">
                            {imagePreview ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Product preview"
                                        className="w-full h-full object-contain"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => setImagePreview(null)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground mb-2">Drag and drop an image or click to browse</p>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="product-image"
                                        onChange={handleImageUpload}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById("product-image")?.click()}
                                    >
                                        Upload Image
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discountedPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discounted Price ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="Optional"
                                                {...field}
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    const value = e.target.value === "" ? undefined : Number.parseFloat(e.target.value)
                                                    field.onChange(value)
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>Leave empty if no discount</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="In Stock">In Stock</SelectItem>
                                                <SelectItem value="Low Stock">Low Stock</SelectItem>
                                                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/dashboard/products")}>
                        Cancel
                    </Button>
                    <Button type="submit">{productId ? "Update Product" : "Create Product"}</Button>
                </div>
            </form>
        </Form>
    )
}

