"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { IndianRupee, Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import axios from "axios"

// Zod schema for form validation
const formSchema = z.object({
    name: z.string().min(2, "Product name must be at least 2 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    category: z.string({ required_error: "Please select a category." }), // Stores category _id
    price: z.coerce.number().positive("Price must be a positive number."),
    discountedPrice: z.coerce.number().positive("Discounted price must be positive.").optional(),
    // quantity: z.coerce.number().int().nonnegative("Quantity must be non-negative."),
    status: z.enum(["In Stock", "Low Stock", "Out of Stock"], { required_error: "Please select status." }),
})

type ProductFormValues = z.infer<typeof formSchema>

// Basic type for what a category item in the dropdown looks like
interface CategoryItem {
    _id: string;
    title: string;
}

// Basic type for the initialData prop (can be made more specific)
interface InitialProductData {
    title?: string;
    description?: string;
    categories?: { _id: string;[key: string]: any }; // Expecting categories._id
    price?: number;
    discount?: number; // Assuming 'discount' field from your initialData JSON
    quantity?: any;
    stockStatus?: "In Stock" | "Low Stock" | "Out of Stock";
    banner?: { secure_url?: string;[key: string]: any };
    [key: string]: any; // Allow other properties
}

interface ProductFormProps {
    productId?: string
    initialData?: InitialProductData | null
}

export function ProductForm({ productId, initialData }: ProductFormProps) {
    const router = useRouter()
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [categoriesData, setCategoriesData] = useState<CategoryItem[]>([])

    // Base default values for a new form or before initialData is processed
    const baseDefaultValues: ProductFormValues = {
        name: "",
        description: "",
        category: "",
        price: 0,
        discountedPrice: undefined,
        quantity: 0,
        status: "In Stock",
    }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: baseDefaultValues, // Initialize with base defaults
    })

    // This useEffect is crucial for populating the form when editing
    useEffect(() => {
        if (initialData) {
            // We have data for an existing product, so reset the form with these values
            form.reset({
                name: initialData.title || "",
                description: initialData.description || "",
                category: initialData.categories?._id || "", // Set category ID here
                price: initialData.price || 0,
                discountedPrice: initialData.discount ?? undefined, // Use 'discount' from your data
                quantity: initialData.quantity ?? '0',
                status: initialData.stockStatus || "In Stock",
            })
            setImagePreview(initialData.banner?.secure_url || null)
        } else {
            // No initialData, so ensure form is set to base defaults (for new product)
            form.reset(baseDefaultValues)
            setImagePreview(null)
        }
    }, [initialData, form.reset]) // Rerun if initialData or form.reset changes

    // Fetch categories for the dropdown
    useEffect(() => {
        async function fetchCategoriesList() {
            try {
                // Ensure this endpoint is correct and returns an array like [{_id: "...", title: "..."}]
                // If data is nested, e.g. res.data.data, adjust accordingly.
                const response = await axios.get<{ data: CategoryItem[] }>(`${process.env.NEXT_PUBLIC_BACKEND_URL}category`);
                setCategoriesData(response.data.data || [])
            } catch (error) {
                console.error("Error fetching categories:", error)
                toast.error("Could not load categories.")
                setCategoriesData([])
            }
        }
        fetchCategoriesList()
    }, []) // Fetch once on component mount

    async function onSubmit(values: ProductFormValues) {
        setIsLoading(true)
        let bannerDataToSend = initialData?.banner // Use existing banner by default for updates

        try {
            // 1. Upload image if a new one is selected
            if (selectedFile) {
                const cloudinaryFormData = new FormData()
                cloudinaryFormData.append("file", selectedFile)
                cloudinaryFormData.append("upload_preset", "CrackerFrontend") // Ensure this preset exists
                cloudinaryFormData.append("folder", "DUMMY")

                const cloudinaryRes = await axios.post(
                    `${process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_URL}/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                    cloudinaryFormData
                )
                if (!cloudinaryRes?.data?.asset_id) {
                    throw new Error("Cloudinary upload failed: No asset_id returned.")
                }
                bannerDataToSend = { // Prepare new banner data
                    asset_id: cloudinaryRes.data.asset_id,
                    public_id: cloudinaryRes.data.public_id,
                    secure_url: cloudinaryRes.data.eager?.[0]?.secure_url || cloudinaryRes.data.secure_url,
                }
            } else if (!productId && !imagePreview) { // If new product and no image selected/previewed
                toast.error("Please choose a banner image.")
                setIsLoading(false)
                return
            }

            // 2. Prepare product data for the backend
            const productPayload = {
                banner: bannerDataToSend,
                title: values.name,
                description: values.description,
                quantity: values.quantity,
                price: values.price,
                stockStatus: values.status,
                discount: values.discountedPrice, // Backend expects 'discount'
                categories: values.category, // This is the category _id
                slug: values.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''), // Basic slug
            }

            // 3. Send data to backend (create or update)
            const apiEndpoint = productId
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}product/${productId}`
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}product`
            const apiMethod = productId ? axios.patch : axios.post

            const backendResponse = await apiMethod(apiEndpoint, productPayload)

            // Adjust this check based on your API's success response
            // if (!(backendResponse.status >= 200 && backendResponse.status < 300 && backendResponse.data?.status)) {
            //     throw new Error(backendResponse.data?.message || "Failed to save product.")
            // }

            toast.success(productId ? "Product updated" : "Product created", {
                description: `${values.name} has been successfully ${productId ? "updated" : "created"}.`,
            })
            router.push("/admin/products") // Or your desired redirect path
            router.refresh() // Good to refresh data on the target page

        } catch (error: any) {
            console.error("Error in onSubmit:", error)
            toast.error(error.message || "An unexpected error occurred.")
        } finally {
            setIsLoading(false)
        }
    }

    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setImagePreview(e.target?.result as string)
            reader.readAsDataURL(file)
            setSelectedFile(file)
        } else {
            setSelectedFile(null)
            // If user cancels, only clear preview if there wasn't an initial image
            if (!initialData?.banner?.secure_url) {
                setImagePreview(null)
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl><Input placeholder="Enter product name" {...field} /></FormControl>
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
                                    <FormControl><Textarea placeholder="Product description" className="min-h-[120px]" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {categoriesData.length > 0 && <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ""}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {categoriesData.length > 0 ? (
                                                categoriesData.map((cat) => (
                                                    <SelectItem key={cat._id} value={cat._id}>{cat.title}</SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="loading" disabled>
                                                    {isLoading /* You might need a specific loading state for categories */
                                                        ? "Loading categories..."
                                                        : "No categories found"}
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price <IndianRupee className="inline" size={14} /></FormLabel>
                                        <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="discountedPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discounted Price <IndianRupee className="inline" size={14} /></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number" step="0.01" placeholder="Optional"
                                                {...field} value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value === "" ? undefined : parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl><Input type="text" {...field} /></FormControl>
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
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
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
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[200px]">
                            {imagePreview ? (
                                <div className="relative w-full h-full max-h-[180px] flex justify-center">
                                    <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                                    <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-7 w-7"
                                        onClick={() => {
                                            setImagePreview(null); setSelectedFile(null);
                                            const fileInput = document.getElementById("product-image") as HTMLInputElement;
                                            if (fileInput) fileInput.value = "";
                                        }}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center">
                                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground mb-2">Drag & drop or click to upload</p>
                                    <Input type="file" accept="image/*" className="hidden" id="product-image" onChange={handleImageUpload} />
                                    <Button type="button" variant="outline" onClick={() => document.getElementById("product-image")?.click()}>Upload Image</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>Cancel</Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : (productId ? "Update Product" : "Create Product")}
                    </Button>
                </div>
            </form>
        </Form>
    )
}   