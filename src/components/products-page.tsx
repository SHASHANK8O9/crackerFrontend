"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";
import SearchCategoryFilter from "@/components/search-category-flter";
import Pagination from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "@/components/product-card-skeleton";

interface Product {
    _id: string;
    title: string;
    price: number;
    discount: number;
    banner: { secure_url: string };
    slug: string;
    stockStatus: string;
    categories: { _id: string; title: string };
    quantity: string;
    finalPrice: number;
}

export default function ProductPage() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const [totalPages, setTotalPages] = useState(1);
    // ✅ Always get values dynamically from searchParams
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const fetchProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product?page=${page}&search=${search}&category=${category}&limit=${limit}`);
            console.log(data)
            setProducts(data?.data?.products);
            setTotalPages(data?.data?.totalPages);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Error fetching products")
            setLoading(false)
            // Handle error (e.g., show toast notification)
        }
    }
    useEffect(() => {
        fetchProducts()
        console.log(page, search, category, limit)
    }, [searchParams])

    return (
        <div className="container min-h-screen mx-auto px-4 py-8">
            {/* Search and Filter Controls */}
            <SearchCategoryFilter />

            {/* Product Grid */}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[60vh]">
                {loading ? Array.from({ length: 8 })?.map(_ => {
                    return <ProductCardSkeleton />
                }) : products.length > 0 ? (
                    products.map((product) => <ProductCard key={product._id} {...product} />)
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products found.</p>
                )}
            </div>

            {/* Pagination */}
            <Pagination totalPages={Number(totalPages)} />

        </div>
    );
}
