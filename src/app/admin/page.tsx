import { ProductsTable } from "@/components/products-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <Button asChild>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">142</div>
                                <p className="text-xs text-muted-foreground">+20% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$12,234</div>
                                <p className="text-xs text-muted-foreground">+15% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">573</div>
                                <p className="text-xs text-muted-foreground">+8% from last month</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="products" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>Manage your products inventory, pricing, and details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ProductsTable />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

