"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log(totalPages)

    // ✅ Ensure `currentPage` is always a number (Fixes TS warnings)
    const initialPage = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    // ✅ Debounce page changes before updating the URL
    const [debouncedPage] = useDebounce(currentPage, 300);

    // ✅ Update the URL when `debouncedPage` changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", debouncedPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    }, [debouncedPage, router, searchParams]);

    // ✅ Memoized Page Numbers (updates reactively)
    const pageNumbers = useMemo(() => {
        const pages: (number | string)[] = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    }, [currentPage, totalPages]);

    // ✅ Handle Page Change
    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages))); // Prevent out-of-range pages
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Page Numbers */}
            {pageNumbers.map((page, index) =>
                typeof page === "number" ? (
                    <Button
                        key={index}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        className={cn(page === currentPage && "bg-primary text-white")}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </Button>
                ) : (
                    <span key={index} className="px-2 text-gray-500">
                        {page}
                    </span>
                )
            )}

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default Pagination;
