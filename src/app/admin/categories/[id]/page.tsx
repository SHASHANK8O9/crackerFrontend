"use client"

import { useRouter, useParams } from "next/navigation"
import { CategoryForm } from "@/components/category-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
// import { useCategoryStore } from "@/lib/category-store"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
  imageUrl: string
}
export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  // const { categories, updateCategory } = useCategoryStore()
  const [category, setCategory] = useState<Category | null>(null)

  const categoryId = params.id as string

  const [loading, setLoading] = useState(true)
  const findCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}categories/${categoryId}`)
      if (data) {
        console.log(data, "data")
        setCategory({ name: data?.data?.title, imageUrl: data?.data?.banner?.secure_url })
      } else {
        // Product not found, redirect to products page
        router.push("/admin/categories")
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    // In a real app, you would fetch the category from an API
    findCategory()

  }, [categoryId, router])
  const updateCategory = async (payload: any) => {
    try {
      setLoading(true)
      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}categories/${categoryId}`, payload)
      console.log(data)
      if (data?.status) {
        toast.success("Category Updated successfully")
        router.push("/admin/categories")
      } else {
        setLoading(false)
        toast.error("Failed to update category")
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
    updateCategory({ title: name, banner: { secure_url: imageUrl } })

  }

  return (
    <div className="container mx-auto py-10 space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/categories")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Category</h1>
      </div>

      {category && (
        <CategoryForm initialData={category} onSave={handleSave} onCancel={() => router.push("/categories")} />
      )}
    </div>
  )
}

