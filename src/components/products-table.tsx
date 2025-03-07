"use client"

import { useState } from "react"
import Link from "next/link"
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    type SortingState,
    getSortedRowModel,
    type ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { mockProducts, type Product } from "@/lib/data"

export function ProductsTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState<Product[]>(mockProducts)

    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Product
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.original.image || "/placeholder.svg"}
                        alt={row.getValue("name")}
                        className="h-10 w-10 rounded-md object-cover"
                    />
                    <span>{row.getValue("name")}</span>
                </div>
            ),
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <div>{row.getValue("category")}</div>,
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const price = Number.parseFloat(row.getValue("price"))
                const discountedPrice = row.original.discountedPrice

                return (
                    <div className="flex flex-col">
                        {discountedPrice ? (
                            <>
                                <span className="text-sm line-through text-muted-foreground">${price.toFixed(2)}</span>
                                <span className="font-medium text-green-600">${discountedPrice.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="font-medium">${price.toFixed(2)}</span>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "quantity",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Quantity
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="text-center">{row.getValue("quantity")}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string

                return (
                    <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "In Stock"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }`}
                    >
                        {status}
                    </div>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const product = row.original

                const handleDelete = () => {
                    // In a real app, you would call an API to delete the product
                    setData(data.filter((p) => p.id !== product.id))

                    toast.success("Product deleted", {
                        description: `${product.name} has been deleted.`,
                    })
                }

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Input
                    placeholder="Filter products..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <div className="flex items-center gap-2">
                    <Select
                        value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
                        onValueChange={(value) => table.getColumn("category")?.setFilterValue(value === "all" ? "" : value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Clothing">Clothing</SelectItem>
                            <SelectItem value="Home">Home</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                            <SelectItem value="Fitness">Fitness</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                        onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="In Stock">In Stock</SelectItem>
                            <SelectItem value="Low Stock">Low Stock</SelectItem>
                            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

