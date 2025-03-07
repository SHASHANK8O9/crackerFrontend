import { ProductsTable } from "@/components/products-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ProductsPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <Button asChild>
                    <Link href="/dashboard/products/new">Add Product</Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products inventory, pricing, and details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductsTable />
                </CardContent>
            </Card>
        </div>
    )
}

