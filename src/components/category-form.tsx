"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface Category {
    id: string
    name: string
    imageUrl: string
}
const formSchema = z.object({
    name: z.string().min(1, "Category name is required"),
    imageUrl: z.string().min(1, "Category image is required"),
})

type FormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
    initialData?: Category | null
    onSave: (category: Category) => void
    onCancel: () => void
}

export function CategoryForm({ initialData, onSave, onCancel }: CategoryFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                name: initialData.name,
                imageUrl: initialData.imageUrl,
            }
            : {
                name: "",
                imageUrl: "",
            },
    })

    const handleSubmit = (values: FormValues) => {
        onSave({
            id: initialData?.id || Date.now().toString(),
            name: values.name,
            imageUrl: values.imageUrl,
        })
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter category name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button type="submit">{initialData ? "Update" : "Create"} Category</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

