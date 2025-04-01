import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Loading() {
    return (
        <div className="container mx-auto py-10">
            <Skeleton className="h-8 w-48 mb-6" />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array(7)
                                .fill(null)
                                .map((_, i) => (
                                    <TableHead key={i}>
                                        <Skeleton className="h-4 w-full" />
                                    </TableHead>
                                ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array(5)
                            .fill(null)
                            .map((_, i) => (
                                <TableRow key={i}>
                                    {Array(7)
                                        .fill(null)
                                        .map((_, j) => (
                                            <TableCell key={j}>
                                                <Skeleton className="h-4 w-full" />
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

