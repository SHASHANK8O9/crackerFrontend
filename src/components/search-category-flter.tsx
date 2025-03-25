"use-client"
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from "use-debounce";
import axios from 'axios';

const SearchCategoryFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
    const [categories, setCategories] = useState<{}[]>([]);
    // Debounce search query and selected category updates
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const [debouncedCategory] = useDebounce(selectedCategory, 500);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}categories`);
                console.log(data)
                setCategories(data?.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Handle error (e.g., show toast notification)
            }
        };

        fetchCategories();
    }, []);
    // Update URL when searchQuery or category changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearchQuery) params.set("search", debouncedSearchQuery);
        if (debouncedCategory) params.set("category", debouncedCategory);
        router.push(`?${params.toString()}`, { scroll: false });
    }, [debouncedSearchQuery, debouncedCategory, router]);
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Search and Filter Controls */}
            <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/3"
            />
            <Select onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger className="w-full md:w-1/4">
                    <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {
                        categories?.map(item => {
                            return <SelectItem key={item?._id} value={item?.title}>{item?.title}</SelectItem>
                        })
                    }

                </SelectContent>
            </Select>
        </div>
    )
}

export default SearchCategoryFilter