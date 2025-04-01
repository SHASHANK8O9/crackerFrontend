"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
    type FilterFn,
} from "@tanstack/react-table"
import { Eye, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

type Order = {
    _id: string
    fullName: string
    email: string
    phone: string
    address: string
    orderNotes?: string
    orderItems: { id: string; name: string; price: number; quantity: number; image: string }[]
    createdAt: string
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [globalFilter, setGlobalFilter] = useState("")

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}orders`) // Change this to your actual API endpoint
                setOrders(response.data?.data)
            } catch (err) {
                setError("Failed to fetch orders.")
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const columnHelper = createColumnHelper<Order>()

    const columns = [
        columnHelper.accessor("_id", {
            header: "Order ID",
            cell: (info) => <span className="font-medium">#{info.getValue().slice(-6)}</span>,
        }),
        columnHelper.accessor("fullName", { header: "Customer" }),
        columnHelper.accessor("email", { header: "Email" }),
        columnHelper.accessor("orderItems", {
            header: "Items",
            cell: (info) => {
                const items = info.getValue()
                const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
                return <span>{totalItems} item(s)</span>
            },
        }),
        columnHelper.accessor("orderItems", {
            id: "total",
            header: "Total",
            cell: (info) => {
                const items = info.getValue()
                const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
                return <span>₹{total.toFixed(2)}</span>
            },
        }),
        columnHelper.accessor("createdAt", {
            header: "Date",
            cell: (info) => {
                const date = new Date(info.getValue())
                return <span>{date.toLocaleDateString()}</span>
            },
        }),
        columnHelper.display({
            id: "actions",
            cell: (info) => (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        setSelectedOrder(info.row.original)
                        setIsDialogOpen(true)
                    }}
                >
                    <Eye className="h-4 w-4" />
                </Button>
            ),
        }),
    ]

    const fuzzyFilter: FilterFn<Order> = (row, columnId, value) => {
        const searchTerm = value.toLowerCase()
        const original = row.original

        return (
            original._id.toLowerCase().includes(searchTerm) ||
            original.fullName.toLowerCase().includes(searchTerm) ||
            original.email.toLowerCase().includes(searchTerm) ||
            original.orderItems.some((item) => item.name.toLowerCase().includes(searchTerm))
        )
    }

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: fuzzyFilter,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>

            {/* Search input */}
            <div className="flex items-center mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            {loading ? (
                <p className="text-center text-muted-foreground">Loading orders...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <div className="flex items-center justify-between py-4">
                <div className="text-sm text-muted-foreground">
                    Showing {table.getFilteredRowModel().rows.length} of {orders.length} orders
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
            {/* Order Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Customer Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div>
                                        <span className="font-semibold">Name:</span> {selectedOrder.fullName}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Email:</span> {selectedOrder.email}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Phone:</span> {selectedOrder.phone}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Address:</span>
                                        <p className="whitespace-pre-line">{selectedOrder.address}</p>
                                    </div>
                                    {selectedOrder.orderNotes && (
                                        <div>
                                            <span className="font-semibold">Notes:</span>
                                            <p>{selectedOrder.orderNotes}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="font-semibold">Order ID:</span> #{selectedOrder._id.slice(-6)}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Date:</span>{" "}
                                            {selectedOrder.createdAt && new Date(selectedOrder.createdAt).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Status:</span> <Badge>Completed</Badge>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Total Items:</span>{" "}
                                            {selectedOrder.orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0)}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Total Amount:</span> ₹
                                            {selectedOrder.orderItems
                                                .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
                                                .toFixed(2)}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Order Items</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {selectedOrder.orderItems.map((item: any) => (
                                            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                                                <Avatar className="h-16 w-16 rounded-md">
                                                    <AvatarImage src={item.image} alt={item.name} className="object-cover" />
                                                    <AvatarFallback className="rounded-md">{item.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <h4 className="font-medium">{item.name}</h4>
                                                    <div className="text-sm text-muted-foreground">
                                                        ₹{item.price} × {item.quantity}
                                                    </div>
                                                </div>
                                                <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                                            </div>
                                        ))}

                                        <div className="pt-2">
                                            <Separator className="my-2" />
                                            <div className="flex justify-between font-medium">
                                                <span>Total</span>
                                                <span>
                                                    ₹
                                                    {selectedOrder.orderItems
                                                        .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
                                                        .toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
