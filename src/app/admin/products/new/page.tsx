import { ProductForm } from "@/components/product-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProductPage() {
    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Enter the details for the new product.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductForm />
                </CardContent>
            </Card>
        </div>
    )
}

