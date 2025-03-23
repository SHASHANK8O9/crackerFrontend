"use client"

import { useRouter } from "next/navigation"
import { CategoryForm } from "@/components/category-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

interface Category {
    id: string
    name: string
    imageUrl: string
}
export default function NewCategoryPage() {
    const router = useRouter()
    //   const { addCategory } = useCategoryStore()
    const [loading, setLoading] = useState(false)

    const postCategory = async (payload: any) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}categories`, payload)
            console.log(data)
            if (data?.status) {
                toast.success("Category added successfully")
                router.push("/admin/categories")
            } else {
                setLoading(false)
                toast.error("Failed to add category")
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error("Failed to add category")
        }
    }
    const handleSave = (category: Category) => {
        const { name, imageUrl } = category
        console.log({ title: name, banner: { secure_url: imageUrl } })
        postCategory({ title: name, banner: { secure_url: imageUrl } })

    }

    return (
        <div className="container mx-auto py-10 space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push("/admin/categories")}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold">Create New Category</h1>
            </div>

            <CategoryForm onSave={handleSave} onCancel={() => router.push("/admin/categories")} />
        </div>
    )
}

